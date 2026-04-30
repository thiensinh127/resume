const marqueeImages = [
  "assets/code-share.png",
  "assets/food-delivery.png",
  "assets/snapgram.png",
  "assets/airbnb.png",
  "assets/camp.png",
  "assets/gsap.png",
  "assets/code-share.png",
  "assets/food-delivery.png",
  "assets/snapgram.png",
  "assets/airbnb.png",
  "assets/camp.png",
  "assets/gsap.png",
];

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  setupFadeIn();
  setupMagnet();
  setupMarquee();
  setupAnimatedText();
  setupProjectCards();
});

function setupFadeIn() {
  const items = document.querySelectorAll(".fade-in");

  items.forEach((item) => {
    const delay = Number(item.dataset.delay || 0);
    const duration = Number(item.dataset.duration || 700);
    const x = Number(item.dataset.x || 0);
    const y = Number(item.dataset.y || 30);

    item.style.setProperty("--fade-delay", `${delay}ms`);
    item.style.setProperty("--fade-duration", `${duration}ms`);
    item.style.setProperty("--fade-x", `${x}px`);
    item.style.setProperty("--fade-y", `${y}px`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "50px",
      threshold: 0,
    },
  );

  items.forEach((item) => observer.observe(item));
}

function setupMagnet() {
  document.querySelectorAll(".magnet").forEach((element) => {
    const padding = Number(element.dataset.padding || 150);
    const strength = Number(element.dataset.strength || 3);
    const activeTransition = element.dataset.activeTransition || "transform 0.3s ease-out";
    const inactiveTransition = element.dataset.inactiveTransition || "transform 0.6s ease-in-out";

    window.addEventListener(
      "mousemove",
      (event) => {
        const rect = element.getBoundingClientRect();
        const insideX = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding;
        const insideY = event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;

        if (!insideX || !insideY) {
          element.style.transition = inactiveTransition;
          element.style.transform = "translate3d(0, 0, 0)";
          return;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (event.clientX - centerX) / strength;
        const moveY = (event.clientY - centerY) / strength;

        element.style.transition = activeTransition;
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      },
      { passive: true },
    );
  });
}

function setupMarquee() {
  const rowOne = document.getElementById("marquee-row-one");
  const rowTwo = document.getElementById("marquee-row-two");
  if (!rowOne || !rowTwo) return;

  fillMarquee(rowOne, marqueeImages.slice(0, 6));
  fillMarquee(rowTwo, marqueeImages.slice(6));
  window.addEventListener("scroll", updateMarquee, { passive: true });
  window.addEventListener("resize", updateMarquee, { passive: true });
  updateMarquee();
}

function fillMarquee(track, images) {
  const repeatedImages = [...images, ...images, ...images];
  track.innerHTML = repeatedImages
    .map(
      (src) => `
        <div class="marquee-tile">
          <img src="${src}" alt="" loading="lazy" />
        </div>
      `,
    )
    .join("");
}

function updateMarquee() {
  const section = document.querySelector(".marquee-section");
  const rowOne = document.getElementById("marquee-row-one");
  const rowTwo = document.getElementById("marquee-row-two");
  if (!section || !rowOne || !rowTwo) return;

  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
  rowOne.style.transform = `translate3d(${offset - 200}px, 0, 0)`;
  rowTwo.style.transform = `translate3d(${-1 * (offset - 200)}px, 0, 0)`;
}

function setupAnimatedText() {
  const paragraph = document.getElementById("about-text");
  if (!paragraph) return;

  const text = paragraph.textContent || "";
  paragraph.textContent = "";

  text.replace(/\s+/g, " ").trim().split("").forEach((char) => {
    const wrap = document.createElement("span");
    const placeholder = document.createElement("span");
    const real = document.createElement("span");
    const outputChar = char === " " ? "\u00a0" : char;

    wrap.className = "char-wrap";
    placeholder.className = "char-placeholder";
    real.className = "char-real";
    placeholder.textContent = outputChar;
    real.textContent = outputChar;
    wrap.append(placeholder, real);
    paragraph.append(wrap);
  });

  window.addEventListener("scroll", updateAnimatedText, { passive: true });
  window.addEventListener("resize", updateAnimatedText, { passive: true });
  updateAnimatedText();
}

function updateAnimatedText() {
  const paragraph = document.getElementById("about-text");
  if (!paragraph) return;

  const chars = paragraph.querySelectorAll(".char-real");
  const rect = paragraph.getBoundingClientRect();
  const start = window.innerHeight * 0.8;
  const end = window.innerHeight * 0.2;
  const progress = clamp((start - rect.top) / (start - end + rect.height), 0, 1);

  chars.forEach((char, index) => {
    const charStart = index / chars.length;
    const charEnd = (index + 8) / chars.length;
    const localProgress = clamp((progress - charStart) / (charEnd - charStart), 0, 1);
    char.style.opacity = `${0.2 + localProgress * 0.8}`;
  });
}

function setupProjectCards() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    card.style.top = `calc(clamp(1.25rem, 3vh, 2.5rem) + ${index * 16}px)`;
  });

  window.addEventListener("scroll", updateProjectCards, { passive: true });
  window.addEventListener("resize", updateProjectCards, { passive: true });
  updateProjectCards();
}

function updateProjectCards() {
  const cards = document.querySelectorAll(".project-card");
  const totalCards = cards.length;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const targetScale = 1 - (totalCards - 1 - index) * 0.03;
    const progress = clamp((window.innerHeight * 0.55 - rect.top) / window.innerHeight, 0, 1);
    const scale = 1 - (1 - targetScale) * progress;
    card.style.transform = `scale(${scale})`;
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
