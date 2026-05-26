import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollAnimation() {
  let registered = false;

  function register() {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
  }

  onMounted(register);

  function fadeInUp(
    selector: string,
    options?: {
      delay?: number;
      duration?: number;
      stagger?: number;
      y?: number;
      trigger?: string;
      start?: string;
    }
  ) {
    const { delay = 0, duration = 0.8, stagger = 0.12, y = 50, trigger, start = "top 85%" } = options ?? {};
    nextTick(() => {
      gsap.set(selector, { opacity: 0, y });
      gsap.to(selector, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: trigger ?? selector, start, once: true },
      });
    });
  }

  function revealFromLeft(selector: string, options?: { trigger?: string; duration?: number }) {
    const { trigger, duration = 1 } = options ?? {};
    nextTick(() => {
      gsap.set(selector, { opacity: 0, x: -80, rotateY: 5 });
      gsap.to(selector, {
        opacity: 1, x: 0, rotateY: 0,
        duration, ease: "power3.out",
        scrollTrigger: { trigger: trigger ?? selector, start: "top 80%", once: true },
      });
    });
  }

  function revealFromRight(selector: string, options?: { trigger?: string; duration?: number }) {
    const { trigger, duration = 1 } = options ?? {};
    nextTick(() => {
      gsap.set(selector, { opacity: 0, x: 80, rotateY: -5 });
      gsap.to(selector, {
        opacity: 1, x: 0, rotateY: 0,
        duration, ease: "power3.out",
        scrollTrigger: { trigger: trigger ?? selector, start: "top 80%", once: true },
      });
    });
  }

  function scaleIn(selector: string, options?: { trigger?: string; stagger?: number }) {
    const { trigger, stagger = 0.1 } = options ?? {};
    nextTick(() => {
      gsap.set(selector, { opacity: 0, scale: 0.85 });
      gsap.to(selector, {
        opacity: 1, scale: 1,
        duration: 0.7, stagger, ease: "back.out(1.4)",
        scrollTrigger: { trigger: trigger ?? selector, start: "top 85%", once: true },
      });
    });
  }

  function parallax(selector: string, speed: number = 0.3) {
    nextTick(() => {
      gsap.to(selector, {
        y: () => speed * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  /**
   * Parallax for background images inside a container.
   * The image must be taller than the container (use h-[120%] or similar).
   * @param imageSelector - the img element selector
   * @param containerSelector - the parent overflow-hidden container
   * @param distance - how many px the image moves (default 100)
   */
  function parallaxImage(imageSelector: string, containerSelector: string, distance: number = 100) {
    nextTick(() => {
      gsap.set(imageSelector, { y: -distance / 2 });
      gsap.to(imageSelector, {
        y: distance / 2,
        ease: "none",
        scrollTrigger: {
          trigger: containerSelector,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  function textReveal(selector: string, options?: { trigger?: string }) {
    const { trigger } = options ?? {};
    nextTick(() => {
      gsap.set(selector, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(selector, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: trigger ?? selector, start: "top 80%", once: true },
      });
    });
  }

  function horizontalLine(selector: string, options?: { trigger?: string }) {
    const { trigger } = options ?? {};
    nextTick(() => {
      gsap.set(selector, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(selector, {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: trigger ?? selector, start: "top 85%", once: true },
      });
    });
  }

  function countUp(el: HTMLElement, endValue: number, options?: { duration?: number; trigger?: string }) {
    const { duration = 2.5, trigger } = options ?? {};
    nextTick(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: endValue,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: trigger ?? el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.value));
        },
      });
    });
  }

  return { fadeInUp, revealFromLeft, revealFromRight, scaleIn, parallax, parallaxImage, textReveal, horizontalLine, countUp };
}
