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

    setTheme(initialTheme);

    if (!themeToggle) {
      return;
    }

    themeToggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  });
})();