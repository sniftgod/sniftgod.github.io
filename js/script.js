// Simple interactivity: highlight active nav link on scroll
const links = document.querySelectorAll('.nav a');

function setActiveLink() {
  const fromTop = window.scrollY + 100;

  const sections = document.querySelectorAll('section[id]');
  let current = null;

  sections.forEach((section) => {
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      current = section.getAttribute('id');
    }
  });

  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
