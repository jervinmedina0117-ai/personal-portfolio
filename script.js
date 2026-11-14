// Add a class early so reveal styles only hide content when JavaScript is available.
document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationItems = [...document.querySelectorAll(".nav-link")];
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.querySelector("#contact-form");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

navigationItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if (activeLink) {
      navigationItems.forEach((link) => link.classList.toggle("active", link === activeLink));
    }
  });
}, { rootMargin: "-30% 0px -60% 0px" });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const header = document.querySelector(".site-header");
function updateScrollControls() {
  const hasScrolled = window.scrollY > 24;
  header.classList.toggle("scrolled", hasScrolled);
  backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateScrollControls, { passive: true });
updateScrollControls();
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.querySelector("#current-year").textContent = new Date().getFullYear();

// Keep this address in sync with the email link in index.html.
const contactEmail = "jervinmedina0117@gmail.com";
const formFields = {
  name: {
    input: document.querySelector("#name"),
    error: document.querySelector("#name-error"),
    message: "Please enter your name (at least 2 characters).",
    isValid: (value) => value.trim().length >= 2,
  },
  email: {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-error"),
    message: "Please enter a valid email address.",
    isValid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  },
  subject: {
    input: document.querySelector("#subject"),
    error: document.querySelector("#subject-error"),
    message: "Please enter a subject (at least 2 characters).",
    isValid: (value) => value.trim().length >= 2,
  },
  message: {
    input: document.querySelector("#message"),
    error: document.querySelector("#message-error"),
    message: "Please enter a message (at least 10 characters).",
    isValid: (value) => value.trim().length >= 10,
  },
};

Object.values(formFields).forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    error.textContent = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formStatus = document.querySelector("#form-status");
  formStatus.textContent = "";
  let firstInvalidField = null;
  let isValid = true;

  Object.values(formFields).forEach(({ input, error, message, isValid: validate }) => {
    if (validate(input.value)) {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      return;
    }
    isValid = false;
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
    firstInvalidField = firstInvalidField || input;
  });

  if (!isValid) {
    firstInvalidField.focus();
    return;
  }

  const subject = encodeURIComponent(formFields.subject.input.value.trim());
  const body = encodeURIComponent(
    `Name: ${formFields.name.input.value.trim()}\nEmail: ${formFields.email.input.value.trim()}\n\n${formFields.message.input.value.trim()}`
  );
  formStatus.textContent = "Opening your email app with your message...";
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});

// Enhancement layer: theme, project discovery, quick contact actions, and modal case studies.
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
function updateThemeButton() {
  const light = document.body.classList.contains("light-theme");
  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.querySelector(".theme-label").textContent = light ? "Dark mode" : "Light mode";
  themeToggle.querySelector(".theme-icon").textContent = light ? "☾" : "☼";
}
updateThemeButton();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  updateThemeButton();
});

const progressBar = document.querySelector(".scroll-progress span");
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const projectCards = [...document.querySelectorAll(".project-card")];
const projectCount = document.querySelector(".project-count");
function updateProjectCount(count) { projectCount.textContent = `${count} ${count === 1 ? "project" : "projects"}`; }
updateProjectCount(projectCards.length);
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
    const visible = projectCards.filter((card) => filter === "all" || card.dataset.category === filter);
    projectCards.forEach((card) => {
      const show = visible.includes(card);
      card.classList.toggle("is-filtered", !show);
      card.setAttribute("aria-hidden", String(!show));
    });
    updateProjectCount(visible.length);
  });
});

const projectDetails = {
  game: { title: "2D Game Developing", type: "Game prototype", description: "A focused gameplay concept exploring level layout, obstacles, and interactive terrain. The next iteration would add player feedback, checkpoints, and a short playable loop.", stack: "Unity · C# · Level design", status: "Prototype" },
  roadmap: { title: "IT Knowledge Roadmapping", type: "Learning app", description: "A practical dashboard concept for turning an open-ended IT curriculum into clear milestones, progress signals, and next steps that feel achievable.", stack: "HTML · CSS · UI/UX", status: "In progress" },
  cafe: { title: "Web Developing", type: "Web experience", description: "A warm, modern landing-page direction for a cafe brand, balancing welcoming storytelling with clear calls to action and a responsive visual system.", stack: "HTML · CSS · Responsive design", status: "Concept" },
};
const modal = document.querySelector("#project-modal");
const closeModal = () => { modal.hidden = true; document.body.classList.remove("modal-open"); };
document.querySelectorAll("[data-open-project]").forEach((button) => button.addEventListener("click", () => {
  const detail = projectDetails[button.dataset.openProject];
  if (!detail) return;
  document.querySelector("#modal-title").textContent = detail.title;
  document.querySelector("#modal-type").textContent = detail.type;
  document.querySelector("#modal-description").textContent = detail.description;
  document.querySelector("#modal-stack").textContent = detail.stack;
  document.querySelector("#modal-status").textContent = detail.status;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  document.querySelector(".modal-close").focus();
}));
modal.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

const toast = document.querySelector(".toast");
function showToast(message) { toast.textContent = message; toast.classList.add("show"); window.setTimeout(() => toast.classList.remove("show"), 2400); }
document.querySelector(".copy-email").addEventListener("click", async (event) => {
  const email = event.currentTarget.dataset.copyEmail;
  try { await navigator.clipboard.writeText(email); showToast("Email copied to clipboard"); }
  catch { showToast(email); }
});
