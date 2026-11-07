/**
 * EventPulse - Main Application Logic
 * Implements Theme Toggle, Live Search & Filtering, Live Countdown Timers,
 * Form Validation, LocalStorage Registration & Bookings Management, and Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    events: [...INITIAL_EVENTS],
    filteredEvents: [...INITIAL_EVENTS],
    activeCategory: 'all',
    searchQuery: '',
    selectedFormat: 'all',
    selectedPrice: 'all',
    sortBy: 'date-asc',
    activeModalEvent: null,
    favorites: JSON.parse(localStorage.getItem('eventpulse_favorites') || '[]'),
    registrations: JSON.parse(localStorage.getItem('eventpulse_registrations') || '[]'),
    theme: localStorage.getItem('eventpulse_theme') || 'dark',
    countdownIntervals: {}
  };

  // DOM Elements
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navLinksList = document.getElementById('nav-links-list');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // Featured Hero elements
  const featuredEventCard = document.getElementById('featured-event-container');

  // Filter elements
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const categoryPillsContainer = document.getElementById('category-pills');
  const formatFilterBtns = document.querySelectorAll('[data-format-filter]');
  const priceFilterBtns = document.querySelectorAll('[data-price-filter]');
  const sortSelect = document.getElementById('sort-select');
  const eventsGrid = document.getElementById('events-grid');
  const resultsCounter = document.getElementById('results-count');

  // Modals
  const eventDetailsModal = document.getElementById('event-details-modal');
  const registrationModal = document.getElementById('registration-modal');
  const myBookingsModal = document.getElementById('my-bookings-modal');
  const myBookingsBtn = document.getElementById('my-bookings-btn');
  const bookingsBadgeCount = document.getElementById('bookings-badge-count');
  const toastContainer = document.getElementById('toast-container');

  // Registration Form Elements
  const regForm = document.getElementById('event-registration-form');
  const regStep1 = document.getElementById('reg-step-1');
  const regStep2 = document.getElementById('reg-step-2');
  const regEventSummary = document.getElementById('reg-event-summary');
  const ticketTiersContainer = document.getElementById('ticket-tiers-container');
  const ticketQuantityVal = document.getElementById('ticket-quantity');
  const btnQtyMinus = document.getElementById('qty-minus');
  const btnQtyPlus = document.getElementById('qty-plus');
  const totalAmountDisplay = document.getElementById('total-amount-display');

  // Indian Rupee formatting (\u20B9 = rupee sign), e.g. 149999 -> 1,49,999
  const formatPrice = (n) => n === 0 ? 'Free' : '\u20B9' + Number(n).toLocaleString('en-IN');

  /* ==========================================================================
     1. Theme Management (Dark / Light Mode)
     ========================================================================== */
  function applyTheme(theme) {
    state.theme = theme;
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('eventpulse_theme', theme);

    if (theme === 'dark') {
      themeIconSun.style.display = 'block';
      themeIconMoon.style.display = 'none';
    } else {
      themeIconSun.style.display = 'none';
      themeIconMoon.style.display = 'block';
    }
  }

  applyTheme(state.theme);

  themeToggleBtn.addEventListener('click', () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast('Theme Changed', `Switched to ${newTheme} mode`, 'info');
  });

  /* ==========================================================================
     2. Mobile Menu & Scroll To Top
     ========================================================================== */
  mobileNavToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
  });

  // Close mobile nav when clicking a link
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================================
     3. Category Pills & Discovery Filter Initialization
     ========================================================================== */
  function renderCategoryPills() {
    categoryPillsContainer.innerHTML = CATEGORIES.map(cat => `
      <button type="button" class="category-pill ${cat.id === state.activeCategory ? 'active' : ''}" data-category="${cat.id}">
        <span>${cat.label}</span>
      </button>
    `).join('');

    categoryPillsContainer.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.dataset.category;
        renderCategoryPills();
        applyFilters();
      });
    });
  }

  // Format Filter Buttons
  formatFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      formatFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedFormat = btn.dataset.formatFilter;
      applyFilters();
    });
  });

  // Price Filter Buttons
  priceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      priceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedPrice = btn.dataset.priceFilter;
      applyFilters();
    });
  });

  // Sort Selection
  sortSelect.addEventListener('change', () => {
    state.sortBy = sortSelect.value;
    applyFilters();
  });

  // Live Search Input with debouncing
  let searchTimeout = null;
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    searchClearBtn.classList.toggle('visible', val.length > 0);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.searchQuery = val.toLowerCase();
      applyFilters();
    }, 200);
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.classList.remove('visible');
    state.searchQuery = '';
    applyFilters();
    searchInput.focus();
  });

  /* ==========================================================================
     4. Filter & Sort Engine
     ========================================================================== */
  function applyFilters() {
    let list = [...state.events];

    // 1. Category Filter
    if (state.activeCategory !== 'all') {
      list = list.filter(item => item.category === state.activeCategory);
    }

    // 2. Format Filter
    if (state.selectedFormat !== 'all') {
      list = list.filter(item => item.format.toLowerCase() === state.selectedFormat.toLowerCase());
    }

    // 3. Price Filter
    if (state.selectedPrice === 'free') {
      list = list.filter(item => item.price === 0);
    } else if (state.selectedPrice === 'paid') {
      list = list.filter(item => item.price > 0);
    }

    // 4. Search Filter
    if (state.searchQuery) {
      list = list.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(state.searchQuery);
        const descMatch = item.description.toLowerCase().includes(state.searchQuery);
        const venueMatch = item.venue.toLowerCase().includes(state.searchQuery);
        const categoryMatch = item.categoryLabel.toLowerCase().includes(state.searchQuery);
        return titleMatch || descMatch || venueMatch || categoryMatch;
      });
    }

    // 5. Sorting
    if (state.sortBy === 'date-asc') {
      list.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
    } else if (state.sortBy === 'popularity') {
      list.sort((a, b) => (b.registeredSeats / b.totalSeats) - (a.registeredSeats / a.totalSeats));
    } else if (state.sortBy === 'title-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    state.filteredEvents = list;
    resultsCounter.textContent = `Showing ${list.length} ${list.length === 1 ? 'event' : 'events'}`;
    renderEventsGrid();
  }

  /* ==========================================================================
     5. Render Events Grid
     ========================================================================== */
  function renderEventsGrid() {
    if (state.filteredEvents.length === 0) {
      eventsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3 class="empty-title">No Events Found</h3>
          <p class="empty-desc">We couldn't find any events matching your selected criteria. Try adjusting your search query or reset the filters.</p>
          <button class="btn btn-primary" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;

      document.getElementById('btn-reset-filters')?.addEventListener('click', resetAllFilters);
      return;
    }

    eventsGrid.innerHTML = state.filteredEvents.map(event => {
      const isBookmarked = state.favorites.includes(event.id);
      const capacityPercent = Math.round((event.registeredSeats / event.totalSeats) * 100);
      const remainingSeats = event.totalSeats - event.registeredSeats;

      return `
        <article class="event-card" data-event-id="${event.id}">
          <div class="event-card-media">
            <img src="${event.image}" alt="${event.title}" loading="lazy">
            <div class="card-top-badges">
              <span class="badge badge-${event.category}">${event.categoryLabel}</span>
              <button type="button" class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-bookmark-id="${event.id}" title="${isBookmarked ? 'Remove from favorites' : 'Save to favorites'}" aria-label="Save event">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="event-card-body">
            <div class="event-meta-datetime">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${event.date} • ${event.time.split('-')[0].trim()}</span>
            </div>

            <h3 class="event-card-title">${event.title}</h3>
            <p class="event-card-desc">${event.tagline}</p>

            <div class="event-location-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${event.locationShort} • <strong style="color: var(--text-primary);">${event.format}</strong></span>
            </div>

            <div class="capacity-tracker">
              <div class="capacity-labels">
                <span>Capacity (${capacityPercent}%)</span>
                <span>${remainingSeats} seats left</span>
              </div>
              <div class="capacity-progress-track">
                <div class="capacity-progress-fill ${capacityPercent > 80 ? 'nearly-full' : ''}" style="width: ${capacityPercent}%"></div>
              </div>
            </div>

            <div class="event-card-footer">
              <div class="event-price-tag">
                <span class="price-sub">Starting at</span>
                <span class="price-unit">${formatPrice(event.price)}</span>
              </div>
              <div class="card-actions">
                <button type="button" class="btn btn-secondary btn-sm btn-view-details" data-event-id="${event.id}">Details</button>
                <button type="button" class="btn btn-primary btn-sm btn-register-trigger" data-event-id="${event.id}">Register</button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach Event Listeners to cards
    attachCardEvents();
  }

  function attachCardEvents() {
    // View Details buttons
    document.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evId = btn.dataset.eventId;
        openEventDetailsModal(evId);
      });
    });

    // Register CTA buttons
    document.querySelectorAll('.btn-register-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evId = btn.dataset.eventId;
        openRegistrationModal(evId);
      });
    });

    // Bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.bookmarkId);
      });
    });
  }

  function resetAllFilters() {
    state.activeCategory = 'all';
    state.searchQuery = '';
    state.selectedFormat = 'all';
    state.selectedPrice = 'all';
    state.sortBy = 'date-asc';

    searchInput.value = '';
    searchClearBtn.classList.remove('visible');
    sortSelect.value = 'date-asc';

    formatFilterBtns.forEach(b => b.classList.toggle('active', b.dataset.formatFilter === 'all'));
    priceFilterBtns.forEach(b => b.classList.toggle('active', b.dataset.priceFilter === 'all'));

    renderCategoryPills();
    applyFilters();
  }

  /* ==========================================================================
     6. Bookmark / Favorites Management
     ========================================================================== */
  function toggleFavorite(eventId) {
    const ev = state.events.find(e => e.id === eventId);
    if (!ev) return;

    if (state.favorites.includes(eventId)) {
      state.favorites = state.favorites.filter(id => id !== eventId);
      showToast('Removed from Wishlist', `"${ev.title}" has been removed from your saved events.`, 'info');
    } else {
      state.favorites.push(eventId);
      showToast('Saved to Wishlist!', `"${ev.title}" is saved in your favorites.`, 'success');
    }

    localStorage.setItem('eventpulse_favorites', JSON.stringify(state.favorites));
    renderEventsGrid();
  }

  /* ==========================================================================
     7. Live Countdown Timers Engine
     ========================================================================== */
  function initLiveCountdown(elementId, targetIsoDate) {
    if (state.countdownIntervals[elementId]) {
      clearInterval(state.countdownIntervals[elementId]);
    }

    const container = document.getElementById(elementId);
    if (!container) return;

    const daysEl = container.querySelector('.cd-days');
    const hoursEl = container.querySelector('.cd-hours');
    const minsEl = container.querySelector('.cd-mins');
    const secsEl = container.querySelector('.cd-secs');

    function update() {
      const targetTime = new Date(targetIsoDate + '+05:30').getTime(); // IST
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        clearInterval(state.countdownIntervals[elementId]);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    update();
    state.countdownIntervals[elementId] = setInterval(update, 1000);
  }

  // Render Hero Featured Spotlight
  function renderFeaturedSpotlight() {
    const featured = state.events.find(e => e.featured) || state.events[0];
    if (!featured) return;

    featuredEventCard.innerHTML = `
      <div class="featured-card">
        <div class="featured-media">
          <img src="${featured.image}" alt="${featured.title}">
          <div class="featured-overlay-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Featured Spotlight
          </div>
        </div>

        <div class="featured-info">
          <div>
            <div class="featured-meta-top">
              <span class="badge badge-${featured.category}">${featured.categoryLabel}</span>
              <span class="badge badge-format">${featured.format}</span>
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">
                ${featured.date} • ${featured.venue}
              </span>
            </div>

            <h3 class="featured-title">${featured.title}</h3>
            <p class="featured-desc">${featured.description.split('\n')[0]}</p>

            <div class="countdown-box">
              <div class="countdown-header">
                <span class="countdown-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Registration Closes In
                </span>
                <span style="font-size: 0.75rem; color: var(--success); font-weight: 700;">• Live Countdown</span>
              </div>
              <div class="countdown-timer-units" id="featured-countdown-timer">
                <div class="timer-block">
                  <div class="timer-val cd-days">00</div>
                  <div class="timer-lbl">Days</div>
                </div>
                <div class="timer-block">
                  <div class="timer-val cd-hours">00</div>
                  <div class="timer-lbl">Hours</div>
                </div>
                <div class="timer-block">
                  <div class="timer-val cd-mins">00</div>
                  <div class="timer-lbl">Minutes</div>
                </div>
                <div class="timer-block">
                  <div class="timer-val cd-secs">00</div>
                  <div class="timer-lbl">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          <div class="featured-footer">
            <div class="featured-price-group">
              <span class="price-sub">All-inclusive Pass</span>
              <span class="price-main">${formatPrice(featured.price)}</span>
            </div>
            <div class="featured-buttons">
              <button type="button" class="btn btn-secondary btn-view-details" data-event-id="${featured.id}">View Details</button>
              <button type="button" class="btn btn-primary btn-register-trigger" data-event-id="${featured.id}">Register Now</button>
            </div>
          </div>
        </div>
      </div>
    `;

    initLiveCountdown('featured-countdown-timer', featured.isoDate);

    // Attach click events
    featuredEventCard.querySelector('.btn-view-details').addEventListener('click', () => {
      openEventDetailsModal(featured.id);
    });
    featuredEventCard.querySelector('.btn-register-trigger').addEventListener('click', () => {
      openRegistrationModal(featured.id);
    });
  }

  /* ==========================================================================
     8. Event Details Modal
     ========================================================================== */
  function openEventDetailsModal(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;

    state.activeModalEvent = event;
    const modalContent = document.getElementById('details-modal-content');

    modalContent.innerHTML = `
      <div class="detail-hero-banner">
        <img src="${event.image}" alt="${event.title}">
        <div class="detail-banner-content">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span class="badge badge-${event.category}">${event.categoryLabel}</span>
            <span class="badge badge-format">${event.format}</span>
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800;">${event.title}</h2>
        </div>
      </div>

      <div class="detail-info-grid">
        <div class="info-item">
          <div class="info-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div>
            <div class="info-title">Date & Time</div>
            <div class="info-value">${event.date}</div>
            <div style="font-size: 0.775rem; color: var(--text-muted);">${event.time}</div>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div>
            <div class="info-title">Location / Venue</div>
            <div class="info-value">${event.locationShort}</div>
            <div style="font-size: 0.775rem; color: var(--text-muted);">${event.venue}</div>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div>
            <div class="info-title">Availability</div>
            <div class="info-value">${event.totalSeats - event.registeredSeats} spots remaining</div>
            <div style="font-size: 0.775rem; color: var(--text-muted);">Total capacity: ${event.totalSeats}</div>
          </div>
        </div>
      </div>

      <div class="countdown-box" style="margin-bottom: 1.75rem;">
        <div class="countdown-header">
          <span class="countdown-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Event Begins In
          </span>
          <span style="font-size: 0.75rem; color: var(--success); font-weight: 700;">Live Ticking</span>
        </div>
        <div class="countdown-timer-units" id="modal-countdown-timer">
          <div class="timer-block">
            <div class="timer-val cd-days">00</div>
            <div class="timer-lbl">Days</div>
          </div>
          <div class="timer-block">
            <div class="timer-val cd-hours">00</div>
            <div class="timer-lbl">Hours</div>
          </div>
          <div class="timer-block">
            <div class="timer-val cd-mins">00</div>
            <div class="timer-lbl">Minutes</div>
          </div>
          <div class="timer-block">
            <div class="timer-val cd-secs">00</div>
            <div class="timer-lbl">Seconds</div>
          </div>
        </div>
      </div>

      <h4 class="section-subheading">About the Event</h4>
      <div class="detail-description">${event.description}</div>

      <h4 class="section-subheading">Event Highlights</h4>
      <div class="highlights-list">
        ${event.highlights.map(h => `
          <div class="highlight-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${h}</span>
          </div>
        `).join('')}
      </div>

      ${event.speakers && event.speakers.length > 0 ? `
        <h4 class="section-subheading">Featured Speakers & Hosts</h4>
        <div class="speakers-grid">
          ${event.speakers.map(s => `
            <div class="speaker-card">
              <img src="${s.avatar}" alt="${s.name}" class="speaker-avatar">
              <div>
                <div class="speaker-name">${s.name}</div>
                <div class="speaker-role">${s.role} • ${s.company}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${event.agenda && event.agenda.length > 0 ? `
        <h4 class="section-subheading">Schedule & Agenda</h4>
        <div class="agenda-timeline">
          ${event.agenda.map(a => `
            <div class="agenda-item">
              <div class="agenda-time">${a.time}</div>
              <div>
                <div class="agenda-title">${a.title}</div>
                <div class="agenda-speaker">Led by: ${a.speaker}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    // Footer actions
    const modalFooter = document.getElementById('details-modal-footer');
    modalFooter.innerHTML = `
      <div style="display: flex; gap: 0.5rem;">
        <button type="button" class="btn btn-outline btn-sm" id="btn-add-calendar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Add to Calendar (.ics)
        </button>
        <button type="button" class="btn btn-outline btn-sm" id="btn-share-event">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
      </div>

      <button type="button" class="btn btn-primary" id="btn-modal-proceed-reg">
        <span>Register Now (${formatPrice(event.price)})</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    `;

    initLiveCountdown('modal-countdown-timer', event.isoDate);

    // Add to Calendar listener
    document.getElementById('btn-add-calendar').addEventListener('click', () => {
      downloadICalFile(event);
    });

    // Share event listener
    document.getElementById('btn-share-event').addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: event.title,
          text: event.tagline,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link Copied', 'Event URL copied to clipboard!', 'info');
      }
    });

    // Proceed to Registration
    document.getElementById('btn-modal-proceed-reg').addEventListener('click', () => {
      closeModal(eventDetailsModal);
      openRegistrationModal(event.id);
    });

    openModal(eventDetailsModal);
  }

  /* ==========================================================================
     9. Add to Calendar (.ics File Generator)
     ========================================================================== */
  function downloadICalFile(event) {
    const startDate = new Date(event.isoDate + '+05:30'); // IST
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EventPulse//Event Management Platform//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}-${Date.now()}@eventpulse.com`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.tagline}`,
      `LOCATION:${event.venue}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Calendar Downloaded', 'Calendar invitation (.ics) file downloaded!', 'success');
  }

  /* ==========================================================================
     10. Registration Form & JavaScript Validation Engine
     ========================================================================== */
  let currentRegEvent = null;
  let selectedTier = null;
  let ticketCount = 1;

  function openRegistrationModal(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;

    currentRegEvent = event;
    ticketCount = 1;
    ticketQuantityVal.textContent = '1';
    btnQtyMinus.disabled = true;
    btnQtyPlus.disabled = false;

    // Reset Form & Views
    regStep1.style.display = 'block';
    regStep2.style.display = 'none';
    regForm.reset();
    clearAllFormValidation();

    // Fill Event Preview
    regEventSummary.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="preview-thumb">
      <div>
        <div class="preview-title">${event.title}</div>
        <div class="preview-sub">${event.date} • ${event.venue}</div>
      </div>
    `;

    // Render Ticket Tiers
    renderTicketTiers(event);

    updatePriceCalculation();
    openModal(registrationModal);
  }

  function renderTicketTiers(event) {
    const tiers = event.ticketTiers || [
      { id: 'standard', name: 'Standard Pass', price: event.price, desc: 'Full event entry & materials' }
    ];

    selectedTier = tiers[0];

    ticketTiersContainer.innerHTML = tiers.map((tier, idx) => `
      <label class="tier-option ${idx === 0 ? 'selected' : ''}" data-tier-id="${tier.id}">
        <input type="radio" name="ticket-tier" value="${tier.id}" ${idx === 0 ? 'checked' : ''}>
        <div class="tier-header">
          <span class="tier-name">${tier.name}</span>
          <span class="tier-price">${formatPrice(tier.price)}</span>
        </div>
        <p class="tier-desc">${tier.desc}</p>
      </label>
    `).join('');

    ticketTiersContainer.querySelectorAll('.tier-option').forEach(label => {
      label.addEventListener('click', () => {
        ticketTiersContainer.querySelectorAll('.tier-option').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
        const tierId = label.dataset.tierId;
        selectedTier = tiers.find(t => t.id === tierId);
        updatePriceCalculation();
      });
    });
  }

  // Stepper handlers
  btnQtyMinus.addEventListener('click', () => {
    if (ticketCount > 1) {
      ticketCount--;
      ticketQuantityVal.textContent = ticketCount;
      btnQtyMinus.disabled = ticketCount <= 1;
      btnQtyPlus.disabled = ticketCount >= 5;
      updatePriceCalculation();
    }
  });

  btnQtyPlus.addEventListener('click', () => {
    if (ticketCount < 5) {
      ticketCount++;
      ticketQuantityVal.textContent = ticketCount;
      btnQtyMinus.disabled = ticketCount <= 1;
      btnQtyPlus.disabled = ticketCount >= 5;
      updatePriceCalculation();
    }
  });

  function updatePriceCalculation() {
    if (!selectedTier) return;
    const total = selectedTier.price * ticketCount;
    totalAmountDisplay.textContent = formatPrice(total);
  }

  // Form Field Validation Rules
  const formFields = {
    name: {
      el: document.getElementById('reg-fullname'),
      group: document.getElementById('reg-fullname').closest('.form-group'),
      validate: (val) => {
        if (!val || val.trim().length < 3) return 'Please enter your full name (minimum 3 characters)';
        if (!/^[a-zA-Z\s.'-]+$/.test(val.trim())) return 'Name must only contain alphabetic characters';
        return true;
      }
    },
    email: {
      el: document.getElementById('reg-email'),
      group: document.getElementById('reg-email').closest('.form-group'),
      validate: (val) => {
        if (!val || val.trim().length === 0) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email address (e.g. name@domain.com)';
        return true;
      }
    },
    phone: {
      el: document.getElementById('reg-phone'),
      group: document.getElementById('reg-phone').closest('.form-group'),
      validate: (val) => {
        if (!val || val.trim().length === 0) return 'Phone number is required';
        const cleanPhone = val.replace(/[\s\-\(\)]/g, '');
        if (!/^(\+91|91|0)?[6-9][0-9]{9}$/.test(cleanPhone)) return 'Enter a valid 10-digit Indian mobile number (e.g. +91 98765 43210)';
        return true;
      }
    },
    terms: {
      el: document.getElementById('reg-terms'),
      group: document.getElementById('reg-terms').closest('.form-group'),
      validate: (val, el) => {
        if (!el.checked) return 'You must agree to the Terms & Privacy Policy to proceed';
        return true;
      }
    }
  };

  // Real-time Validation listeners on input & blur
  Object.keys(formFields).forEach(key => {
    const field = formFields[key];
    const triggerValidation = () => {
      const result = field.validate(field.el.value, field.el);
      const msgEl = field.group.querySelector('.validation-msg');

      if (result === true) {
        field.group.classList.remove('is-invalid');
        field.group.classList.add('is-valid');
        if (msgEl) msgEl.textContent = '';
      } else {
        field.group.classList.remove('is-valid');
        field.group.classList.add('is-invalid');
        if (msgEl) msgEl.textContent = result;
      }
      return result === true;
    };

    field.el.addEventListener('blur', triggerValidation);
    field.el.addEventListener('input', () => {
      if (field.group.classList.contains('is-invalid')) {
        triggerValidation();
      }
    });
  });

  function clearAllFormValidation() {
    Object.keys(formFields).forEach(key => {
      const field = formFields[key];
      field.group.classList.remove('is-valid', 'is-invalid');
      const msgEl = field.group.querySelector('.validation-msg');
      if (msgEl) msgEl.textContent = '';
    });
  }

  // Handle Form Submission
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    Object.keys(formFields).forEach(key => {
      const field = formFields[key];
      const result = field.validate(field.el.value, field.el);
      const msgEl = field.group.querySelector('.validation-msg');

      if (result !== true) {
        isFormValid = false;
        field.group.classList.remove('is-valid');
        field.group.classList.add('is-invalid');
        if (msgEl) msgEl.textContent = result;
      } else {
        field.group.classList.remove('is-invalid');
        field.group.classList.add('is-valid');
        if (msgEl) msgEl.textContent = '';
      }
    });

    if (!isFormValid) {
      showToast('Validation Error', 'Please check and correct the highlighted fields.', 'danger');
      return;
    }

    // Process valid registration
    const attendeeName = formFields.name.el.value.trim();
    const attendeeEmail = formFields.email.el.value.trim();
    const attendeePhone = formFields.phone.el.value.trim();
    const notes = document.getElementById('reg-notes')?.value.trim() || '';

    // Generate unique Ticket ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `EP-2026-${randomCode}`;
    const totalAmount = selectedTier.price * ticketCount;

    const registrationData = {
      ticketId,
      bookingDate: new Date().toISOString(),
      attendee: {
        name: attendeeName,
        email: attendeeEmail,
        phone: attendeePhone
      },
      event: {
        id: currentRegEvent.id,
        title: currentRegEvent.title,
        date: currentRegEvent.date,
        time: currentRegEvent.time,
        venue: currentRegEvent.venue,
        image: currentRegEvent.image,
        category: currentRegEvent.category
      },
      tier: selectedTier.name,
      ticketCount,
      totalAmount,
      notes
    };

    // Save to LocalStorage
    state.registrations.unshift(registrationData);
    localStorage.setItem('eventpulse_registrations', JSON.stringify(state.registrations));

    // Update Event Seats
    currentRegEvent.registeredSeats += ticketCount;
    renderEventsGrid();
    renderFeaturedSpotlight();
    updateBookingsBadge();

    // Render Digital Ticket Pass
    renderConfirmationTicket(registrationData);
    showToast('Registration Confirmed!', `Your ticket ${ticketId} has been generated.`, 'success');
  });

  /* ==========================================================================
     11. Digital Ticket Pass Display
     ========================================================================== */
  function renderConfirmationTicket(reg) {
    regStep1.style.display = 'none';
    regStep2.style.display = 'block';

    regStep2.innerHTML = `
      <div class="ticket-pass-wrapper">
        <div class="confirmation-badge-pill">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Registration Successfully Confirmed!
        </div>

        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem;">Your Official Event Pass</h3>
        <p style="color: var(--text-secondary); font-size: 0.875rem;">A confirmation email has been dispatched to <strong>${reg.attendee.email}</strong>.</p>

        <div class="ticket-pass-card" id="printable-ticket">
          <div class="ticket-pass-header">
            <div class="pass-brand">EVENTPULSE PASS</div>
            <div class="pass-id-badge">${reg.ticketId}</div>
          </div>

          <div class="ticket-pass-body">
            <div class="ticket-event-name">${reg.event.title}</div>

            <div class="ticket-grid-details">
              <div class="ticket-detail-item">
                <span class="ticket-label">Attendee</span>
                <span class="ticket-val">${reg.attendee.name}</span>
              </div>
              <div class="ticket-detail-item">
                <span class="ticket-label">Tier & Tickets</span>
                <span class="ticket-val">${reg.tier} (Qty: ${reg.ticketCount})</span>
              </div>
              <div class="ticket-detail-item">
                <span class="ticket-label">Date & Time</span>
                <span class="ticket-val">${reg.event.date}</span>
              </div>
              <div class="ticket-detail-item">
                <span class="ticket-label">Location</span>
                <span class="ticket-val">${reg.event.venue}</span>
              </div>
            </div>

            <div class="ticket-barcode-strip">
              <div>
                <svg class="barcode-svg" viewBox="0 0 160 30" preserveAspectRatio="none">
                  <rect x="0" y="0" width="3" height="30" fill="currentColor"/>
                  <rect x="6" y="0" width="2" height="30" fill="currentColor"/>
                  <rect x="11" y="0" width="4" height="30" fill="currentColor"/>
                  <rect x="18" y="0" width="1" height="30" fill="currentColor"/>
                  <rect x="22" y="0" width="5" height="30" fill="currentColor"/>
                  <rect x="30" y="0" width="2" height="30" fill="currentColor"/>
                  <rect x="35" y="0" width="4" height="30" fill="currentColor"/>
                  <rect x="42" y="0" width="1" height="30" fill="currentColor"/>
                  <rect x="46" y="0" width="3" height="30" fill="currentColor"/>
                  <rect x="52" y="0" width="6" height="30" fill="currentColor"/>
                  <rect x="61" y="0" width="2" height="30" fill="currentColor"/>
                  <rect x="66" y="0" width="4" height="30" fill="currentColor"/>
                  <rect x="73" y="0" width="2" height="30" fill="currentColor"/>
                  <rect x="78" y="0" width="5" height="30" fill="currentColor"/>
                  <rect x="86" y="0" width="1" height="30" fill="currentColor"/>
                  <rect x="90" y="0" width="4" height="30" fill="currentColor"/>
                  <rect x="97" y="0" width="3" height="30" fill="currentColor"/>
                  <rect x="103" y="0" width="2" height="30" fill="currentColor"/>
                  <rect x="108" y="0" width="5" height="30" fill="currentColor"/>
                  <rect x="116" y="0" width="2" height="30" fill="currentColor"/>
                  <rect x="121" y="0" width="3" height="30" fill="currentColor"/>
                  <rect x="127" y="0" width="4" height="30" fill="currentColor"/>
                  <rect x="134" y="0" width="1" height="30" fill="currentColor"/>
                  <rect x="138" y="0" width="5" height="30" fill="currentColor"/>
                  <rect x="146" y="0" width="2" height="30" fill="currentColor"/>
                  <rect x="151" y="0" width="4" height="30" fill="currentColor"/>
                </svg>
                <div style="font-family: monospace; font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">
                  SECURE VERIFICATION CODE: ${reg.ticketId}
                </div>
              </div>

              <div class="ticket-qr-placeholder" title="Fast Entry QR Code">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <line x1="14" y1="14" x2="14" y2="14.01"></line>
                  <line x1="18" y1="14" x2="18" y2="14.01"></line>
                  <line x1="14" y1="18" x2="18" y2="18"></line>
                  <line x1="18" y1="21" x2="21" y2="21"></line>
                  <line x1="21" y1="14" x2="21" y2="18"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="ticket-action-row">
          <button type="button" class="btn btn-secondary" id="btn-print-ticket">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print / Save Ticket
          </button>
          <button type="button" class="btn btn-primary" id="btn-view-all-bookings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Go to My Bookings
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-print-ticket').addEventListener('click', () => {
      window.print();
    });

    document.getElementById('btn-view-all-bookings').addEventListener('click', () => {
      closeModal(registrationModal);
      openMyBookingsModal();
    });
  }

  /* ==========================================================================
     12. LocalStorage Registration Data Management ("My Bookings")
     ========================================================================== */
  function updateBookingsBadge() {
    const count = state.registrations.length;
    if (count > 0) {
      bookingsBadgeCount.textContent = count;
      bookingsBadgeCount.classList.remove('is-empty');
      bookingsBadgeCount.classList.add('has-items');
    } else {
      bookingsBadgeCount.textContent = '0';
      bookingsBadgeCount.classList.add('is-empty');
      bookingsBadgeCount.classList.remove('has-items');
    }
  }

  myBookingsBtn.addEventListener('click', () => {
    openMyBookingsModal();
  });

  function openMyBookingsModal() {
    renderBookingsList();
    openModal(myBookingsModal);
  }

  function renderBookingsList() {
    const container = document.getElementById('my-bookings-container');

    if (state.registrations.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3 class="empty-title">No Registered Events Yet</h3>
          <p class="empty-desc">You have not registered for any events yet. Explore upcoming tech summits, music festivals, and design workshops!</p>
          <button class="btn btn-primary" id="btn-browse-events-from-bookings">Browse Upcoming Events</button>
        </div>
      `;

      document.getElementById('btn-browse-events-from-bookings')?.addEventListener('click', () => {
        closeModal(myBookingsModal);
        document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-secondary);">
          You have ${state.registrations.length} registered ${state.registrations.length === 1 ? 'ticket' : 'tickets'}
        </span>
        <button type="button" class="btn btn-outline btn-sm" id="btn-export-bookings">Export (JSON)</button>
      </div>

      <div class="bookings-list">
        ${state.registrations.map((reg, index) => `
          <div class="booking-item-card" data-ticket-id="${reg.ticketId}">
            <div class="booking-item-left">
              <img src="${reg.event.image}" alt="${reg.event.title}" class="booking-thumb">
              <div>
                <div class="booking-title">${reg.event.title}</div>
                <div class="booking-meta">
                  <span class="booking-ref-id">${reg.ticketId}</span>
                  <span>${reg.event.date}</span>
                  <span>• ${reg.tier} (${reg.ticketCount}x)</span>
                </div>
              </div>
            </div>

            <div class="booking-actions">
              <button type="button" class="btn btn-secondary btn-sm btn-view-ticket" data-reg-index="${index}">View Pass</button>
              <button type="button" class="btn btn-outline btn-sm btn-cancel-booking" data-ticket-id="${reg.ticketId}" title="Cancel Registration" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.3);">
                Cancel
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // View specific pass
    container.querySelectorAll('.btn-view-ticket').forEach(btn => {
      btn.addEventListener('click', () => {
        const regIndex = parseInt(btn.dataset.regIndex, 10);
        const reg = state.registrations[regIndex];
        if (reg) {
          closeModal(myBookingsModal);
          openRegistrationModal(reg.event.id);
          renderConfirmationTicket(reg);
        }
      });
    });

    // Cancel registration
    container.querySelectorAll('.btn-cancel-booking').forEach(btn => {
      btn.addEventListener('click', () => {
        const tId = btn.dataset.ticketId;
        cancelBooking(tId);
      });
    });

    // Export JSON
    document.getElementById('btn-export-bookings')?.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.registrations, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "eventpulse_my_registrations.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Export Complete', 'Your bookings have been exported to JSON.', 'info');
    });
  }

  function cancelBooking(ticketId) {
    const booking = state.registrations.find(r => r.ticketId === ticketId);
    if (!booking) return;

    if (confirm(`Are you sure you want to cancel your registration for "${booking.event.title}" (Ticket: ${ticketId})?`)) {
      state.registrations = state.registrations.filter(r => r.ticketId !== ticketId);
      localStorage.setItem('eventpulse_registrations', JSON.stringify(state.registrations));

      // Free seat
      const matchedEv = state.events.find(e => e.id === booking.event.id);
      if (matchedEv) {
        matchedEv.registeredSeats = Math.max(0, matchedEv.registeredSeats - booking.ticketCount);
      }

      updateBookingsBadge();
      renderBookingsList();
      renderEventsGrid();
      renderFeaturedSpotlight();
      showToast('Booking Cancelled', `Registration for ticket ${ticketId} has been cancelled.`, 'info');
    }
  }

  /* ==========================================================================
     13. Modal Utilities & Keyboard Accessibility
     ========================================================================== */
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close handlers on [data-modal-close] and backdrop
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // ESC key closes any open modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  /* ==========================================================================
     14. Toast Notification System
     ========================================================================== */
  function showToast(title, description, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `
        <svg class="toast-icon success" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      `;
    } else if (type === 'danger') {
      iconSvg = `
        <svg class="toast-icon danger" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      `;
    } else {
      iconSvg = `
        <svg class="toast-icon info" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${description}</div>
      </div>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Trigger enter animation
    setTimeout(() => toast.classList.add('show'), 10);

    const closeToast = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', closeToast);

    // Auto dismiss after 4 seconds
    setTimeout(closeToast, 4000);
  }

  // Newsletter submission feedback
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (emailInput && emailInput.value.includes('@')) {
      showToast('Subscribed!', 'You will now receive weekly event updates and VIP presales.', 'success');
      emailInput.value = '';
    } else {
      showToast('Invalid Email', 'Please enter a valid email address.', 'danger');
    }
  });

  /* ==========================================================================
     15. Initialize App
     ========================================================================== */
  renderCategoryPills();
  renderFeaturedSpotlight();
  applyFilters();
  updateBookingsBadge();
});