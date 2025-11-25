const navLinks = document.querySelectorAll('.nav a');
const sections = [...document.querySelectorAll('section')];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', evt => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      evt.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('.timeline__item').forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
  item.style.opacity = 0;
  item.style.transform = 'translateY(20px)';
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
        reveal.disconnect();
      }
    });
  }, { threshold: 0.2 });
  reveal.observe(item);
});

const tributes = document.querySelectorAll('.tribute blockquote');
if (tributes.length) {
  let activeTribute = 0;
  setInterval(() => {
    tributes.forEach((quote, idx) => {
      quote.style.opacity = idx === activeTribute ? 1 : 0.45;
      quote.style.transform = idx === activeTribute ? 'translateY(0)' : 'translateY(6px)';
    });
    activeTribute = (activeTribute + 1) % tributes.length;
  }, 4000);
}
