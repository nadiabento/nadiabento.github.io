# 🌐 Portfólio Pessoal & CV Técnico — Nadia Neves Bento

[![Live Demo](https://img.shields.io/badge/Demo-Online-brightgreen?style=flat-square)](https://nadiabento.github.io)
[![BSc Status](https://img.shields.io/badge/ESTGA%20·%20UA-Engenharia%20Informática%20Aplicada-orange?style=flat-square)](https://www.ua.pt)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

Plataforma web minimalista e interativa desenvolvida de raiz para apresentar o meu percurso académico, competências práticas e projetos de engenharia informática orientados a cibersegurança, alta disponibilidade e sistemas distribuídos.

---

## 🎯 Destaques do Projeto

- **Arquitetura Vanilla & Leve:** Desenvolvido exclusivamente com HTML5 semântico, CSS3 moderno (Custom Properties / Flexbox / CSS Grid) e JavaScript vanilla, sem recurso a frameworks pesadas.
- **Bilingue Nativo (PT/EN):** Alternância instantânea de idioma via atributos `data-lang` e `data-l`, sem recarregamento de página nem perda de estado.
- **Sistema de Temas Dinâmico:**
  - **Modo Escuro:** Preto profundo (`#08090b`) com orbes quentes e acentos em âmbar/dourado.
  - **Modo Claro (Moca):** Base suave em linho/castanho moca (`#cfbfaf`) com cartões em marfim aveludado (`rgba(225, 213, 200, 0.65)`), evitando contrastes brancos agressivos e assegurando conforto visual.
- **Diagramas Técnicos Animados em SVG:** Simulações visuais interativas e acessíveis que ilustram o funcionamento prático de cada sistema (ex.: _failover_ com VRRP, cifra AES-GCM e telemetria cloud).
- **Design Totalmente Responsivo:** Layout fluído adaptado a dispositivos móveis, tablets e monitores ultralargos, com menu de navegação persistente e controlos centrados.
- **Formulário Funcional:** Integração com o Formspree para receção direta de mensagens institucionais e contactos profissionais.

---

## 🛠️ Tecnologias Utilizadas

| Camada         | Tecnologias                                                                    |
| :------------- | :----------------------------------------------------------------------------- |
| **Estrutura**  | HTML5 semântico, WAI-ARIA para acessibilidade                                  |
| **Estilos**    | CSS3 (Variáveis CSS, Backdrop Filter, Glassmorphism, Media Queries)            |
| **Lógica**     | JavaScript ES6+ (Manipulação de DOM, LocalStorage, Fetch API)                  |
| **Gráficos**   | SVG nativo com animações SMIL integradas                                       |
| **Tipografia** | _Plus Jakarta Sans_ (leitura editorial) e _JetBrains Mono_ (código e métricas) |
| **Serviços**   | Formspree (formulário de contacto), GitHub Pages (alojamento)                  |

---

## 📂 Estrutura de Ficheiros

```text
├── index.html          # Estrutura semântica e conteúdo bilingue (PT/EN)
├── style.css           # Variáveis de temas, layouts responsivos e animações
├── script.js           # Gestão de temas, seleção de idioma e envio de formulário
├── profile.jpg         # Fotografia de perfil profissional
└── README.md           # Documentação técnica do repositório
```
