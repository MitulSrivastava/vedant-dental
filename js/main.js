// Intersection Observer for animations
const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  });

  // Observe elements
  document
    .querySelectorAll(
      ".service-card, .benefit-item, .about-image-wrapper, .transformation-card, .testimonial-card, .facility-card, .stat-card"
    )
    .forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
};

// Navbar scroll behavior
const handleNavbarScroll = () => {
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !navbar.classList.contains("scroll-down")
    ) {
      navbar.classList.remove("scroll-up");
      navbar.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      navbar.classList.contains("scroll-down")
    ) {
      navbar.classList.remove("scroll-down");
      navbar.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });
};

// FAQ Accordion
const initFAQ = () => {
  const faqButtons = document.querySelectorAll(".faq-button");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;
      const answer = faqItem.querySelector(".faq-answer");
      const icon = button.querySelector("i");

      // Toggle active class
      faqItem.classList.toggle("active");

      // Toggle icon
      if (faqItem.classList.contains("active")) {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
        answer.style.display = "block";
      } else {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
        answer.style.display = "none";
      }
    });
  });
};

// Smooth scroll for navigation links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};

// Before & After Slider
const initBeforeAfterSlider = () => {
  const sliders = document.querySelectorAll(".before-after-slider");

  sliders.forEach((slider) => {
    const img = slider.querySelector("img");
    let isSliding = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isSliding = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isSliding = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isSliding = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isSliding) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  });
};

// Testimonials Carousel
const initTestimonialsCarousel = () => {
  const testimonials = document.querySelectorAll(".testimonial-card");
  let currentIndex = 0;

  const showTestimonial = (index) => {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.opacity = i === index ? "1" : "0.5";
      testimonial.style.transform = i === index ? "scale(1.05)" : "scale(1)";
    });
  };

  // Auto-rotate testimonials
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);

  // Initial display
  showTestimonial(currentIndex);
};

// Enhanced Form Validation and Submission
const initForm = () => {
  const forms = document.querySelectorAll(".contact-form, .appointment-form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea");

    // Add floating labels
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Basic validation
      let isValid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (!isValid) {
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "alert alert-success mt-3";
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Thank you! We will contact you soon.';
        form.appendChild(successMessage);

        // Reset form
        form.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      } catch (error) {
        // Show error message
        const errorMessage = document.createElement("div");
        errorMessage.className = "alert alert-danger mt-3";
        errorMessage.innerHTML =
          '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
        form.appendChild(errorMessage);
      } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  });
};

// Stats Counter Animation
const initStatsCounter = () => {
  const stats = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const value = parseInt(target.textContent);
        let current = 0;
        const increment = value / 50; // Adjust speed
        const timer = setInterval(() => {
          current += increment;
          target.textContent = Math.floor(current) + "+";
          if (current >= value) {
            target.textContent = value + "+";
            clearInterval(timer);
          }
        }, 30);
        observer.unobserve(target);
      }
    });
  });

  stats.forEach((stat) => observer.observe(stat));
};

// Hero pattern parallax effect
const initParallax = () => {
  const hero = document.querySelector(".hero-section");
  if (hero) {
    hero.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      const pattern = hero.querySelector(".hero-image-bg");
      if (pattern) {
        pattern.style.transform = `translate(${x * 20}px, ${
          y * 20
        }px) scale(1.2)`;
      }
    });
  }
};

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  handleNavbarScroll();
  initFAQ();
  initSmoothScroll();
  initForm();
  initParallax();
  initBeforeAfterSlider();
  initTestimonialsCarousel();
  initStatsCounter();
});

// Add resize event listener for responsive adjustments
window.addEventListener("resize", () => {
  // Add any resize-specific logic here
});

// Parallax effect for hero pattern
document.addEventListener("mousemove", (e) => {
  const pattern = document.querySelector(".hero-pattern");
  if (pattern) {
    const speed = 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    pattern.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// Navbar background change on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "#fff";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "none";
  }
});

// Mobile menu toggle
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

if (navbarToggler && navbarCollapse) {
  navbarToggler.addEventListener("click", () => {
    navbarCollapse.classList.toggle("show");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navbarToggler.contains(e.target) &&
      !navbarCollapse.contains(e.target)
    ) {
      navbarCollapse.classList.remove("show");
    }
  });
}

// Initialize tooltips
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
