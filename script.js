(function () {
  var root = document.documentElement;

  function get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function put(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {}
  }

  // Gestão de Idioma
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang === "en" ? "en" : "pt-PT";
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    put("portfolio-lang", lang);
  }

  // Gestão de Tema (Dark / Light)
  function setMode(mode) {
    root.setAttribute("data-mode", mode);
    var icon = document.querySelector(".mode-icon");
    var ptText = document.querySelector('.mode-text[data-l="pt"]');
    var enText = document.querySelector('.mode-text[data-l="en"]');

    if (icon) icon.textContent = mode === "dark" ? "☾" : "☀";
    if (ptText) ptText.textContent = mode === "dark" ? "Escuro" : "Claro";
    if (enText) enText.textContent = mode === "dark" ? "Dark" : "Light";

    put("portfolio-mode", mode);
  }

  // Event Listeners Idioma
  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });

  // Event Listener Alternador de Tema
  var modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", function () {
      var currentMode = root.getAttribute("data-mode") || "dark";
      setMode(currentMode === "dark" ? "light" : "dark");
    });
  }

  // Inicialização
  var savedLang = get("portfolio-lang");
  var browserIsPt =
    (navigator.language || "pt").toLowerCase().indexOf("pt") === 0;
  setLang(savedLang || (browserIsPt ? "pt" : "en"));

  var savedMode = get("portfolio-mode");
  setMode(savedMode || "dark");
})();
