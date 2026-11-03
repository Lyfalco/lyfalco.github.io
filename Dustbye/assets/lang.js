// Dil seçimi: ?lang=tr|en, sonra kayıtlı seçim, sonra tarayıcı dili. JS yoksa iki dil de görünür.
(function () {
  var root = document.documentElement;
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'tr' || q === 'en') return q;
    try { var s = localStorage.getItem('dustbye-lang'); if (s === 'tr' || s === 'en') return s; } catch (e) {}
    return (navigator.language || 'en').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }
  function apply(l) {
    root.classList.remove('tr', 'en');
    root.classList.add('js', l);
    root.setAttribute('lang', l);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.l === l ? 'true' : 'false');
    });
  }
  apply(pick());
  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('lang'));
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        try { localStorage.setItem('dustbye-lang', b.dataset.l); } catch (e) {}
        apply(b.dataset.l);
      });
    });
  });
})();
