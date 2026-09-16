const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
    nav.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる');
    nav.classList.toggle('is-open', !open);
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

// MENUの横スクロール（前後ボタン）
const menuGrid = document.querySelector('.menu-grid');
const prevBtn = document.querySelector('.menu-arrow--prev');
const nextBtn = document.querySelector('.menu-arrow--next');

if (menuGrid && prevBtn && nextBtn) {
  const step = () => {
    const card = menuGrid.querySelector('.menu-card');
    if (!card) return menuGrid.clientWidth;
    const gap = parseFloat(getComputedStyle(menuGrid).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const sync = () => {
    const max = menuGrid.scrollWidth - menuGrid.clientWidth;
    prevBtn.disabled = menuGrid.scrollLeft <= 1;
    nextBtn.disabled = menuGrid.scrollLeft >= max - 1;
  };

  prevBtn.addEventListener('click', () => menuGrid.scrollBy({ left: -step(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => menuGrid.scrollBy({ left: step(), behavior: 'smooth' }));
  menuGrid.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();
}
