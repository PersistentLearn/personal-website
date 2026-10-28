// 网站交互：手机导航菜单、项目筛选、回到顶部与滚动进入效果。HTML 使用 defer 确保元素就绪。
const menu = document.querySelector('.menu');
const links = document.querySelector('#nav-links');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  links.classList.toggle('open', !open);
});
links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  links.classList.remove('open');
}));
const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => {
  backToTop.hidden = window.scrollY <= 300;
};
window.addEventListener('scroll', updateBackToTop, { passive: true });
window.addEventListener('pageshow', updateBackToTop);
updateBackToTop();
backToTop.addEventListener('click', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
});

const projectFilters = document.querySelector('.project-filters');
const filterButtons = projectFilters.querySelectorAll('button[data-filter]');
const projects = document.querySelectorAll('#projects .project[data-category]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  projects.forEach(project => {
    project.hidden = category !== 'all' && project.dataset.category !== category;
  });
}));
projectFilters.hidden = false;

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: .12 });
  document.documentElement.classList.add('js-reveal');
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
