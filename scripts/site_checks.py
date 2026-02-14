#!/usr/bin/env python3
from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.rglob('*.html'))
LANG_PREFIXES = ('en/', 'de/', 'fa/')


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != 'a':
            return
        for k, v in attrs:
            if k == 'href' and v:
                self.links.append(v)


def is_local_link(href: str) -> bool:
    if href.startswith(('#', 'mailto:', 'tel:', 'javascript:')):
        return False
    parsed = urlparse(href)
    return not parsed.scheme and not parsed.netloc


def resolve_target(file_path: Path, href: str) -> Path:
    path = href.split('#', 1)[0].split('?', 1)[0]
    if path.startswith('/'):
        return ROOT / path.lstrip('/')
    return (file_path.parent / path).resolve()


def target_exists(path: Path) -> bool:
    if path.exists():
        return True
    if path.suffix == '':
        if (path / 'index.html').exists():
            return True
        if Path(f"{path}.html").exists():
            return True
    return False


def main() -> int:
    errors: list[str] = []

    for file_path in HTML_FILES:
        rel = file_path.relative_to(ROOT).as_posix()
        text = file_path.read_text(encoding='utf-8')

        if rel.startswith(LANG_PREFIXES):
            if 'rel="canonical"' not in text:
                errors.append(f"Missing canonical: {rel}")
            if '<h1' not in text:
                errors.append(f"Missing h1: {rel}")

        parser = LinkParser()
        parser.feed(text)
        for href in parser.links:
            if not is_local_link(href):
                continue
            target = resolve_target(file_path, href)
            if not target_exists(target):
                errors.append(f"Broken link in {rel}: {href}")

    if errors:
        print('Site checks failed:')
        for e in errors:
            print(f"- {e}")
        return 1

    print('Site checks passed.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
