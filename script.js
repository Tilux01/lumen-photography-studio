(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    var NAVBAR = document.getElementById('navbar');
    var HERO = document.querySelector('.hero');
    var HERO_WORD = document.getElementById('heroWord');
    var HERO_CONTENT = document.querySelector('.hero-content');
    var RAIL = document.getElementById('railTrack');
    var RAIL_SECTION = document.getElementById('work');
    var RAIL_LABEL = document.getElementById('railLabel');
    var RAIL_BAR = document.getElementById('railBarFill');
    var PARALLAX = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    var COUNTERS = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    var TILT = Array.prototype.slice.call(document.querySelectorAll('[data-tilt]')).filter(function (el) {
      return !RAIL || !RAIL.contains(el);
    });

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
      setGrade(grades[(currentGradeIndex() - 1 + grades.length) % grades.length]);
    });
    document.getElementById('nextGrade').addEventListener('click', function () {
      setGrade(grades[(currentGradeIndex() + 1) % grades.length]);
    });

    Array.prototype.slice.call(document.querySelectorAll('.hotspot')).forEach(function (h) {
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
      var visible = 0;
      tiles.forEach(function (t) {
        var show = (f === 'all' || t.getAttribute('data-category') === f);
        t.classList.toggle('hide', !show);
        if (show) visible++;
      });
      emptyNote.hidden = visible !== 0;
    });

    var lightbox = document.getElementById('lightbox');
    var lightboxArt = document.getElementById('lightboxArt');
    var lightboxTitle = document.getElementById('lightboxTitle');
    var lightboxMeta = document.getElementById('lightboxMeta');
    var lightboxDesc = document.getElementById('lightboxDesc');
    var activeTile = null;

    function openLightbox(tile) {
      activeTile = tile;
      var img = tile.querySelector('img');
      lightboxArt.innerHTML = '';
      if (img) {
        var clone = document.createElement('img');
        clone.src = img.currentSrc || img.src;
        clone.alt = img.alt || '';
        lightboxArt.appendChild(clone);
      }
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

    function openBooking(subject) {
      bookingForm.reset();
      bookingSuccess.hidden = true;
      clearErrors(bookingForm);
      if (subject) bSubject.value = subject;
      openOverlay(bookingModal);
    }

    document.getElementById('bookBtn').addEventListener('click', function () { openBooking(''); });

    Array.prototype.slice.call(document.querySelectorAll('.js-book')).forEach(function (b) {
      b.addEventListener('click', function () { openBooking(b.getAttribute('data-subject') || ''); });
    });

    document.getElementById('bookLook').addEventListener('click', function () {
      var subject = activeTile ? activeTile.getAttribute('data-title') + ' session' : '';
      closeOverlay(lightbox);
      openBooking(subject);
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
        e.textContent = 'Nothing matches that. Try portrait or wedding.';
        searchResults.appendChild(e);
        return;
      }
      matches.slice(0, 12).forEach(function (t) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'search-item';
        var span = document.createElement('span');
        span.textContent = t.getAttribute('data-title');
        var em = document.createElement('em');
        em.textContent = t.getAttribute('data-category');
        btn.appendChild(span);
        btn.appendChild(em);
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

    function wireForm(form, fields, success) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors(form);
        success.hidden = true;
        var ok = true;
        fields.forEach(function (id) {
          var el = document.getElementById(id);
          if (!isValid(el)) { markInvalid(el); ok = false; }
        });
        if (!ok) return;
        form.reset();
        success.hidden = false;
      });
    }

    wireForm(document.getElementById('contactForm'), ['cName', 'cEmail', 'cType', 'cMsg'], document.getElementById('formSuccess'));
    wireForm(bookingForm, ['bName', 'bPhone', 'bSubject'], bookingSuccess);
    wireForm(document.getElementById('newsletterForm'), ['nEmail'], document.getElementById('newsletterSuccess'));

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


    var revealTargets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        var batch = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = Math.min(batch * 70, 420);
          batch++;
          setTimeout(function () {
            el.classList.add('is-visible');
            setTimeout(function () {
              if (el.classList.contains('reveal')) {
                el.classList.remove('reveal');
                el.classList.add('revealed');
                el.style.willChange = 'auto';
              }
            }, 1150);
          }, delay);
          io.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      revealTargets.forEach(function (el) {
        el.classList.remove('reveal');
        el.classList.add('revealed');
      });
    }

    var statsEl = document.getElementById('stats');
    var counted = false;
    function runCounters() {
      if (counted) return;
      counted = true;
      COUNTERS.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var start = null;
        var dur = 1500;
        function tick(ts) {
          if (start === null) start = ts;
          var t = Math.min(1, (ts - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }
    if (statsEl && 'IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { runCounters(); so.disconnect(); }
        });
      }, { threshold: 0.35 });
      so.observe(statsEl);
    } else {
      COUNTERS.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
    }

    if (fine && !reduce) {
      TILT.forEach(function (el) {
        var max = parseFloat(el.getAttribute('data-tilt-max')) || 8;
        var raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
        function apply() {
          raf = null;
          cx += (tx - cx) * 0.16;
          cy += (ty - cy) * 0.16;
          el.style.transform = 'perspective(1100px) rotateX(' + cx.toFixed(2) + 'deg) rotateY(' + cy.toFixed(2) + 'deg) translateZ(14px)';
          if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) raf = requestAnimationFrame(apply);
        }
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          ty = px * max * 2;
          tx = -py * max * 2;
          if (!raf) raf = requestAnimationFrame(apply);
        });
        el.addEventListener('pointerleave', function () {
          tx = 0; ty = 0;
          if (!raf) raf = requestAnimationFrame(apply);
        });
      });
    }

    var ring = document.getElementById('carouselRing');
    var dotsWrap = document.getElementById('quoteDots');
    var quoteCards = ring ? Array.prototype.slice.call(ring.querySelectorAll('.quote-card')) : [];
    var quoteIndex = 0;

    var ringRadius = 360;

    function layoutRing() {
      if (!ring || !quoteCards.length) return;
      var n = quoteCards.length;
      var step = 360 / n;
      var w = quoteCards[0].offsetWidth || ring.offsetWidth || 380;
      ringRadius = Math.max(250, w * 0.95);
      quoteCards.forEach(function (c, i) {
        c.style.transform = 'rotateY(' + (i * step) + 'deg) translateZ(' + ringRadius + 'px)';
      });
      syncRing();
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      quoteCards.forEach(function (c, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'dot-btn' + (i === quoteIndex ? ' is-active' : '');
        b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
        b.addEventListener('click', function () { quoteIndex = i; syncRing(); });
        dotsWrap.appendChild(b);
      });
    }

    function syncRing() {
      if (!ring) return;
      var n = quoteCards.length;
      var step = 360 / n;
      ring.style.transform = 'translateZ(-' + (ringRadius * 0.55).toFixed(2) + 'px) rotateY(' + (-quoteIndex * step) + 'deg)';
      Array.prototype.slice.call(dotsWrap.children).forEach(function (d, i) {
        d.classList.toggle('is-active', i === quoteIndex);
      });
    }

    if (ring && quoteCards.length) {
      buildDots();
      layoutRing();
      document.getElementById('quotePrev').addEventListener('click', function () {
        quoteIndex = (quoteIndex - 1 + quoteCards.length) % quoteCards.length;
        syncRing();
      });
      document.getElementById('quoteNext').addEventListener('click', function () {
        quoteIndex = (quoteIndex + 1) % quoteCards.length;
        syncRing();
      });
      window.addEventListener('resize', function () { layoutRing(); }, { passive: true });
    }

    var railMetrics = null;
    var railCardMetrics = [];

    function measure() {
      if (RAIL && RAIL_SECTION) {
        var trackW = RAIL.scrollWidth;
        var vw = window.innerWidth;
        var pad = parseFloat(getComputedStyle(RAIL).paddingLeft) || 0;
        railMetrics = {
          sectionTop: RAIL_SECTION.offsetTop,
          travel: Math.max(0, trackW - vw),
          vw: vw,
          pad: pad,
          n: RAIL.children.length
        };
        railCardMetrics = Array.prototype.slice.call(RAIL.children).map(function (c) {
          return c;
        });
      }
    }

    function setParallax(y) {
      var vh = window.innerHeight;
      PARALLAX.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        var offset = (r.top + r.height / 2) - vh / 2;
        var base = el.classList.contains('about-badge') ? 'translateX(-50%) ' : '';
        el.style.transform = base + 'translate3d(0,' + (-offset * speed).toFixed(2) + 'px,0)';
      });
    }

    function setHero(y) {
      if (!HERO) return;
      var h = HERO.offsetHeight || 1;
      var p = Math.min(1, Math.max(0, y / h));
      if (HERO_WORD) {
        HERO_WORD.style.transform = 'translate3d(0,' + (p * 90).toFixed(1) + 'px,0) scale(' + (1 + p * 0.16).toFixed(3) + ')';
        HERO_WORD.style.opacity = (1 - p * 1.15).toFixed(3);
      }
      if (HERO_CONTENT) {
        HERO_CONTENT.style.transform = 'translate3d(0,' + (p * 80).toFixed(1) + 'px,0) rotateX(' + (p * 8).toFixed(2) + 'deg)';
        HERO_CONTENT.style.opacity = (1 - p * 0.95).toFixed(3);
      }
    }

    function setRail(y) {
      if (!railMetrics || !RAIL) return;
      var vh = window.innerHeight;
      var p = (y - railMetrics.sectionTop) / Math.max(1, (RAIL_SECTION.offsetHeight - vh));
      p = Math.min(1, Math.max(0, p));
      var x = -p * railMetrics.travel;
      RAIL.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      if (RAIL_BAR) RAIL_BAR.style.width = (p * 100).toFixed(2) + '%';
      if (RAIL_LABEL) {
        var idx = Math.min(railMetrics.n, Math.round(p * (railMetrics.n - 1)) + 1);
        RAIL_LABEL.textContent = String(idx).padStart(2, '0') + ' / ' + String(railMetrics.n).padStart(2, '0');
      }
      var center = railMetrics.vw / 2;
      railCardMetrics.forEach(function (c) {
        var cr = c.getBoundingClientRect();
        var cc = cr.left + cr.width / 2;
        var d = (cc - center) / center;
        var rot = Math.max(-1, Math.min(1, d)) * -16;
        var z = -Math.abs(Math.max(-1, Math.min(1, d))) * 90;
        c.style.transform = 'rotateY(' + rot.toFixed(2) + 'deg) translateZ(' + z.toFixed(1) + 'px)';
      });
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY || window.pageYOffset;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (NAVBAR) NAVBAR.classList.toggle('is-stuck', y > 24);
        if (!reduce) {
          setHero(y);
          setParallax(y);
          setRail(y);
        }
      });
    }

    function remeasure() {
      if (NAVBAR) document.documentElement.style.setProperty('--nav-h', NAVBAR.offsetHeight + 'px');
      measure();
      layoutRing();
      onScroll();
    }

    remeasure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure, { passive: true });
    window.addEventListener('load', remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
    setTimeout(remeasure, 600);
  });

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
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(syncType);
  }

  syncType();
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncType);
})();
