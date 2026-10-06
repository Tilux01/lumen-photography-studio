document.addEventListener('DOMContentLoaded', function () {

  var grades = ['grade-blue', 'grade-purple', 'grade-red'];
  var heroImg = document.getElementById('heroImg');
  var swatches = Array.prototype.slice.call(document.querySelectorAll('.swatch'));

  function setGrade(grade) {
    heroImg.classList.remove('grade-blue', 'grade-purple', 'grade-red');
    heroImg.classList.add(grade);
    swatches.forEach(function (s) {
      var on = s.getAttribute('data-grade') === grade;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  swatches.forEach(function (s) {
    s.addEventListener('click', function () { setGrade(s.getAttribute('data-grade')); });
  });

  function currentGradeIndex() {
    for (var i = 0; i < grades.length; i++) {
      if (heroImg.classList.contains(grades[i])) return i;
    }
    return 0;
  }
  document.getElementById('prevGrade').addEventListener('click', function () {
    var i = (currentGradeIndex() - 1 + grades.length) % grades.length;
    setGrade(grades[i]);
  });
  document.getElementById('nextGrade').addEventListener('click', function () {
    var i = (currentGradeIndex() + 1) % grades.length;
    setGrade(grades[i]);
  });

  var hotspots = Array.prototype.slice.call(document.querySelectorAll('.hotspot'));
  hotspots.forEach(function (h) {
    h.addEventListener('click', function () {
      var tip = document.getElementById(h.getAttribute('data-tip'));
      var open = tip.classList.contains('is-open');
      document.querySelectorAll('.tip').forEach(function (t) { t.classList.remove('is-open'); });
      if (!open) tip.classList.add('is-open');
    });
  });

  var accountBtn = document.getElementById('accountBtn');
  var accountPop = document.getElementById('accountPop');
  accountBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = accountPop.classList.toggle('is-open');
    accountBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function () {
    accountPop.classList.remove('is-open');
    accountBtn.setAttribute('aria-expanded', 'false');
  });
  accountPop.addEventListener('click', function (e) { e.stopPropagation(); });

  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  var filterBar = document.getElementById('filterBar');
  var emptyNote = document.getElementById('emptyNote');

  filterBar.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    var f = chip.getAttribute('data-filter');
    filterBar.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
    applyFilter(f);
  });

  function applyFilter(f) {
    var visible = 0;
    tiles.forEach(function (t) {
      var show = (f === 'all' || t.getAttribute('data-category') === f);
      t.classList.toggle('hide', !show);
      if (show) visible++;
    });
    emptyNote.hidden = visible !== 0;
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxArt = document.getElementById('lightboxArt');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxMeta = document.getElementById('lightboxMeta');
  var lightboxDesc = document.getElementById('lightboxDesc');
  var activeTile = null;

  function gradientClassOf(tile) {
    var match = tile.className.match(/\bg[0-9]+\b/);
    return match ? match[0] : '';
  }

  function openLightbox(tile) {
    activeTile = tile;
    lightboxArt.className = 'lightbox-art ' + gradientClassOf(tile);
    lightboxTitle.textContent = tile.getAttribute('data-title');
    lightboxMeta.innerHTML = tile.getAttribute('data-meta');
    lightboxDesc.textContent = tile.getAttribute('data-desc');
    openOverlay(lightbox);
  }

  tiles.forEach(function (t) {
    t.addEventListener('click', function () { openLightbox(t); });
  });

  var bookingModal = document.getElementById('bookingModal');
  var bookingForm = document.getElementById('bookingForm');
  var bookingSuccess = document.getElementById('bookingSuccess');
  var bSubject = document.getElementById('bSubject');

  document.getElementById('bookBtn').addEventListener('click', function () {
    bookingForm.reset();
    bookingSuccess.hidden = true;
    clearErrors(bookingForm);
    openOverlay(bookingModal);
  });

  document.getElementById('bookLook').addEventListener('click', function () {
    if (activeTile) bSubject.value = activeTile.getAttribute('data-title') + ' session';
    closeOverlay(lightbox);
    bookingSuccess.hidden = true;
    clearErrors(bookingForm);
    openOverlay(bookingModal);
  });

  var searchOverlay = document.getElementById('searchOverlay');
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');

  document.getElementById('searchBtn').addEventListener('click', function () {
    openOverlay(searchOverlay);
    searchInput.value = '';
    renderSearch('');
    setTimeout(function () { searchInput.focus(); }, 60);
  });

  searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });

  function renderSearch(q) {
    var query = q.trim().toLowerCase();
    var matches = tiles.filter(function (t) {
      if (!query) return true;
      var hay = (t.getAttribute('data-title') + ' ' + t.getAttribute('data-category') + ' ' + t.getAttribute('data-meta')).toLowerCase();
      return hay.indexOf(query) !== -1;
    });
    searchResults.innerHTML = '';
    if (!matches.length) {
      var e = document.createElement('p');
      e.className = 'search-empty';
      e.textContent = 'Nothing matches that. Try "portrait" or "wedding".';
      searchResults.appendChild(e);
      return;
    }
    matches.slice(0, 8).forEach(function (t) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-item';
      btn.innerHTML = '<span>' + t.getAttribute('data-title') + '</span><em>' + t.getAttribute('data-category') + '</em>';
      btn.addEventListener('click', function () {
        closeOverlay(searchOverlay);
        openLightbox(t);
      });
      searchResults.appendChild(btn);
    });
  }

  var accItems = Array.prototype.slice.call(document.querySelectorAll('.acc-item'));
  accItems.forEach(function (item) {
    var trigger = item.querySelector('.acc-trigger');
    var panel = item.querySelector('.acc-panel');
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      accItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
        other.querySelector('.acc-panel').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors(contactForm);
    formSuccess.hidden = true;
    var fields = ['cName', 'cEmail', 'cType', 'cMsg'];
    var ok = true;
    fields.forEach(function (id) {
      var el = document.getElementById(id);
      if (!isValid(el)) { markInvalid(el); ok = false; }
    });
    if (!ok) return;
    contactForm.reset();
    formSuccess.hidden = false;
  });

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors(bookingForm);
    bookingSuccess.hidden = true;
    var fields = ['bName', 'bPhone', 'bSubject'];
    var ok = true;
    fields.forEach(function (id) {
      var el = document.getElementById(id);
      if (!isValid(el)) { markInvalid(el); ok = false; }
    });
    if (!ok) return;
    bookingForm.reset();
    bookingSuccess.hidden = false;
  });

  function isValid(el) {
    var v = (el.value || '').trim();
    if (!v) return false;
    if (el.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    return true;
  }

  function markInvalid(el) {
    el.classList.add('invalid');
    var err = document.querySelector('[data-err="' + el.id + '"]');
    if (err) err.textContent = el.type === 'email' ? 'Enter a valid email address' : 'This field is required';
  }

  function clearErrors(form) {
    form.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });
    form.querySelectorAll('.err').forEach(function (el) { el.textContent = ''; });
  }

  document.querySelectorAll('input,select,textarea').forEach(function (el) {
    el.addEventListener('input', function () {
      el.classList.remove('invalid');
      var err = document.querySelector('[data-err="' + el.id + '"]');
      if (err) err.textContent = '';
    });
  });

  function openOverlay(el) {
    el.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeOverlay(el) {
    el.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.overlay').forEach(function (ov) {
    ov.addEventListener('click', function (e) {
      if (e.target === ov) closeOverlay(ov);
    });
    ov.querySelectorAll('[data-close]').forEach(function (b) {
      b.addEventListener('click', function () { closeOverlay(ov); });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.overlay').forEach(function (ov) {
      if (!ov.hidden) closeOverlay(ov);
    });
    accountPop.classList.remove('is-open');
  });

  document.getElementById('scrollTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        var el = entry.target;
        setTimeout(function () { el.classList.add('is-visible'); }, i * 70);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

});

(function () {
  var root = document.documentElement;
  var frame = null;

  function syncType() {
    var w = window.innerWidth || root.clientWidth;
    var h = window.innerHeight || root.clientHeight;
    var span = w / h;
    var t = Math.min(1, Math.max(0, (w - 360) / 1560));
    var wide = Math.min(1, Math.max(0, (span - 1.1) / 1.1));
    var mix = Math.min(1, Math.max(0, t * 0.75 + wide * 0.25));

    root.style.setProperty('--wght-display', Math.round(700 + mix * 100));
    root.style.setProperty('--wght-head', Math.round(650 + mix * 60));
    root.style.setProperty('--wght-sub', Math.round(600 + mix * 40));
    root.style.setProperty('--wght-strong', Math.round(700 + mix * 80));
  }

  function onResize() {
    if (frame) { cancelAnimationFrame(frame); }
    frame = requestAnimationFrame(syncType);
  }

  syncType();
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onResize, { passive: true });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncType);
  }
})();
