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
