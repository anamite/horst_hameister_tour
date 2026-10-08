document.documentElement.classList.add('js');
document.querySelectorAll('.photo img').forEach(img => {
  const missing = () => { img.classList.add('failed'); img.parentElement.setAttribute('role', 'img'); img.parentElement.setAttribute('aria-label', img.alt); };
  img.addEventListener('error', missing);
  if (img.complete && img.naturalWidth === 0) missing();
});
document.querySelectorAll('[data-whatsapp], [data-tour]').forEach(link => {
  const tour = link.dataset.tour;
  const message = `Moin Horst, ich interessiere mich für ${tour ? `die Führung „${tour}“` : 'eine Stadtführung in Bremen'}.\nWunschtermin: …\n${tour === 'Märchen auf dem Marktplatz' ? 'Anzahl der Kinder: …\nAnzahl der Erwachsenen: …' : 'Anzahl der Personen (mindestens 2): …'}\nIst an diesem Termin eine Führung möglich?`;
  link.href = `https://wa.me/491773955635?text=${encodeURIComponent(message)}`;
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
if (menu && nav) {
  menu.hidden = false;
  function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
}
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveals = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal-in'); reveals.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.tour-card, .about-copy, .review-card, .steps-grid>div').forEach(element => reveals.observe(element));
}
const hero = document.querySelector('.hero');
const mobileContact = document.querySelector('.mobile-contact');
if (hero && mobileContact && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => mobileContact.classList.toggle('visible', !entry.isIntersecting && entry.boundingClientRect.bottom < 0)).observe(hero);
}
