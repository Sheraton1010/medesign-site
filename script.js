document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const scrollTop = document.querySelector(".scroll-top");

  const closeNav = () => {
    if (!navToggle || !siteNav) return;
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  if (scrollTop) {
    const updateScrollButton = () => {
      scrollTop.classList.toggle("is-visible", window.scrollY > 480);
    };

    updateScrollButton();
    window.addEventListener("scroll", updateScrollButton, { passive: true });
    scrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
