document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const extraOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--offset-extra')) || 0;
    const scrollPos = target.offsetTop - headerHeight - extraOffset;
    window.scrollTo({ top: scrollPos < 0 ? 0 : scrollPos, behavior: 'smooth' });

    const heading = target.querySelector('h2');
    if (!heading) return;

    heading.classList.remove('h2-highlight');
    void heading.offsetWidth;
    heading.classList.add('h2-highlight');
    setTimeout(() => heading.classList.remove('h2-highlight'), 1200);
  });
});
