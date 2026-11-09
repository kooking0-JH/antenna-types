/* antenna-types 공통 스크립트
 * 1) 본문 h2[id]로 페이지 목차(.toc)와 넓은 화면용 고정 목차를 자동 생성
 * 2) 그림이 화면에 들어오면 선이 그려지는 애니메이션 시작
 * 3) 티스토리 등 iframe 안에 있으면 높이를 부모 창에 알리고, 목차 클릭 시 부모 창을 스크롤
 */
(function () {
  var root = document.documentElement;
  var embedded = false;
  try { embedded = window.self !== window.top; } catch (e) { embedded = true; }
  if (embedded) root.classList.add('embedded');

  // 1) 목차 생성
  var heads = Array.prototype.slice.call(document.querySelectorAll('.wrap h2[id]'));
  function parts(h) {
    var en = h.querySelector('.en');
    var ko = '';
    h.childNodes.forEach(function (n) { if (n.nodeType === 3) ko += n.textContent; });
    return { ko: ko.trim(), en: en ? en.textContent.trim() : '' };
  }
  var tocList = document.querySelector('.toc ol');
  if (tocList && heads.length) {
    heads.forEach(function (h, i) {
      var p = parts(h);
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      var no = document.createElement('span'); no.className = 'no';
      no.textContent = (h.id === 'glossary') ? '★' : String(i + 1);
      var tx = document.createElement('span');
      var k = document.createElement('span'); k.className = 'ko'; k.textContent = p.ko;
      var e = document.createElement('span'); e.className = 'en2'; e.textContent = p.en;
      tx.appendChild(k); tx.appendChild(e);
      a.appendChild(no); a.appendChild(tx); li.appendChild(a); tocList.appendChild(li);
    });
  }
  var sideLinks = [];
  if (!embedded && heads.length > 2) {
    var side = document.createElement('nav');
    side.className = 'side-toc';
    side.setAttribute('aria-label', '목차');
    var t = document.createElement('div'); t.className = 'st-title'; t.textContent = '목차';
    side.appendChild(t);
    heads.forEach(function (h) {
      var a = document.createElement('a'); a.href = '#' + h.id; a.textContent = parts(h).ko;
      side.appendChild(a); sideLinks.push(a);
    });
    var home = document.createElement('a'); home.className = 'st-home'; home.href = './';
    home.textContent = '← 전체 목차';
    side.appendChild(home);
    document.body.appendChild(side);

    // 지금 읽는 위치 강조
    var setOn = function () {
      var y = window.scrollY + window.innerHeight * 0.3, cur = 0;
      heads.forEach(function (h, i) { if (h.getBoundingClientRect().top + window.scrollY <= y) cur = i; });
      sideLinks.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
    };
    window.addEventListener('scroll', setOn, { passive: true });
    setOn();
  }

  // 2) 그림 애니메이션
  var figs = document.querySelectorAll('.fig');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    figs.forEach(function (f) { f.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    figs.forEach(function (f) { io.observe(f); });
  }

  if (!embedded) return;

  // 3-a) iframe 높이 자동 맞춤
  //  블로그 쪽 스크립트가 늦게 실행되어 첫 신호를 놓칠 수 있으므로
  //  ① 처음 몇 초 동안 여러 번 보내고 ② 블로그가 요청(ping)하면 즉시 다시 보냄
  var last = 0;
  function send(force) {
    var h = Math.ceil(document.body.getBoundingClientRect().height);
    if (!force && Math.abs(h - last) < 2) return;
    last = h;
    window.parent.postMessage({ type: 'antenna-types:height', page: location.pathname, height: h }, '*');
  }
  if ('ResizeObserver' in window) new ResizeObserver(function () { send(false); }).observe(document.body);
  window.addEventListener('load', function () { send(true); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { send(true); });
  [300, 1000, 2500, 5000, 9000].forEach(function (t) { setTimeout(function () { send(true); }, t); });
  window.addEventListener('message', function (e) {
    if (e.source === window.parent && e.data && e.data.type === 'antenna-types:ping') send(true);
  });
  send(true);

  // 3-b) 페이지 안 링크(#)를 누르면 블로그 화면 자체를 그 위치로 스크롤
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (!a) return;
    var el = document.getElementById(a.getAttribute('href').slice(1));
    if (!el) return;
    ev.preventDefault();
    var top = el.getBoundingClientRect().top + window.scrollY;
    window.parent.postMessage({ type: 'antenna-types:scroll', page: location.pathname, top: top }, '*');
  });
})();
