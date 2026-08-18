const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("backToTop");
const yearSpan = document.getElementById("year");

yearSpan.textContent = new Date().getFullYear();

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

const sections = document.querySelectorAll("main section[id]");

function setActiveNavLink() {
  let currentSectionId = "";
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", () => {
  handleNavbarScroll();
  handleBackToTop();
  setActiveNavLink();
});

const typedTextEl = document.getElementById("typedText");
const typingRoles = [
  "Web Developer",
  "PHP Developer",
  "C Programmer",
  "C# Programmer",
  "Front-End Developer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = typingRoles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedTextEl.textContent = currentRole.substring(0, charIndex);

  let typingSpeed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typingRoles.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const skillsSection = document.getElementById("skills");
const progressFills = document.querySelectorAll(".progress-fill");
const skillPercents = document.querySelectorAll(".skill-percent");
let skillsAnimated = false;

function animateSkillBars() {
  progressFills.forEach((fill) => {
    const targetWidth = fill.getAttribute("data-width");
    fill.style.width = `${targetWidth}%`;
  });

  skillPercents.forEach((percentEl) => {
    const target = parseInt(percentEl.getAttribute("data-percent"), 10);
    animateCounter(percentEl, target, "%");
  });
}

function animateCounter(el, target, suffix = "") {
  let current = 0;
  const duration = 1200;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;

  const counterInterval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(counterInterval);
    }
    el.textContent = `${Math.round(current)}${suffix}`;
  }, stepTime);
}

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsAnimated) {
        animateSkillBars();
        skillsAnimated = true;
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

const statCounters = document.querySelectorAll(".counter");
let statsAnimated = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statCounters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"), 10);
          animateCounter(counter, target);
        });
        statsAnimated = true;
      }
    });
  },
  { threshold: 0.4 }
);

const aboutStatsContainer = document.querySelector(".about-stats");
if (aboutStatsContainer) {
  statsObserver.observe(aboutStatsContainer);
}

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

function showError(inputEl, errorEl, message) {
  inputEl.classList.add("invalid");
  errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove("invalid");
  errorEl.textContent = "";
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.classList.remove("show");

    let isValid = true;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    if (fullName.value.trim().length < 2) {
      showError(fullName, fullNameError, "Please enter your full name.");
      isValid = false;
    } else {
      clearError(fullName, fullNameError);
    }

    if (!isValidEmail(email.value.trim())) {
      showError(email, emailError, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(email, emailError);
    }

    if (subject.value.trim().length < 3) {
      showError(subject, subjectError, "Please enter a subject.");
      isValid = false;
    } else {
      clearError(subject, subjectError);
    }

    if (message.value.trim().length < 10) {
      showError(message, messageError, "Message should be at least 10 characters.");
      isValid = false;
    } else {
      clearError(message, messageError);
    }

    if (isValid) {
      formSuccess.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove("show");
      }, 4000);
    }
  });

  ["fullName", "email", "subject", "message"].forEach((id) => {
    const field = document.getElementById(id);
    const errorEl = document.getElementById(`${id}Error`);
    field.addEventListener("input", () => clearError(field, errorEl));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  handleNavbarScroll();
  setActiveNavLink();
  typeEffect();
});
   
