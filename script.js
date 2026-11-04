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

  // ==========================================================
  // GESTÃO DE IDIOMA
  // ==========================================================
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.lang = lang === "en" ? "en" : "pt-PT";

    // 1. Atualizar botões de seleção de idioma
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // 2. Atualizar dinamicamente os placeholders (inputs e textareas)
    document
      .querySelectorAll("[data-placeholder-" + lang + "]")
      .forEach(function (el) {
        var placeholderText = el.getAttribute("data-placeholder-" + lang);
        if (placeholderText) {
          el.setAttribute("placeholder", placeholderText);
        }
      });

    // 3. Atualizar o texto do modo consoante o idioma ativo
    var currentMode = root.getAttribute("data-mode") || "dark";
    updateModeText(currentMode, lang);

    put("portfolio-lang", lang);
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });

  // ==========================================================
  // GESTÃO DE TEMA (DARK / LIGHT)
  // ==========================================================
  function updateModeText(mode, lang) {
    var icon = document.querySelector(".mode-icon");
    var ptText = document.querySelector('.mode-text[data-l="pt"]');
    var enText = document.querySelector('.mode-text[data-l="en"]');

    if (icon) icon.textContent = mode === "dark" ? "☾" : "☀";
    if (ptText) ptText.textContent = mode === "dark" ? "Escuro" : "Claro";
    if (enText) enText.textContent = mode === "dark" ? "Dark" : "Light";
  }

  function setMode(mode) {
    root.setAttribute("data-mode", mode);
    var currentLang = root.getAttribute("data-lang") || "pt";
    updateModeText(mode, currentLang);
    put("portfolio-mode", mode);
  }

  var modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", function () {
      var currentMode = root.getAttribute("data-mode") || "dark";
      setMode(currentMode === "dark" ? "light" : "dark");
    });
  }

  // ==========================================================
  // NAVEGAÇÃO E SELEÇÃO PRECISA DOS PROJETOS
  // ==========================================================
  var projectCards = Array.from(
    document.querySelectorAll(".project-detail-card"),
  );
  var navLinks = document.querySelectorAll(".projects-nav-list li");
  var isClickScrolling = false;

  function setActiveProject(id) {
    navLinks.forEach(function (li) {
      var link = li.querySelector("a");
      if (link && link.getAttribute("href") === "#" + id) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }

  // Clique no menu lateral: bloqueia a deteção intermédia para não piscar
  navLinks.forEach(function (li) {
    var link = li.querySelector("a");
    if (link) {
      link.addEventListener("click", function () {
        var targetId = link.getAttribute("href").replace("#", "");
        var targetElement = document.getElementById(targetId);

        if (targetElement) {
          isClickScrolling = true;
          setActiveProject(targetId);
          targetElement.classList.add("is-visible");

          setTimeout(function () {
            isClickScrolling = false;
          }, 850);
        }
      });
    }
  });

  // Deteção contínua ao fazer scroll
  function updateActiveProjectOnScroll() {
    if (isClickScrolling || projectCards.length === 0) return;

    var focalPoint = window.innerHeight * 0.42;
    var closestId = null;
    var smallestDistance = Infinity;

    projectCards.forEach(function (card) {
      var rect = card.getBoundingClientRect();

      // Ativação suave do reveal
      if (rect.top < window.innerHeight * 0.88) {
        card.classList.add("is-visible");
      }

      var cardMid = rect.top + rect.height * 0.35;
      var distance = Math.abs(cardMid - focalPoint);

      if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestId = card.getAttribute("id");
        }
      }
    });

    if (closestId) {
      setActiveProject(closestId);
    }
  }

  window.addEventListener("scroll", updateActiveProjectOnScroll, {
    passive: true,
  });
  window.addEventListener("resize", updateActiveProjectOnScroll, {
    passive: true,
  });
  updateActiveProjectOnScroll();

  // ==========================================================
  // INICIALIZAÇÃO
  // ==========================================================
  var savedMode = get("portfolio-mode");
  setMode(savedMode || "dark");

  var savedLang = get("portfolio-lang");
  var browserIsPt =
    (navigator.language || "pt").toLowerCase().indexOf("pt") === 0;
  setLang(savedLang || (browserIsPt ? "pt" : "en"));

  // ==========================================================
  // ENVIO DIRETO SEM ABRIR APLICAÇÃO (FORMSPREE COM FETCH)
  // ==========================================================
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var submitButton = document.getElementById("submitBtn");
      var statusBox = document.getElementById("formStatus");
      var isPt = (root.getAttribute("data-lang") || "pt") === "pt";

      var data = new FormData(contactForm);

      // Estado imediato de carregamento
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = "0.7";
      }

      if (statusBox) {
        statusBox.style.display = "block";
        statusBox.style.background = "rgba(255, 255, 255, 0.05)";
        statusBox.style.color = "var(--heading-color, #ffffff)";
        statusBox.style.border = "1px solid rgba(255, 255, 255, 0.1)";
        statusBox.textContent = isPt
          ? "A enviar mensagem..."
          : "Sending message...";
      }

      // O teu endpoint oficial do Formspree
      var endpoint = "https://formspree.io/f/xyeeojed";

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      })
        .then(function (response) {
          if (response.ok) {
            contactForm.reset();
            if (statusBox) {
              statusBox.style.background = "rgba(52, 211, 153, 0.1)";
              statusBox.style.borderColor = "rgba(52, 211, 153, 0.3)";
              statusBox.style.color = "#34d399";
              statusBox.textContent = isPt
                ? "✓ Mensagem enviada com sucesso!"
                : "✓ Message sent successfully!";
            }
          } else {
            throw new Error("Erro na resposta do servidor");
          }
        })
        .catch(function () {
          if (statusBox) {
            statusBox.style.background = "rgba(248, 113, 113, 0.1)";
            statusBox.style.borderColor = "rgba(248, 113, 113, 0.3)";
            statusBox.style.color = "#f87171";
            statusBox.textContent = isPt
              ? "Ocorreu um erro no envio. Por favor, tente novamente."
              : "An error occurred. Please try again.";
          }
        })
        .finally(function () {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
          }
        });
    });
  }
})();
