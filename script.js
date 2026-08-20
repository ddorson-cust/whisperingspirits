/* ==========================================================================
   THE WHISPERING SPIRITS — Shared site behaviour
   Runs on every page. Event-rendering logic lives in events.js and is only
   used on events.html (and the "upcoming" preview on the homepage).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  wireMobileNav();
  wireScrollReveal();
  wireSocialLinks();
  wireContactEmail();
  wireYear();
  wireHeaderShrink();
});

/* ---------- Mobile navigation ---------- */
function wireMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggle || !mobileNav) return;

  const closeIcon = toggle.querySelector(".icon-close");
  const openIcon = toggle.querySelector(".icon-open");

  function setOpen(isOpen) {
    mobileNav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (openIcon) openIcon.style.display = isOpen ? "none" : "block";
    if (closeIcon) closeIcon.style.display = isOpen ? "block" : "none";
  }

  toggle.addEventListener("click", () => {
    setOpen(!mobileNav.classList.contains("is-open"));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ---------- Fade-in-on-scroll for elements with .reveal ---------- */
function wireScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Wire every [data-social] element to the config URLs ---------- */
function wireSocialLinks() {
  const map = {
    whatsapp: typeof WHATSAPP_URL !== "undefined" ? WHATSAPP_URL : "#",
    instagram: typeof INSTAGRAM_URL !== "undefined" ? INSTAGRAM_URL : "#",
    tiktok: typeof TIKTOK_URL !== "undefined" ? TIKTOK_URL : "#",
    facebook: typeof FACEBOOK_URL !== "undefined" ? FACEBOOK_URL : "#",
  };

  document.querySelectorAll("[data-social]").forEach((el) => {
    const key = el.getAttribute("data-social");
    if (map[key]) {
      el.setAttribute("href", map[key]);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });
}

/* ---------- Wire every [data-email-link] to the configured contact email ---------- */
function wireContactEmail() {
  const email = typeof CONTACT_EMAIL !== "undefined" ? CONTACT_EMAIL : "";
  document.querySelectorAll("[data-email-link]").forEach((el) => {
    el.setAttribute("href", "mailto:" + email);
  });
  document.querySelectorAll("[data-email-text]").forEach((el) => {
    el.textContent = email;
  });
}

/* ---------- Footer year ---------- */
function wireYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Subtle header background shift on scroll ---------- */
function wireHeaderShrink() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.style.background = "rgba(5, 4, 3, 0.92)";
    } else {
      header.style.background = "rgba(5, 4, 3, 0.72)";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
