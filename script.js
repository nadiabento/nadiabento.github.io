(function () {
  var root = document.documentElement;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.lang = l === 'en' ? 'en' : 'pt-PT';
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set-lang') === l ? 'true' : 'false');
    });
    put('cv-lang', l);
  }

  function setMode(m) {
    root.setAttribute('data-mode', m);
    var icon = document.querySelector('.mode-icon');
    if (icon) icon.textContent = m === 'dark' ? '☀' : '☾';
    var pt = document.querySelector('.mode-label[data-l="pt"]');
    var en = document.querySelector('.mode-label[data-l="en"]');
    if (pt) pt.textContent = m === 'dark' ? 'Claro' : 'Escuro';
    if (en) en.textContent = m === 'dark' ? 'Light' : 'Dark';
    put('cv-mode', m);
  }

  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
  });
  document.getElementById('modeToggle').addEventListener('click', function () {
    setMode(root.getAttribute('data-mode') === 'dark' ? 'light' : 'dark');
  });

  var savedLang = get('cv-lang');
  var browserPt = (navigator.language || 'pt').toLowerCase().indexOf('pt') === 0;
  setLang(savedLang || (browserPt ? 'pt' : 'en'));

  var savedMode = get('cv-mode');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setMode(savedMode || (prefersDark ? 'dark' : 'light'));
})();
