
(function () {
  'use strict';

  // ========================================
  // 1. DOM ELEMENTS
  // ========================================

  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeColorMeta = document.getElementById('theme-color');
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const progressBar = document.getElementById('scroll-progress-bar');
  const yearLabel = document.getElementById('current-year');

  // ========================================
  // 2. THEME MANAGEMENT
  // ========================================

  if (!root.dataset.theme) {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    root.dataset.theme = prefersDark ? 'dark' : 'light';
  }

  updateThemeUI(root.dataset.theme);

  function updateThemeUI(theme) {
    const isDark = theme === 'dark';

    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );

      themeToggle.setAttribute(
        'title',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content',
        isDark ? '#141713' : '#f5f4ef'
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next =
        root.dataset.theme === 'dark' ? 'light' : 'dark';

      root.dataset.theme = next;
      updateThemeUI(next);

      try {
        localStorage.setItem('nk-portfolio-theme', next);
      } catch (_) {
        // Theme still works without localStorage.
      }
    });
  }

  // ========================================
  // 3. MOBILE NAVIGATION
  // ========================================

  function closeMenu() {
    if (!siteNav || !menuToggle) return;

    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('is-open');

      menuToggle.setAttribute('aria-expanded', String(isOpen));

      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation' : 'Open navigation'
      );
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    document.addEventListener('click', function (event) {
      if (
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // ========================================
  // 4. SCROLL PROGRESS
  // ========================================

  function updateScrollProgress() {
    if (!progressBar) return;

    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;

    const progress =
      maxScroll > 0
        ? (window.scrollY / maxScroll) * 100
        : 0;

    progressBar.style.width =
      Math.min(100, Math.max(0, progress)) + '%';
  }

  window.addEventListener(
    'scroll',
    updateScrollProgress,
    { passive: true }
  );

  window.addEventListener('resize', updateScrollProgress);

  updateScrollProgress();

  // ========================================
  // 5. DYNAMIC COPYRIGHT YEAR
  // ========================================

  if (yearLabel) {
    yearLabel.textContent = String(new Date().getFullYear());
  }

  // ========================================
  // 6. REDUCED MOTION
  // ========================================

  const reducedMotion =
    window.matchMedia &&
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  // ========================================
  // 7. REVEAL ANIMATIONS
  // ========================================

  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -32px 0px'
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  // ========================================
  // 8. BACK TO TOP
  // ========================================

  document.querySelectorAll('a[href="#top"]').forEach(
    function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? 'auto' : 'smooth'
        });

        closeMenu();

        if (history.replaceState) {
          history.replaceState(
            null,
            '',
            window.location.pathname +
            window.location.search
          );
        }
      });
    }
  );

  // ========================================
  // 9. SCROLL-SPY NAVIGATION
  // ========================================

  const navLinks = Array.prototype.slice.call(
    document.querySelectorAll(
      '.site-nav > a[href^="#"]:not(.nav-contact)'
    )
  );

  if ('IntersectionObserver' in window && navLinks.length) {
    const sections = navLinks
      .map(function (link) {
        return document.querySelector(
          link.getAttribute('href')
        );
      })
      .filter(Boolean);

    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          navLinks.forEach(function (link) {
            const active =
              link.getAttribute('href') ===
              '#' + entry.target.id;

            link.classList.toggle('is-active', active);

            if (active) {
              link.setAttribute('aria-current', 'true');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  // ========================================
  // 10. ANALYTICS CONSENT MANAGEMENT
  // ========================================

  const consentBox = document.getElementById('consent');
  const acceptBtn = document.getElementById('consent-accept');
  const declineBtn = document.getElementById('consent-decline');
  const cookieSettings = document.getElementById('cookie-settings');

  let consentChoice = null;
  let previousFocus = null;

  try {
    const stored = localStorage.getItem('nk-consent');

    if (stored === 'granted' || stored === 'denied') {
      consentChoice = stored;
    }
  } catch (_) {
    // Consent remains unset if storage is unavailable.
  }

  function openConsent() {
    if (!consentBox) return;

    previousFocus = document.activeElement;
    consentBox.hidden = false;

    if (acceptBtn) {
      acceptBtn.focus();
    }
  }

  function closeConsent() {
    if (!consentBox) return;

    consentBox.hidden = true;

    if (
      previousFocus &&
      typeof previousFocus.focus === 'function'
    ) {
      previousFocus.focus();
    }

    previousFocus = null;
  }

  function setConsent(value) {
    if (value !== 'granted' && value !== 'denied') {
      return;
    }

    consentChoice = value;

    try {
      localStorage.setItem('nk-consent', value);
    } catch (_) {
      // Consent applies to this page view.
    }

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: value
      });
    }

    closeConsent();
  }

  if (consentBox && !consentChoice) {
    openConsent();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setConsent('granted');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      setConsent('denied');
    });
  }

  if (cookieSettings) {
    cookieSettings.addEventListener('click', openConsent);
  }

  // Keep focus inside the consent dialog while open.
  if (consentBox) {
    consentBox.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;

      const buttons = Array.prototype.slice.call(
        consentBox.querySelectorAll(
          'button:not([disabled])'
        )
      );

      if (!buttons.length) return;

      const first = buttons[0];
      const last = buttons[buttons.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  // ========================================
  // 11. GA4 CUSTOM EVENT TRACKING
  // ========================================

  function trackEvent(eventName, parameters) {
    // Respect the current consent choice.
    if (consentChoice !== 'granted') {
      return;
    }

    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', eventName, parameters || {});
  }

  // ========================================
  // 12. PORTFOLIO LINK TRACKING
  // ========================================

  document.querySelectorAll('a[href]').forEach(
    function (link) {
      link.addEventListener('click', function () {
        const href = link.getAttribute('href') || '';
        const normalizedHref = href.toLowerCase();

        // Resume click
        if (
          normalizedHref.endsWith('.pdf') ||
          normalizedHref.includes('.pdf?')
        ) {
          trackEvent('resume_click', {
            link_type: 'resume',
            file_name: 'Narendra_Koya_Frontend_Developer_Resume.pdf'
          });

          return;
        }

        // Contact email
        if (normalizedHref.startsWith('mailto:')) {
          trackEvent('contact_click', {
            contact_method: 'email'
          });

          return;
        }

        // GitHub links
        if (normalizedHref.includes('github.com/')) {
          const isProfile =
            normalizedHref.replace(/\/$/, '') ===
            'https://github.com/narendrakoya999';

          trackEvent(
            isProfile ? 'github_click' : 'repository_click',
            {
              link_url: href
            }
          );

          return;
        }

        // LinkedIn
        if (
          normalizedHref.includes(
            'linkedin.com/in/narendra-koya'
          )
        ) {
          trackEvent('linkedin_click', {
            link_type: 'linkedin'
          });

          return;
        }

        // Selected projects
        if (
          normalizedHref.includes('mryoda.com') ||
          normalizedHref.includes('testgo.com')
        ) {
          trackEvent('project_click', {
            project_url: href,
            project_name: normalizedHref.includes('mryoda.com')
              ? 'Mr Yoda'
              : 'TestGO'
          });
        }
      });
    }
  );

  // ========================================
  // END
  // ========================================

})();