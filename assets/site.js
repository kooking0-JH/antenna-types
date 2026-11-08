/* antenna-types 공통 스크립트
 * 1) 그림이 화면에 들어오면 선이 그려지는 애니메이션 시작
 * 2) 티스토리 등 iframe 안에 들어가 있으면 페이지 높이를 부모 창에 알려 자동으로 맞춤
 */
(function () {
  var root = document.documentElement;

  // 1) 그림 애니메이션
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

  // 2) iframe 높이 자동 맞춤
  var embedded = false;
  try { embedded = window.self !== window.top; } catch (e) { embedded = true; }
  if (!embedded) return;
  root.classList.add('embedded');

  var last = 0;
  function send() {
    var h = Math.ceil(document.body.getBoundingClientRect().height);
    if (Math.abs(h - last) < 2) return;
    last = h;
    window.parent.postMessage({ type: 'antenna-types:height', page: location.pathname, height: h }, '*');
  }
  if ('ResizeObserver' in window) new ResizeObserver(send).observe(document.body);
  window.addEventListener('load', send);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(send);
  send();
})();
