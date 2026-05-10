(function () {
    "use strict";

    /* Populate hrefs from SITE config ---------------------------- */
    if (typeof SITE !== "undefined") {
        document.querySelectorAll("[data-link]").forEach(function (el) {
            const key = el.getAttribute("data-link");
            if (SITE[key]) el.setAttribute("href", SITE[key]);
        });
    }

    /* Theme toggle ------------------------------------------------ */
    const themeToggle = document.querySelector(".theme-toggle");
    const root = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = current === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        });
    }

    /* Mobile menu ------------------------------------------------- */
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    function closeMenu() {
        if (!menuToggle || !mobileNav) return;
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
    }

    function openMenu() {
        if (!menuToggle || !mobileNav) return;
        menuToggle.setAttribute("aria-expanded", "true");
        mobileNav.hidden = false;
    }

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", function () {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        mobileNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth >= 720) closeMenu();
        });
    }

    /* Reveal-on-scroll animation --------------------------------- */
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && revealEls.length) {
        const observer = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    /* Dynamic year in footer ------------------------------------- */
    const yearEl = document.querySelector(".footer-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
