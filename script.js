document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }));
  }
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
/* Self-contained Panda assistant for this static GitHub Pages portfolio. */
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.createElement("aside");
  widget.className = "panda-widget is-waving";
  widget.setAttribute("aria-label", "Panda portfolio assistant");
  widget.innerHTML = `
    <section class="panda-bubble" id="panda-bubble" aria-live="polite">
      <div class="panda-bubble-head"><span class="panda-bubble-title">Panda assistant</span><button class="panda-close" type="button" aria-label="Close message">×</button></div>
      <p class="panda-message" id="panda-message">Hey there! Welcome to my portfolio. Need a quick tour?</p>
      <div class="panda-actions">
        <button class="panda-action" data-action="projects">⌕ Explore Projects</button>
        <button class="panda-action" data-action="resume">↧ View Resume</button>
        <button class="panda-action" data-action="skills">⌘ Tech Stack</button>
        <button class="panda-action" data-action="contact">✉ Say Hi / Hire Me</button>
        <button class="panda-action" data-action="hide">Hide Panda</button>
      </div>
    </section>
    <button class="panda-stage" type="button" aria-label="Poke the panda assistant" title="Poke me!">
      <span class="panda-zzz" aria-hidden="true">Zzz</span>
      <svg class="panda-svg" viewBox="0 0 100 100" role="img" aria-label="Cute waving panda mascot">
        <ellipse cx="50" cy="89" rx="29" ry="6" fill="#020617" opacity=".25"/>
        <ellipse cx="50" cy="57" rx="31" ry="32" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <circle cx="27" cy="25" r="14" fill="#172033"/><circle cx="73" cy="25" r="14" fill="#172033"/><circle cx="27" cy="25" r="6" fill="#f9a8d4"/><circle cx="73" cy="25" r="6" fill="#f9a8d4"/>
        <ellipse cx="38" cy="49" rx="8" ry="11" fill="#172033" transform="rotate(22 38 49)"/><ellipse cx="62" cy="49" rx="8" ry="11" fill="#172033" transform="rotate(-22 62 49)"/>
        <ellipse cx="38" cy="49" rx="2.2" ry="3.2" fill="#fff"/><ellipse cx="62" cy="49" rx="2.2" ry="3.2" fill="#fff"/>
        <g class="panda-sleep-eyes"><path d="M32 49q6 6 12 0M56 49q6 6 12 0" fill="none" stroke="#172033" stroke-width="2.5" stroke-linecap="round"/></g>
        <path d="M46 60q4-4 8 0q-4 6-8 0" fill="#172033"/><path d="M50 65q-5 7-10 1M50 65q5 7 10 1" fill="none" stroke="#172033" stroke-width="1.7" stroke-linecap="round"/>
        <ellipse cx="27" cy="61" rx="5" ry="3" fill="#f9a8d4" opacity=".7"/><ellipse cx="73" cy="61" rx="5" ry="3" fill="#f9a8d4" opacity=".7"/>
        <path d="M25 77q-13 8-8 13q8 4 17-8M75 77q13 8 8 13q-8 4-17-8" fill="#172033"/>
        <g class="panda-arm"><path d="M72 70q13-7 14-20" fill="none" stroke="#172033" stroke-width="13" stroke-linecap="round"/><circle cx="87" cy="47" r="8" fill="#172033"/><path d="M84 43q-2-4 0-5m5 5q2-4 4-3" stroke="#f9a8d4" stroke-width="1.7" stroke-linecap="round" fill="none"/></g>
        <g class="panda-face-extra"><path d="M78 34q8 8 0 15" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/><text x="50" y="38" text-anchor="middle" font-size="15">✦</text></g>
        <g class="panda-heart-eyes"><text x="38" y="53" text-anchor="middle" font-size="12">♥</text><text x="62" y="53" text-anchor="middle" font-size="12">♥</text></g>
      </svg>
    </button>
    <button class="panda-paw" type="button" aria-label="Show Panda assistant">🐾</button>`;
  document.body.appendChild(widget);

  const bubble = widget.querySelector(".panda-bubble");
  const message = widget.querySelector("#panda-message");
  const stage = widget.querySelector(".panda-stage");
  const paw = widget.querySelector(".panda-paw");
  let pokeCount = 0;
  let cooldown = false;
  let inactivityTimer;
  let scrollTimer;
  let toastTimer;
  let bubbleDismissed = false;
  const defaultMessage = "Hey there! Welcome to my portfolio. Need a quick tour?";
  const messages = {
    projects: "Check out my full-stack and data engineering builds—ask me about the tech stack!",
    skills: "From React & Node.js to Python, SQL and Docker—want to see where I've used these?",
    idle: "Building cool things one commit at a time. Looking to hire or collaborate?",
    dizzy: "Whoa, easy on the bamboo! Let me catch my breath."
  };
  const showMessage = (text) => { message.textContent = text; bubble.hidden = false; bubbleDismissed = false; };
  const showToast = (text) => {
    let toast = document.querySelector(".panda-toast");
    if (!toast) { toast = document.createElement("div"); toast.className = "panda-toast"; toast.setAttribute("role", "status"); document.body.appendChild(toast); }
    toast.textContent = text; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  };
  const setState = (state) => {
    widget.classList.remove("is-waving", "is-happy", "is-sleeping", "is-dizzy");
    if (state) widget.classList.add(`is-${state}`);
  };
  const resetInactivity = () => {
    clearTimeout(inactivityTimer);
    if (!cooldown) setState("idle");
    inactivityTimer = setTimeout(() => {
      if (!cooldown) { setState("sleeping"); showMessage("Taking a tiny bamboo break… wake me if you need a hand!"); }
    }, 30000);
  };
  const cheer = () => { if (cooldown) return; setState("happy"); setTimeout(() => { if (!cooldown) setState("idle"); }, 1300); resetInactivity(); };
  const scrollTo = (id) => { const target = document.getElementById(id); if (target) target.scrollIntoView({behavior:"smooth", block:"start"}); };

  widget.querySelector(".panda-close").addEventListener("click", () => { bubble.hidden = true; bubbleDismissed = true; });
  widget.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "projects") { scrollTo("projects"); showMessage(messages.projects); }
    if (action === "resume") { window.open("Abhishek_Jha_Software_Engineer_Resume.pdf", "_blank", "noopener"); showMessage("Here's my Software Engineer resume. Thanks for taking a look!"); }
    if (action === "skills") { scrollTo("skills"); showMessage(messages.skills); }
    if (action === "contact") {
      showMessage("Opening your email app so you can get in touch!");
      window.location.href = "mailto:jhaajabhishek66@gmail.com?subject=Portfolio%20Enquiry";
    }
    if (action === "hide") { widget.classList.add("is-hidden"); bubble.hidden = true; }
    cheer();
  }));
  paw.addEventListener("click", () => { widget.classList.remove("is-hidden"); bubble.hidden = false; showMessage(defaultMessage); setState("waving"); resetInactivity(); });
  stage.addEventListener("mouseenter", () => { if (!cooldown) { setState("waving"); if (!bubbleDismissed) showMessage("Hi! I'm your tiny portfolio guide. Pick a shortcut above!"); } });
  stage.addEventListener("click", () => {
    resetInactivity();
    if (cooldown) return;
    pokeCount += 1;
    if (pokeCount >= 5) {
      cooldown = true; setState("dizzy"); showMessage(messages.dizzy); pokeCount = 0;
      setTimeout(() => { cooldown = false; setState("idle"); resetInactivity(); }, 10000);
    } else { setState("happy"); setTimeout(() => { if (!cooldown) setState("idle"); }, 700); }
  });
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach((eventName) => document.addEventListener(eventName, resetInactivity, {passive:true}));
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (cooldown || bubbleDismissed) return;
      const projects = document.getElementById("projects");
      const skills = document.getElementById("skills");
      const projectTop = projects?.getBoundingClientRect().top ?? Infinity;
      const skillsTop = skills?.getBoundingClientRect().top ?? Infinity;
      if (projectTop < window.innerHeight * .55 && projectTop > -projects.offsetHeight * .8) showMessage(messages.projects);
      else if (skillsTop < window.innerHeight * .55 && skillsTop > -skills.offsetHeight * .8) showMessage(messages.skills);
    }, 120);
    resetInactivity();
  }, {passive:true});
  setTimeout(() => { if (!bubbleDismissed) showMessage(defaultMessage); }, 350);
  setState("waving");
  setTimeout(() => { if (!cooldown) setState("idle"); }, 1800);
  resetInactivity();
});
