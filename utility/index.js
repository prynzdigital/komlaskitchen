export const foodkingUtility = {
  preloader: () => {
    if (typeof window === "undefined") return;
    window.addEventListener("load", () => {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("loaded");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 600);
      }
    });
    // Fallback in case 'load' already fired
    setTimeout(() => {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("loaded");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 600);
      }
    }, 3000);
  },

  scrollAnimation: () => {
    if (typeof window !== "undefined") {
      import("wowjs").then(({ WOW }) => {
        const wow = new WOW({ live: false });
        wow.init();
      });
    }
  },

  stickyNav: () => {
    if (typeof window === "undefined") return;
    const header = document.getElementById("header-sticky");
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 80) {
        header.classList.add("sticky-header");
      } else {
        header.classList.remove("sticky-header");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  },

  sliderAnimation: (slides) => {
    if (!slides) return;
    slides.forEach((slide) => {
      const animatedEls = slide.querySelectorAll("[data-animation]");
      const isActive = slide.classList.contains("swiper-slide-active");
      animatedEls.forEach((el) => {
        const animation = el.getAttribute("data-animation");
        const delay = el.getAttribute("data-delay") || "0s";
        const duration = el.getAttribute("data-duration") || "1s";
        el.style.animationDelay = delay;
        el.style.animationDuration = duration;
        if (isActive) {
          el.classList.add("animated", animation);
        } else {
          el.classList.remove("animated", animation);
        }
      });
    });
  },
};
