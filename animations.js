document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations that should run on page load
  window.scrollTo(0, 0);
  initializeCounters();
  initializeScrollAnimations();
  addClassActive();
});

// Function to animate counting for stat numbers
function initializeCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((number) => {
    const target = parseInt(number.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const step = Math.ceil(target / (duration / 50)); // Update every 50ms
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        number.textContent = "+" + target;
        clearInterval(counter);
      } else {
        number.textContent = "+" + current;
      }
    }, 50);
  });
}

// Function to handle scroll-based animations
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1, 
      rootMargin: "0px 0px -50px 0px", 
    }
  );

  // Start observing each element
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}
// Add class active
function addClassActive() {
  const navIcons = document.querySelectorAll(".nav-icon");
  if (navIcons.length > 0) {
    navIcons[0].classList.add("active");
}

navIcons.forEach(icon => {
    icon.addEventListener("click", function () {
        navIcons.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
    });
});
}
