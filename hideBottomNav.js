document.addEventListener("DOMContentLoaded", function () {
  const bottomNav = document.getElementById("bottomNav");
  const heroSection = document.getElementById("heroSection");
  const windowWidth = window.innerWidth;

  // Function to check the visibility of the hero section
  function checkHeroVisibility() {
    const heroRect = heroSection.getBoundingClientRect();

    // Check if the screen width is greater than 1024px (desktop/laptop)
    if (windowWidth > 1024) {
      // Hide bottom-nav by default for desktop/laptop
      bottomNav.style.display = "none";
    }
    // Check if the screen width is between 768px and 1024px (tablet)
    else if (windowWidth > 768 && windowWidth <= 1024) {
      // Hide bottom-nav by default for tablet, or toggle visibility based on hero section
      if (heroRect.top <= 0 && heroRect.bottom >= 0) {
        bottomNav.style.display = "none";
      } else {
        bottomNav.style.display = "block";
      }
    }
    // For mobile devices (width <= 768px)
    else {
      // Check if the hero section is in the viewport on mobile
      if (heroRect.top <= 0 && heroRect.bottom >= 0) {
        bottomNav.style.display = "none"; // Hide bottom-nav when the hero section is in view on mobile
      } else {
        bottomNav.style.display = "block"; // Show bottom-nav when the hero section is not in view on mobile
      }
    }
  }

  // Run the function when the page is scrolled
  window.addEventListener("scroll", checkHeroVisibility);

  // Initial check when the page loads
  checkHeroVisibility();
});
