// Scroll buttons for horizontal menu or carousel
function scrollSectionLeft(button) {
    const wrapper = button.closest('.scroll-wrapper');
    const scrollSection = wrapper.querySelector('.scroll-section');
    scrollSection.scrollBy({ left: -300, behavior: 'smooth' });
  
    setTimeout(() => updateScrollArrows(wrapper), 300); // debounce for smooth behavior
  }
  
  function scrollSectionRight(button) {
    const wrapper = button.closest('.scroll-wrapper');
    const scrollSection = wrapper.querySelector('.scroll-section');
    scrollSection.scrollBy({ left: 300, behavior: 'smooth' });
  
    setTimeout(() => updateScrollArrows(wrapper), 300);
  }
  
  function updateScrollArrows(wrapper) {
    const scrollSection = wrapper.querySelector('.scroll-section');
    const leftArrow = wrapper.querySelector('.scroll-arrow.left');
    const rightArrow = wrapper.querySelector('.scroll-arrow.right');
  
    const scrollLeft = scrollSection.scrollLeft;
    const scrollWidth = scrollSection.scrollWidth;
    const clientWidth = scrollSection.clientWidth;
  
    const atStart = scrollLeft <= 0;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
  
    leftArrow.style.display = atStart ? 'none' : 'block';
    rightArrow.style.display = atEnd ? 'none' : 'block';
  }
  
  function initializeScrollWrappers() {
    const wrappers = document.querySelectorAll('.scroll-wrapper.with-arrows');
    wrappers.forEach(wrapper => {
      const scrollSection = wrapper.querySelector('.scroll-section');
      scrollSection.addEventListener('scroll', () => updateScrollArrows(wrapper));
      window.addEventListener('resize', () => updateScrollArrows(wrapper));
      updateScrollArrows(wrapper); // run on page load
    });
  }
  
  window.addEventListener('DOMContentLoaded', initializeScrollWrappers);
  
  // Mobile menu toggle
  function toggleMenu() {
    document.querySelector('.main-nav').classList.toggle('open');
  }
  
  // Accordion functionality with ARIA accessibility
  const acc = document.querySelectorAll(".accordion");
  acc.forEach(button => {
    const panel = button.nextElementSibling;
  
    // Create a unique ID if panel doesn't already have one
    const panelId = panel.id || `panel-${Math.random().toString(36).substr(2, 9)}`;
    panel.id = panelId;
  
    // Set initial ARIA attributes
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", panelId);
  
    // Toggle accordion state
    button.addEventListener("click", function () {
      const isOpen = this.classList.toggle("active");
      panel.classList.toggle("open");
  
      this.setAttribute("aria-expanded", isOpen.toString());
    });
  });