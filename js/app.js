/**
 * js/app.js
 * Core Application Bootstrap, Navigation, Interactive Skills Filter,
 * Presenter Mode HUD (7-Minute Presentation Timer & Speaker Notes), and Video Player Runtimes.
 * Author: Andrew Strachan Electronic Career Portfolio
 */

// Presenter State Contract Adherence (uses window.PresenterState if defined)
var PresenterState = (typeof window !== 'undefined' && window.PresenterState) ? window.PresenterState : {
  active: false,
  currentSection: 'hero',
  elapsedSeconds: 0,
  maxSeconds: 420, // Exactly 7 minutes (420 seconds) for presentation
  timerInterval: null,
  isPaused: true,
  notes: {
    hero: [
      'Welcome evaluators, recruiters, and employers to Andrew Strachan\'s Electronic Career Portfolio.',
      'Highlight candidate identity: NSF CyberCorps SFS Scholar | Clearable, M.S. Cybersecurity at UAB (GPA 3.75).',
      'Emphasize the binding federal service commitment to protect national security infrastructure.'
    ],
    resume: [
      'Demonstrate interactive technology features: filterable skills matrix and verified academic records.',
      'Point out graduate coursework at UAB (3.75 GPA), Montevallo PCTF (3.75 GPA), and MC ACS Biochemistry Honors (3.5 GPA).',
      'Review measurable STAR accomplishments: 2025 JEFCOED Technology Torchbearer Award, State DECA coaching trophies, and cGMP compliance.'
    ],
    career: [
      'Review official BLS SOC 15-1212.00 economic data: $120,360 median wage, $182,370+ top decile, 32% growth rate.',
      'Explain Federal General Schedule progression from GS-9 to GS-14 with CyberCorps SFS Direct Hire Authority.',
      'Discuss technical mitigations for 3 industry obstacles: Post-Quantum cryptography, agentic AI defense, and critical infrastructure.'
    ],
    education: [
      'Present graduate cybersecurity coursework (CS 623 Network Security, CS 646 Blockchain, CS 636 STRIDE Threat Modeling, CS 532 Cloud Computing).',
      'Articulate explicit impact on future career for every educational program.',
      'Connect laboratory biochemistry discipline and medical training to zero-trust compliance standards.'
    ],
    enhancement: [
      'Showcase the 51-position federal opportunity tracker (accurateinternshiptracker.xlsx).',
      'Highlight 14 agency applications submitted at the CyberCorps SFS Virtual Job Fair.',
      'Detail global humanitarian service (Uganda mobile clinics, Nepal Gilman Scholarship) and youth STEM drone mentoring.'
    ],
    development: [
      'Professional Development (2023–2025): conferences (ALACTE, DECA Anaheim, KY Derby, Jump$tart) and ProctorU session audits.',
      '51-position federal tracker (accurateinternshiptracker.xlsx) with 14 SFS job fair applications.',
      'Community leadership: GiveGab volunteering, UMMC Opioid Crisis Council, and Frontier AI Initiative (nonartificialsi.com).'
    ],
    skills: [
      'Correlate top 5 specialized skills to the federal cybersecurity defense mission.',
      'Demonstrate official Credly-verified Microsoft Certified Educator (MCE) digital badge issued May 16, 2025.',
      'Reference directory of 30 verified HTTP 200 LinkedIn Learning certificates in Agentic AI and Cloud Security.'
    ],
    projects: [
      'Walk through 4 flagship highlight systems with web-optimized 10s 720p video previews.',
      'Highlight CS646 Sanctum 3D World (Godot WebGL on CloudFront) and MaqkrsTutor2 (SwiftUI on-device AI).',
      'Direct evaluators to inspect the directory of 28+ verified live cloud-hosted applications.'
    ],
    sources: [
      'Review the comprehensive provenance ledger connecting all claims to verifiable source files and HTTPS URLs.',
      'Review the technical credentials and authoritative provenance citations.',
      'Cite authoritative federal sources: BLS OOH, NIST SP 800-53, NSF CyberCorps SFS, and Credly.'
    ]
  }
};

class PortfolioApp {
  constructor() {
    this.sections = ['hero', 'resume', 'career', 'education', 'development', 'skills', 'projects', 'sources'];
    this.currentSectionIndex = 0;
    this.init();
  }

  init() {
    if (typeof document === 'undefined') return; // Headless guard

    document.addEventListener('DOMContentLoaded', () => {
      this.initNavigation();
      this.initSkillsFilter();
      this.initPresenterDrawer();
      this.initTimer();
      this.initVideoPreviews();
      this.initKeyboardNavigation();
      this.initSectionObserver();
      this.initScrollAnimations();
      this.initImageLightbox();
    });
  }

  // ==========================================================================
  // Navigation & Smooth Scrolling
  // ==========================================================================
  initNavigation() {
    const navToggle = document.getElementById('nav-toggle-btn');
    const siteNav = document.getElementById('site-nav');

    if (navToggle && siteNav) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        siteNav.classList.toggle('open');
      });
    }

    // Close mobile nav when clicking any nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (siteNav && siteNav.classList.contains('open')) {
          siteNav.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ==========================================================================
  // Interactive Skills Matrix Filtering
  // ==========================================================================
  initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-chip');
    const skillItems = document.querySelectorAll('.skill-item-pill');
    const announcer = document.getElementById('sr-announcer');

    if (!filterButtons.length || !skillItems.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter') || 'all';
        let visibleCount = 0;

        skillItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });

        if (announcer) {
          announcer.textContent = `Filtered skills by ${filter}: showing ${visibleCount} competencies.`;
        }
      });
    });
  }

  // ==========================================================================
  // Presenter Mode HUD & Drawer
  // ==========================================================================
  initPresenterDrawer() {
    const presenterBtn = document.getElementById('btn-presenter-mode');
    const closeBtn = document.getElementById('btn-close-presenter');
    const drawer = document.getElementById('presenter-drawer');

    if (presenterBtn && drawer) {
      presenterBtn.addEventListener('click', () => {
        this.togglePresenterDrawer(true);
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        this.togglePresenterDrawer(false);
      });
    }
  }

  togglePresenterDrawer(open) {
    const drawer = document.getElementById('presenter-drawer');
    const presenterBtn = document.getElementById('btn-presenter-mode');
    if (!drawer) return;

    PresenterState.active = open;
    if (open) {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      if (presenterBtn) presenterBtn.setAttribute('aria-expanded', 'true');
      this.updateSpeakerNotes(PresenterState.currentSection);
    } else {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      if (presenterBtn) presenterBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // ==========================================================================
  // 7-Minute Presentation Countdown Timer
  // ==========================================================================
  initTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('timer-start-btn');
    const pauseBtn = document.getElementById('timer-pause-btn');
    const resetBtn = document.getElementById('timer-reset-btn');
    const warningLabel = document.getElementById('timer-warning-label');

    if (!timerDisplay) return;

    this.renderTimerDisplay();

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startTimer());
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.pauseTimer());
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetTimer());
    }
  }

  startTimer() {
    if (!PresenterState.isPaused) return;
    PresenterState.isPaused = false;

    if (PresenterState.timerInterval) clearInterval(PresenterState.timerInterval);

    PresenterState.timerInterval = setInterval(() => {
      if (PresenterState.elapsedSeconds < PresenterState.maxSeconds) {
        PresenterState.elapsedSeconds++;
        this.renderTimerDisplay();
      } else {
        this.pauseTimer();
      }
    }, 1000);
  }

  pauseTimer() {
    PresenterState.isPaused = true;
    if (PresenterState.timerInterval) {
      clearInterval(PresenterState.timerInterval);
      PresenterState.timerInterval = null;
    }
  }

  resetTimer() {
    this.pauseTimer();
    PresenterState.elapsedSeconds = 0;
    this.renderTimerDisplay();
  }

  renderTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    const warningLabel = document.getElementById('timer-warning-label');
    if (!timerDisplay) return;

    const remaining = Math.max(0, PresenterState.maxSeconds - PresenterState.elapsedSeconds);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    timerDisplay.textContent = formatted;

    // Visual warning state when countdown reaches <= 60 seconds (1 minute remaining)
    if (remaining <= 60 && remaining > 0) {
      timerDisplay.classList.add('timer-warning');
      if (warningLabel) warningLabel.style.display = 'block';
    } else {
      timerDisplay.classList.remove('timer-warning');
      if (warningLabel) warningLabel.style.display = 'none';
    }
  }

  updateSpeakerNotes(sectionId) {
    PresenterState.currentSection = sectionId;
    const indicator = document.getElementById('presenter-current-section');
    const notesList = document.getElementById('speaker-notes-list');

    if (indicator) {
      indicator.textContent = `Current Section: ${sectionId.toUpperCase()}`;
    }

    if (notesList) {
      const rawNotes = (PresenterState.notes && (PresenterState.notes[sectionId] || PresenterState.notes.hero)) || [];
      const notes = Array.isArray(rawNotes) ? rawNotes : [rawNotes];
      notesList.innerHTML = notes.map(n => `<li>${n}</li>`).join('');
    }
  }

  // ==========================================================================
  // Keyboard Navigation Handling (ArrowLeft / ArrowRight / Space / 1-7)
  // ==========================================================================
  initKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      // Ignore if user is inside an input field
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      // Space key: Toggle timer play/pause
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (PresenterState.isPaused) {
          this.startTimer();
        } else {
          this.pauseTimer();
        }
      }

      // ArrowRight: Advance to next section
      if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.navigateSection(1);
      }

      // ArrowLeft: Return to previous section
      if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
        e.preventDefault();
        this.navigateSection(-1);
      }

      // Escape key: Close drawer / modal
      if (e.code === 'Escape' || e.key === 'Escape') {
        this.togglePresenterDrawer(false);
        const modal = document.getElementById('video-modal');
        if (modal && typeof modal.close === 'function') modal.close();
      }

      // Digits 1-8: Direct jump to portfolio sections
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= this.sections.length) {
        e.preventDefault();
        this.jumpToSectionIndex(num - 1);
      }
    });
  }

  navigateSection(delta) {
    let nextIndex = this.currentSectionIndex + delta;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= this.sections.length) nextIndex = this.sections.length - 1;
    this.jumpToSectionIndex(nextIndex);
  }

  jumpToSectionIndex(index) {
    this.currentSectionIndex = index;
    const targetId = this.sections[index];
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      this.updateSpeakerNotes(targetId);
    }
  }

  // ==========================================================================
  // Intersection Observer for Active Section Tracking
  // ==========================================================================
  initSectionObserver() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const observerOptions = {
      root: null,
      rootMargin: isMobile ? '-10% 0px -40% 0px' : '-20% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const idx = this.sections.indexOf(id);
          if (idx !== -1) {
            this.currentSectionIndex = idx;
            this.updateSpeakerNotes(id);

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        }
      });
    }, observerOptions);

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // ==========================================================================
  // Video Previews Autoplay / Interaction
  // ==========================================================================
  initVideoPreviews() {
    const videos = document.querySelectorAll('video.preview-video-element');
    videos.forEach(video => {
      // Attempt low-impact silent inline autoplay on intersection
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Browser autoplay policy catch - silent fallback
            });
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });

      videoObserver.observe(video);
    });
  }

  // ==========================================================================
  // Mobile & Desktop Scroll Animations
  // ==========================================================================
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .glass-card, .pd-card, .timeline-item, .section-header, .section-intro, .gs-step-card'
    );

    if (!animatedElements.length) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Add base class if not already added
    animatedElements.forEach(el => {
      if (!el.classList.contains('animate-on-scroll')) {
        el.classList.add('animate-on-scroll');
      }
    });

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      animatedElements.forEach(el => el.classList.add('is-visible', 'animated'));
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const observerOptions = {
      root: null,
      rootMargin: isMobile ? '0px 0px -15px 0px' : '0px 0px -50px 0px',
      threshold: isMobile ? 0.05 : 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      // Reveal immediately if already in viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0) {
        el.classList.add('is-visible', 'animated');
      } else {
        scrollObserver.observe(el);
      }
    });

    // Mobile scroll / touch fallback to guarantee animation triggers on mobile Safari / Chrome
    const checkVisibilityFallback = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      animatedElements.forEach(el => {
        if (!el.classList.contains('is-visible')) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh - 10 && rect.bottom >= 0) {
            el.classList.add('is-visible', 'animated');
            scrollObserver.unobserve(el);
          }
        }
      });
    };

    window.addEventListener('scroll', checkVisibilityFallback, { passive: true });
    window.addEventListener('touchmove', checkVisibilityFallback, { passive: true });
    window.addEventListener('resize', checkVisibilityFallback, { passive: true });
  }

  // ==========================================================================
  // Image Lightbox / Modal Preview
  // ==========================================================================
  initImageLightbox() {
    const clickableImages = document.querySelectorAll('.pd-card-img, .pd-proctor-thumb, .pd-preview-img');
    const modal = document.getElementById('video-modal');
    const modalTitle = document.getElementById('modal-video-title');
    const modalBody = document.querySelector('.modal-video-wrapper');

    if (!clickableImages.length || !modal) return;

    clickableImages.forEach(img => {
      img.addEventListener('click', () => {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || 'Asset Preview';

        if (modalTitle) modalTitle.textContent = alt;

        // Temporarily display image inside modal body
        if (modalBody) {
          const videoEl = document.getElementById('modal-video-element');
          if (videoEl) videoEl.style.display = 'none';

          let lightboxImg = document.getElementById('lightbox-img-element');
          if (!lightboxImg) {
            lightboxImg = document.createElement('img');
            lightboxImg.id = 'lightbox-img-element';
            lightboxImg.style.maxWidth = '100%';
            lightboxImg.style.maxHeight = '80vh';
            lightboxImg.style.objectFit = 'contain';
            lightboxImg.style.borderRadius = '8px';
            modalBody.appendChild(lightboxImg);
          }
          lightboxImg.src = src;
          lightboxImg.alt = alt;
          lightboxImg.style.display = 'block';
        }

        if (typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          modal.setAttribute('open', 'true');
        }
      });
    });

    // Reset modal on close
    const closeBtn = document.getElementById('btn-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const videoEl = document.getElementById('modal-video-element');
        const lightboxImg = document.getElementById('lightbox-img-element');
        if (videoEl) videoEl.style.display = 'block';
        if (lightboxImg) lightboxImg.style.display = 'none';
      });
    }
  }
}

// Instantiate client app
const app = new PortfolioApp();

// Export for Node.js test environment and verification
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PortfolioApp,
    PresenterState,
    app
  };
}
