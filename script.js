(function () {
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function setTheme(theme) {
    const themeToggle = document.querySelector('.theme-toggle');

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (!themeToggle) {
      return;
    }

    const themeToggleIcon = themeToggle.querySelector('i');
    const isDark = theme === 'dark';

    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

    if (themeToggleIcon) {
      themeToggleIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const initialTheme = localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light';
    const timelineItems = document.querySelectorAll('.experience-card');

    setTheme(initialTheme);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      timelineItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });

      timelineItems.forEach((item) => timelineObserver.observe(item));
    }

    if (!themeToggle) {
      return;
    }

    themeToggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  });
})();