/* Inkfluence by Nate — interactions
   - shrinking fixed header on scroll
   - mobile nav toggle
   - scroll-reveal (IntersectionObserver)
   - hero parallax
   - animated stat counters
*/
(function () {
  'use strict';

  /* ---------- Shrinking header ---------- */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Hero parallax ---------- */
  var heroBg = document.querySelector('[data-parallax]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroBg && !reduceMotion) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + y * 0.35 + 'px)';
      }
    }, { passive: true });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.stat-num');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var dur = 1600, start = null;
    var plus = target >= 100 ? '+' : '';
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + (p === 1 ? plus : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- Admin login modal ---------- */
  var adminModal = document.getElementById('adminModal');
  if (adminModal) {
    var adminOpen = document.getElementById('adminOpen');
    var adminClose = document.getElementById('adminClose');
    var adminForm = document.getElementById('adminForm');
    var adminMessage = document.getElementById('adminMessage');
    var adminEmail = document.getElementById('adminEmail');

    function openAdmin() {
      adminModal.classList.add('open');
      adminModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { adminEmail && adminEmail.focus(); }, 60);
    }
    function closeAdmin() {
      adminModal.classList.remove('open');
      adminModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (adminMessage) { adminMessage.textContent = ''; adminMessage.className = 'admin-message'; }
    }

    adminOpen && adminOpen.addEventListener('click', openAdmin);
    adminClose && adminClose.addEventListener('click', closeAdmin);
    adminModal.querySelectorAll('[data-admin-close]').forEach(function (el) {
      el.addEventListener('click', closeAdmin);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && adminModal.classList.contains('open')) closeAdmin();
    });

    adminForm && adminForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // ----------------------------------------------------------------------
      // SECURE LOGIN GOES HERE.
      // A static site cannot authenticate securely on its own — never put a
      // real password in this file. Wire this up to an invite-only auth
      // provider (e.g. Netlify Identity + Decap CMS) so only Nate can log in.
      // Until then, this is a non-functional placeholder.
      // ----------------------------------------------------------------------
      if (adminMessage) {
        adminMessage.textContent = 'Admin login isn’t connected yet. Hook this up to a secure auth provider to enable editing.';
        adminMessage.className = 'admin-message info show';
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
