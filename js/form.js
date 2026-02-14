window.SAADI_CONFIG = window.SAADI_CONFIG || { formspreeEndpoint: 'https://formspree.io/f/XXXXXXXX' };
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const notice = document.querySelector('[data-form-notice]');
  const fallbackEmail = (form.dataset.fallbackEmail || 'info@saadi-institute.de').trim();
  const endpoint = (window.SAADI_CONFIG.formspreeEndpoint || '').trim();
  const placeholder = endpoint.includes('XXXXXXXX');
  if (placeholder && notice) {
    notice.innerHTML = notice.dataset.fallback || 'Form endpoint not configured.';
  }
  const setError = (name, msg) => {
    const el = form.querySelector(`[data-error="${name}"]`);
    if (el) el.textContent = msg || '';
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ['name','email','subject','message'].forEach(n => setError(n,''));
    let valid = true;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name?.trim()) { setError('name', form.dataset.errRequired); valid = false; }
    if (!/^\S+@\S+\.\S+$/.test(data.email || '')) { setError('email', form.dataset.errEmail); valid = false; }
    if (!data.subject?.trim()) { setError('subject', form.dataset.errRequired); valid = false; }
    if (!data.message?.trim()) { setError('message', form.dataset.errRequired); valid = false; }
    if (!valid) return;
    if (placeholder) {
      const subject = encodeURIComponent(data.subject.trim());
      const body = encodeURIComponent(`${data.message.trim()}\n\n${data.name.trim()} <${data.email.trim()}>`);
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      notice.textContent = form.dataset.noEndpoint;
      return;
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST', headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(data)
      });
      notice.textContent = res.ok ? form.dataset.success : form.dataset.fail;
      if (res.ok) form.reset();
    } catch {
      notice.textContent = form.dataset.fail;
    }
  });
});
