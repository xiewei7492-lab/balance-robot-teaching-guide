const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');

const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const image = document.querySelector('[data-diagram-image]');
const title = document.querySelector('[data-diagram-title]');
const copy = document.querySelector('[data-diagram-copy]');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxTitle = document.querySelector('[data-lightbox-title]');

document.querySelectorAll('[data-diagram]').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-diagram]').forEach((item) => item.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    const nextImage = `./assets/${tab.dataset.diagram}`;
    image.src = nextImage;
    image.alt = `${tab.dataset.title}系统图`;
    title.textContent = tab.dataset.title;
    copy.textContent = tab.dataset.copy;
    lightboxImage.src = nextImage;
    lightboxImage.alt = `${tab.dataset.title}系统图大图`;
    lightboxTitle.textContent = tab.dataset.title;
  });
});

document.querySelector('[data-open-lightbox]')?.addEventListener('click', () => lightbox?.showModal());
document.querySelector('[data-close-lightbox]')?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
