/**
 * Acai Alaska - Main JavaScript
 * Optimized for performance and accessibility
 */

/**
 * Scroll navigation for menu sections
 * @param {HTMLElement} button - The button that was clicked
 */
function scrollSectionLeft(button) {
  const wrapper = button.closest('.scroll-wrapper');
  const scrollSection = wrapper.querySelector('.scroll-section');
  
  // Calculate a reasonable scroll distance based on the container width
  const scrollAmount = Math.min(scrollSection.clientWidth * 0.8, 600);
  
  scrollSection.scrollBy({ 
    left: -scrollAmount, 
    behavior: 'smooth' 
  });
  
  // Update arrow visibility after animation completes
  setTimeout(() => updateScrollArrows(wrapper), 300);
}

/**
 * Scroll right in a menu section
 * @param {HTMLElement} button - The button that was clicked
 */
function scrollSectionRight(button) {
  const wrapper = button.closest('.scroll-wrapper');
  const scrollSection = wrapper.querySelector('.scroll-section');
  
  // Calculate a reasonable scroll distance based on the container width
  const scrollAmount = Math.min(scrollSection.clientWidth * 0.8, 600);
  
  scrollSection.scrollBy({ 
    left: scrollAmount, 
    behavior: 'smooth' 
  });
  
  // Update arrow visibility after animation completes
  setTimeout(() => updateScrollArrows(wrapper), 300);
}

/**
 * Update the visibility of scroll arrows based on scroll position
 * @param {HTMLElement} wrapper - The scroll wrapper element
 */
function updateScrollArrows(wrapper) {
  const scrollSection = wrapper.querySelector('.scroll-section');
  const leftArrow = wrapper.querySelector('.scroll-arrow.left');
  const rightArrow = wrapper.querySelector('.scroll-arrow.right');
  
  if (!leftArrow || !rightArrow) return;

  const scrollLeft = scrollSection.scrollLeft;
  const scrollWidth = scrollSection.scrollWidth;
  const clientWidth = scrollSection.clientWidth;
  
  // Add a small buffer (1px) to handle rounding errors
  const atStart = scrollLeft <= 1;
  const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
  
  leftArrow.style.display = atStart ? 'none' : 'flex';
  rightArrow.style.display = atEnd ? 'none' : 'flex';
}

/**
 * Initialize all scroll wrappers
 */
function initializeScrollWrappers() {
  const wrappers = document.querySelectorAll('.scroll-wrapper.with-arrows');
  
  wrappers.forEach(wrapper => {
    const scrollSection = wrapper.querySelector('.scroll-section');
    
    if (scrollSection) {
      // Add scroll event listener with passive option for better performance
      scrollSection.addEventListener('scroll', () => {
        // Debounce the scroll event for better performance
        if (scrollSection.scrollTimeout) {
          clearTimeout(scrollSection.scrollTimeout);
        }
        
        scrollSection.scrollTimeout = setTimeout(() => {
          updateScrollArrows(wrapper);
        }, 100);
      }, { passive: true });
      
      // Initial check for arrows
      updateScrollArrows(wrapper);
    }
  });
  
  // Update arrows when window resizes
  window.addEventListener('resize', debounce(() => {
    wrappers.forEach(updateScrollArrows);
  }, 250));
}

/**
 * Toggle mobile menu with ARIA support
 */
function toggleMenu() {
  const mainNav = document.getElementById('mainNav');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (!mainNav || !menuToggle) return;
  
  const isExpanded = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isExpanded);
}

/**
 * Initialize accordion functionality with accessibility features
 */
function initializeAccordions() {
  const accordions = document.querySelectorAll(".accordion");
  
  accordions.forEach(button => {
    // Find the associated panel
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    
    if (!panel) return;
    
    // Set up click handler
    button.addEventListener("click", function() {
      // Toggle accordion state
      const isOpen = this.classList.toggle("active");
      panel.classList.toggle("open");
      
      // Update ARIA attributes
      this.setAttribute("aria-expanded", isOpen);
    });
  });
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Add intersection observer for lazy-loading images
 */
function setupImageLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // If the image has a data-src attribute, swap it
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
          }
          
          imgObserver.unobserve(img);
        }
      });
    });
    
    // Target all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Initialize all functionality when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollWrappers();
  initializeAccordions();
  setupImageLazyLoading();
  
  // Ensure menu is closed on window resize (to prevent hidden menu on desktop)
  window.addEventListener('resize', debounce(() => {
    const mainNav = document.getElementById('mainNav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth >= 768) {
      mainNav.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  }, 250));
});
