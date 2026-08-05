(function () {
  const PROJECT_LAYOUT_KEY = 'portfolio-project-layout';

  const projects = [
    {
      title: 'L’Oréal AI Beauty Chatbot',
      summary: 'AI-powered chatbot that provides personalized beauty recommendations using LLM integration, prompt engineering, and conversation management.',
      tags: ['AI Project', 'LLM Integration'],
      thumbnail: './img/Chatbot.png',
      thumbnailAlt: 'AI Beauty Chatbot project preview',
      overview: ['Personalized beauty and product guidance through a responsive conversational interface.'],
      technicalChallenge: ['Managing useful AI-driven recommendations while keeping conversation flow clear for visitors.'],
      keyFeatures: ['Personalized beauty/product guidance', 'LLM integration', 'Prompt and conversation handling', 'Responsive conversational interface'],
      implementation: ['Project details will be added after documentation review.'],
      screenshots: [{ src: './img/Chatbot.png', alt: 'AI Beauty Chatbot project screenshot' }],
      githubUrl: 'https://github.com/benson5112/AI_ChatBot',
      liveUrl: 'https://benson5112.github.io/AI_ChatBot/'
    },
    {
      title: 'NASA Space Explorer',
      summary: 'Interactive web application that retrieves and displays NASA’s Astronomy Picture of the Day using REST APIs, dynamic data fetching, and structured JSON processing.',
      tags: ['REST API', 'API Integration'],
      thumbnail: './img/NASA.png',
      thumbnailAlt: 'NASA Space Explorer project preview',
      overview: ['A browser project for exploring NASA Astronomy Picture of the Day content through API-backed interactions.'],
      technicalChallenge: ['Handling asynchronous API requests, JSON responses, and user-facing error states cleanly.'],
      keyFeatures: ['NASA Astronomy Picture of the Day API', 'Asynchronous API requests', 'JSON data handling', 'Date-based exploration', 'Error handling'],
      implementation: ['Project details will be added after documentation review.'],
      screenshots: [{ src: './img/NASA.png', alt: 'NASA Space Explorer project screenshot' }],
      githubUrl: 'https://github.com/benson5112/NASA_App',
      liveUrl: 'https://benson5112.github.io/NASA_App/'
    },
    {
      title: 'Resurrection W',
      summary: 'Browser-based game featuring event-driven programming, game state management, scoring logic, and dynamic user interactions.',
      tags: ['Interactive App', 'Game Logic'],
      thumbnail: './img/ResurrectionW.png',
      thumbnailAlt: 'Resurrection W project preview',
      overview: ['An interactive browser game focused on stateful gameplay and dynamic UI feedback.'],
      technicalChallenge: ['Coordinating game state, timing, scoring, difficulty, and user events in the browser.'],
      keyFeatures: ['Interactive browser game', 'Game state', 'Timer and scoring', 'Difficulty modes', 'Event-driven interactions', 'Dynamic UI feedback'],
      implementation: ['Project details will be added after documentation review.'],
      screenshots: [{ src: './img/ResurrectionW.png', alt: 'Resurrection W project screenshot' }],
      githubUrl: 'https://github.com/benson5112/ResurrectionW',
      liveUrl: 'https://benson5112.github.io/ResurrectionW/'
    },
    {
      title: 'Intel Summit Check-in App',
      summary: 'Attendee check-in workflow with check-in counts, progress tracking, and persistent browser state across refreshes.',
      tags: ['State Management', 'Local Persistence'],
      thumbnail: './img/Checkin.png',
      thumbnailAlt: 'Intel Summit Check-in App project preview',
      overview: ['A check-in application for managing attendee progress in a browser-based workflow.'],
      technicalChallenge: ['Persisting check-in state locally while keeping counts and progress understandable to the user.'],
      keyFeatures: ['Attendee check-in workflow', 'Check-in counts and progress', 'Browser localStorage', 'Persistent state across page refreshes'],
      implementation: ['Uses browser localStorage for persistent state across page refreshes.'],
      screenshots: [{ src: './img/Checkin.png', alt: 'Intel Summit Check-in App project screenshot' }],
      githubUrl: 'https://github.com/benson5112/Checkin_App',
      liveUrl: 'https://benson5112.github.io/Checkin_App/'
    }
  ];

  const gallery = document.querySelector('[data-projects-gallery]');
  const layoutButtons = Array.from(document.querySelectorAll('.layout-toggle'));
  const modal = document.querySelector('[data-project-modal]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalTags = document.querySelector('[data-modal-tags]');
  const modalBody = document.querySelector('[data-modal-body]');
  const modalClose = document.querySelector('[data-modal-close]');
  let lastFocusedCard = null;

  if (!gallery || !modal || !modalTitle || !modalTags || !modalBody || !modalClose) {
    return;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[char]));
  }

  function renderList(items) {
    const list = items.filter(Boolean);
    if (!list.length) {
      return '<p>Project details will be added after documentation review.</p>';
    }
    return `<ul>${list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function renderParagraphs(items) {
    const paragraphs = items.filter(Boolean);
    if (!paragraphs.length) {
      return '<p>Project details will be added after documentation review.</p>';
    }
    return paragraphs.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
  }

  function renderScreenshots(project) {
    if (!project.screenshots || project.screenshots.length === 0) {
      return '<div class="screenshot-placeholder">Screenshots coming soon.</div>';
    }

    return `
      <div class="screenshots-grid">
        ${project.screenshots.map((screenshot) => `
          <img src="${escapeHtml(screenshot.src)}" alt="${escapeHtml(screenshot.alt)}" loading="lazy">
        `).join('')}
      </div>
    `;
  }

  function renderCards() {
    gallery.innerHTML = projects.map((project, index) => `
      <button class="project-gallery-card" type="button" data-project-index="${index}">
        <span class="project-gallery-card__media">
          ${project.thumbnail
            ? `<img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.thumbnailAlt)}" loading="lazy">`
            : '<span class="project-gallery-card__placeholder" aria-hidden="true"><i class="fa-solid fa-folder-open"></i></span>'}
        </span>
        <span class="project-gallery-card__content">
          <span class="project-tags" aria-label="Project technical focus">
            ${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}
          </span>
          <span class="project-gallery-card__title">${escapeHtml(project.title)}</span>
          <span class="project-gallery-card__summary">${escapeHtml(project.summary)}</span>
          <span class="learn-more project-gallery-card__indicator">View Details →</span>
        </span>
      </button>
    `).join('');
  }

  function setLayout(layout) {
    const nextLayout = layout === 'list' ? 'list' : 'grid';
    gallery.classList.toggle('projects-gallery--list', nextLayout === 'list');
    gallery.classList.toggle('projects-gallery--grid', nextLayout === 'grid');
    layoutButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.layout === nextLayout));
    });
    localStorage.setItem(PROJECT_LAYOUT_KEY, nextLayout);
  }

  function populateModal(project) {
    modalTitle.textContent = project.title;
    modalTags.innerHTML = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
    modalBody.innerHTML = `
      <section>
        <h3>Overview</h3>
        ${renderParagraphs(project.overview)}
      </section>
      <section>
        <h3>Technical Challenge</h3>
        ${renderParagraphs(project.technicalChallenge)}
      </section>
      <section>
        <h3>Key Features</h3>
        ${renderList(project.keyFeatures)}
      </section>
      <section>
        <h3>Implementation</h3>
        ${renderParagraphs(project.implementation)}
      </section>
      <section>
        <h3>Screenshots</h3>
        ${renderScreenshots(project)}
      </section>
      <section>
        <div class="project-modal__actions${project.liveUrl ? '' : ' project-modal__actions--single'}">
          ${project.liveUrl ? `<a class="modal-action-button modal-action-button--primary" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">View Demo ↗</a>` : ''}
          <a class="modal-action-button modal-action-button--secondary" href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">View Repo ↗</a>
        </div>
      </section>
    `;
  }

  function getFocusableElements() {
    return Array.from(modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  }

  function resetModalScroll() {
    modal.scrollTop = 0;
    modalBody.scrollTop = 0;
  }

  function openModal(project, opener) {
    lastFocusedCard = opener;
    populateModal(project);

    document.body.classList.add('modal-open');
    modal.showModal();

    requestAnimationFrame(() => {
      resetModalScroll();

      requestAnimationFrame(() => {
        resetModalScroll();
        modalClose.focus({ preventScroll: true });
      });
    });
  }

  function closeModal() {
    if (!modal.open) return;
    modal.close();
  }

  renderCards();
  setLayout(localStorage.getItem(PROJECT_LAYOUT_KEY) || 'grid');

  layoutButtons.forEach((button) => {
    button.addEventListener('click', () => setLayout(button.dataset.layout));
  });

  gallery.addEventListener('click', (event) => {
    const card = event.target.closest('.project-gallery-card');
    if (!card) return;
    const project = projects[Number(card.dataset.projectIndex)];
    openModal(project, card);
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    const modalRect = modal.getBoundingClientRect();
    const clickedBackdrop = event.clientX < modalRect.left || event.clientX > modalRect.right || event.clientY < modalRect.top || event.clientY > modalRect.bottom;
    if (clickedBackdrop) {
      closeModal();
    }
  });

  modal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeModal();
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = getFocusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  modal.addEventListener('close', () => {
    resetModalScroll();
    document.body.classList.remove('modal-open');

    if (lastFocusedCard) {
      lastFocusedCard.focus({ preventScroll: true });
    }
  });
})();