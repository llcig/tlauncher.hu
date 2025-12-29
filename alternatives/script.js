// Theme toggle with "auto" support + localStorage.
(() => {
    const root = document.documentElement;
    const btn = document.getElementById("themeToggle");
    const icon = btn?.querySelector(".theme-toggle__icon");

    const getPreferred = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";

    const apply = (theme) => {
        if (theme === "auto") {
            root.dataset.theme = getPreferred();
        } else {
            root.dataset.theme = theme;
        }

        const current = root.dataset.theme;
        if (icon) icon.textContent = current === "light" ? "☀" : "☾";
        if (btn) btn.setAttribute("aria-label", `Toggle theme (current: ${current})`);
    };

    const saved = localStorage.getItem("theme") || "auto";
    apply(saved);

    btn?.addEventListener("click", () => {
        const currentSaved = localStorage.getItem("theme") || "auto";

        // Cycle: auto -> dark -> light -> auto
        const next =
        currentSaved === "auto" ? "dark" :
        currentSaved === "dark" ? "light" : "auto";

        localStorage.setItem("theme", next);
        apply(next);
    });

    // If user is on auto, react to OS theme changes.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener?.("change", () => {
        const mode = localStorage.getItem("theme") || "auto";
        if (mode === "auto") apply("auto");
    });
})();

// Simple reveal-on-scroll animation.
(() => {
    const items = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
        (entries) => {
            for (const e of entries) {
                if (e.isIntersecting) e.target.classList.add("is-visible");
            }
        },
        { threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
})();
