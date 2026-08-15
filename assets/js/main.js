/* ============================================================
   洪观林 · AI 视觉设计师 — 个人网站脚本
   原生 JS，零依赖
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 1. 导航滚动状态 + 返回顶部 ---------- */
  var nav = $('#nav');
  var backTop = $('#backTop');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (backTop) backTop.classList.toggle('show', y > 600);
    updateNavActive();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 2. 移动端汉堡菜单 ---------- */
  var burger = $('#navBurger');
  var navLinks = $('#navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
    });
    $$('a', navLinks).forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  /* ---------- 3. 滚动渐显 ---------- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- 4. Hero 视差 ---------- */
  var heroBg = $('#heroBg');
  var heroParallax = false;
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroParallax = true;
  }
  function onParallax() {
    if (!heroParallax || !heroBg) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    if (y < window.innerHeight * 1.2) {
      heroBg.style.transform = 'translate3d(0,' + (y * 0.35) + 'px,0)';
    }
  }
  window.addEventListener('scroll', onParallax, { passive: true });

  /* ---------- 5. 导航活动项高亮（scrollspy） ---------- */
  var sections = $$('section[id]');
  var navAnchors = $$('.nav-links a[href^="#"]');
  function updateNavActive() {
    if (window.innerWidth <= 760) return; // 移动端菜单收起时不判
    var pos = window.scrollY + 120;
    var currentId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) currentId = sec.id;
    });
    if (!currentId && window.scrollY < 60) currentId = 'home';
    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  /* ---------- 6. 作品集 Tab 切换 ---------- */
  var tabs = $$('.tab');
  var cards = $$('.work-card');
  function filterWorks(cat) {
    cards.forEach(function (card) {
      var match = cat === 'all' || card.getAttribute('data-cat') === cat;
      card.classList.toggle('hide', !match);
      if (match && !card.classList.contains('in-view')) {
        card.classList.add('in-view');
      }
    });
  }
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      filterWorks(tab.getAttribute('data-cat'));
    });
  });

  /* ---------- 7. Before / After 滑动条（可拖拽） ---------- */
  function initBeforeAfter(container) {
    var divider = container.querySelector('.ba-divider');
    var handle = container.querySelector('.ba-handle');
    var after = container.querySelector('.ba-after');
    if (!divider || !after) return;

    var dragging = false;

    function setPos(clientX) {
      var rect = container.getBoundingClientRect();
      var x = clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      var pct = (x / rect.width) * 100;
      after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      divider.style.left = pct + '%';
      handle.style.left = pct + '%';
    }

    function start(e) {
      dragging = true;
      container.classList.add('dragging');
      var clientX = e.type.indexOf('touch') === 0 ? e.touches[0].clientX : e.clientX;
      setPos(clientX);
      e.preventDefault();
    }
    function move(e) {
      if (!dragging) return;
      var clientX = e.type.indexOf('touch') === 0 ? e.touches[0].clientX : e.clientX;
      setPos(clientX);
      e.preventDefault();
    }
    function end() {
      dragging = false;
      container.classList.remove('dragging');
    }

    container.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    container.addEventListener('touchstart', start, { passive: false });
    container.addEventListener('touchmove', move, { passive: false });
    container.addEventListener('touchend', end);
  }

  var baContainers = $$('.before-after');
  baContainers.forEach(initBeforeAfter);

  /* ---------- 8. 工作流节点滚动动效（自动逐节点点亮） ---------- */
  var nodes = $$('.flow-node');
  if (nodes.length && 'IntersectionObserver' in window) {
    var flowObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var els = e.target.querySelectorAll('.flow-step,.flow-body');
          els.forEach(function (el, i) {
            el.classList.add('in-view');
            el.style.transitionDelay = (i * 0.15) + 's';
          });
          flowObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });
    nodes.forEach(function (n) { flowObs.observe(n); });
  }

  /* ---------- 初始化 ---------- */
  onScroll();
  filterWorks('all');
})();
