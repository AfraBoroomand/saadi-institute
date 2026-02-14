document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.slide')];
  if (!slides.length) return;
  let i = 0;
  const prev = document.querySelector('[data-slide="prev"]');
  const next = document.querySelector('[data-slide="next"]');
  const show = (idx) => { slides.forEach((s,n)=>s.classList.toggle('active', n===idx)); i = idx; };
  const go = (delta) => show((i + delta + slides.length) % slides.length);
  prev?.addEventListener('click', ()=>go(-1));
  next?.addEventListener('click', ()=>go(1));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(()=>go(1), 6000);
});
