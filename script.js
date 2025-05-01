/**
 * Acai of Alaska - Main JavaScript
 * Optimized for performance and accessibility
 */



/**
 * Update the visibility of scroll arrows based on scroll position
 * @param {HTMLElement} wrapper - The scroll wrapper element
 */
function updateScrollArrows(wrapper) {
  // Function kept for backward compatibility, but arrows are removed from HTML
  return;
}

/**
 * Initialize all scroll wrappers
 */
function initializeScrollWrappers() {
  // Function retained for backward compatibility
  // No scroll arrows are used anymore
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
 * Menu item details for modal popups
 */
const menuItems = {
  // Signature Bowls
  "Mauna Kea": {
    description: "Our premier acai bowl inspired by the tallest mountain in Hawaii.",
    details: `<p>Topped with all fresh fruit, macadamia nuts, walnuts, almonds, chocolate-covered almonds, granola with flax & pumpkin seeds, coconut shavings, goji berries, hemp, and flax seeds.</p>
              <p>A nutrient-dense powerhouse that delivers antioxidants, healthy fats, and sustained energy to fuel your day.</p>`,
    nutrition: "Rich in antioxidants, healthy omega-3 fatty acids, and protein."
  },
  "Ono": {
    description: "'Delicious' in Hawaiian - and that's exactly what this bowl is.",
    details: `<p>Topped with all fresh fruit, macadamia nuts, walnuts, almonds, chocolate-covered almonds, granola with raisins & almonds, and coconut shavings.</p>
              <p>A beautiful balance of flavors and textures that delivers both nutrition and satisfaction.</p>`,
    nutrition: "Great source of fiber, healthy fats, and natural energy."
  },
  "Maui Waui": {
    description: "A tropical flavor sensation inspired by the Valley Isle.",
    details: `<p>Topped with bananas, blueberries, strawberries, macadamia nuts, walnuts, almonds, chocolate-covered almonds, granola with raisins & almonds, and coconut shavings.</p>
              <p>A blend of island-inspired flavors that transport you to the beaches of Maui with every spoonful.</p>`,
    nutrition: "High in vitamin C, antioxidants, and heart-healthy nuts."
  },
  "Tiger Shark": {
    description: "Bold and beautiful - this bowl has serious bite!",
    details: `<p>Topped with blackberries, kiwi, raspberries, walnuts, almonds, goji berries, pumpkin & sunflower seeds, bee pollen, chia, and flax & hemp seeds.</p>
              <p>Named for its striking appearance and powerful nutritional profile. A favorite among our health-conscious customers.</p>`,
    nutrition: "Packed with omega-3s, plant protein, and over 20 vitamins and minerals."
  },
  "Mofo": {
    description: "A bold, adventurous blend for those who want it all.",
    details: `<p>Topped with blackberries, kiwi, raspberries, walnuts, almonds, goji berries, pumpkin & sunflower seeds, bee pollen, chia, and flax & hemp seeds.</p>
              <p>A true superfood explosion with a perfect balance of sweet and tart flavors.</p>`,
    nutrition: "Excellent source of antioxidants, healthy fats, and micronutrients."
  },
  "Lava Flow": {
    description: "Sweet and vibrant like the volcanic landscapes of Hawaii.",
    details: `<p>Topped with strawberries, chocolate-covered açaí & blueberry, coconut shavings, goji berries, and chia seeds.</p>
              <p>A beautiful contrast of rich flavors and bright berries - this bowl is as visually stunning as it is delicious.</p>`,
    nutrition: "High in antioxidants, fiber, and essential fatty acids."
  },
  "Purple Tide": {
    description: "A refreshing wave of antioxidant-rich goodness.",
    details: `<p>Topped with kiwi, granola with flax & pumpkin seeds, goji berries, and bee pollen.</p>
              <p>A lighter option that still delivers maximum nutrition and flavor with every bite.</p>`,
    nutrition: "Good source of vitamin C, amino acids, and plant enzymes."
  },
  "Bonsai": {
    description: "Carefully crafted and perfectly balanced, like its namesake.",
    details: `<p>Topped with kiwi, chocolate-covered açaí & blueberry, macadamia nuts, and spirulina.</p>
              <p>A harmonious blend of sweet and earthy flavors with the added benefits of blue-green algae.</p>`,
    nutrition: "Contains complete protein, chlorophyll, and trace minerals."
  },
  "Reef": {
    description: "A tropical paradise in a bowl.",
    details: `<p>Topped with bananas, granola with raisins & almonds, coconut shavings, and spirulina.</p>
              <p>The addition of spirulina gives this bowl a unique nutritional boost and subtle complexity.</p>`,
    nutrition: "Rich in B vitamins, iron, and plant-based protein."
  },
  "Pipeline": {
    description: "A simple yet powerful wave of nutrition.",
    details: `<p>Topped with bananas, granola with flax & pumpkin seeds, and hemp & flax seeds.</p>
              <p>Named after the famous Hawaiian surf break, this bowl delivers clean energy and nutrition without overwhelming the palate.</p>`,
    nutrition: "Excellent source of essential fatty acids and digestive fiber."
  },
  
  // Smoothies
  "Arctic PB&J": {
    description: "A creamy, nostalgic blend that takes you back to childhood.",
    details: `<p>Our original acai blend swirled with our Nutty Heaven blend for a perfect balance of fruit and nut flavors.</p>
              <p>The perfect post-workout smoothie with a balance of healthy carbs and protein.</p>`,
    nutrition: "Good source of plant protein and healthy fats."
  },
  "Fireweed": {
    description: "Vibrant and bold like the Alaskan wildflower.",
    details: `<p>Our original acai smoothie blend topped with acerola and goji berries for an extra antioxidant boost.</p>
              <p>Named after Alaska's iconic magenta wildflower, this smoothie is as beautiful as it is beneficial.</p>`,
    nutrition: "High in vitamin C and immune-supporting compounds."
  },
  "Forget Me Not": {
    description: "A memorable blend featuring Alaska's state flower.",
    details: `<p>Our original acai blend topped with blueberries and chia seeds.</p>
              <p>A brain-boosting combination that supports cognitive function and provides sustained energy.</p>`,
    nutrition: "Rich in anthocyanins and omega-3 fatty acids."
  },
  "Sleeping Lady": {
    description: "Smooth and tranquil like the mountain near Anchorage.",
    details: `<p>Our original acai blend topped with mango and coconut shavings for a tropical twist.</p>
              <p>A soothing, tropical smoothie that brings paradise to the Last Frontier.</p>`,
    nutrition: "Good source of digestive enzymes and medium-chain triglycerides."
  },
  
  // Fresh Eats
  "Grilled Cheese": {
    description: "The ultimate comfort food, elevated.",
    details: `<p>Made with local artisanal bread and premium cheese, grilled to golden perfection.</p>
              <p>Simple, satisfying, and the perfect complement to any acai bowl or smoothie.</p>`,
    nutrition: "Good source of calcium and protein."
  },
  "Grilled Ham & Cheese": {
    description: "A heartier version of our grilled cheese classic.",
    details: `<p>Our delicious grilled cheese sandwich with added premium ham on hearty organic bread.</p>
              <p>A more substantial option when you need something a bit more filling.</p>`,
    nutrition: "High in protein and calcium."
  },
  "Italian Soda": {
    description: "Refreshing, bubbly, and customizable.",
    details: `<p>Sparkling water mixed with your choice of premium fruit syrups and a splash of cream.</p>
              <p>Available in various flavor combinations - ask about our seasonal specials!</p>`,
    nutrition: "A lighter alternative to traditional sodas."
  },
  "Hot Coffee": {
    description: "Locally roasted, always fresh.",
    details: `<p>We proudly serve locally roasted coffee from Alaskan roasters, brewed fresh throughout the day.</p>
              <p>Available black or with your choice of milk, including non-dairy options.</p>`,
    nutrition: "Rich in antioxidants and naturally energizing."
  }
};

/**
 * Open the menu item modal with details
 * @param {string} title - The title of the menu item
 * @param {string} imgSrc - The image source URL
 * @param {string} imgAlt - The image alt text
 */
function openMenuItemModal(title, imgSrc, imgAlt) {
  const modal = document.getElementById('menuModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalDetails = document.getElementById('modalDetails');
  
  if (!modal || !menuItems[title]) return;
  
  // Set modal content
  modalImage.src = imgSrc;
  modalImage.alt = imgAlt;
  modalTitle.textContent = title;
  
  const item = menuItems[title];
  modalDescription.textContent = item.description || '';
  
  let detailsHTML = '';
  if (item.details) {
    detailsHTML += item.details;
  }
  if (item.nutrition) {
    detailsHTML += `<p><strong>Nutrition:</strong> ${item.nutrition}</p>`;
  }
  
  modalDetails.innerHTML = detailsHTML;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Set focus to the close button for accessibility
  setTimeout(() => {
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
  }, 100);
}

/**
 * Close the menu item modal
 */
function closeModal() {
  const modal = document.getElementById('menuModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restore background scrolling
}

/**
 * Initialize the menu cards to be clickable
 */
function initializeMenuCards() {
  const menuCards = document.querySelectorAll('.menu-card');
  
  menuCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h3').textContent;
      const img = this.querySelector('img');
      const imgSrc = img.src;
      const imgAlt = img.alt;
      
      openMenuItemModal(title, imgSrc, imgAlt);
    });
    
    // Add keyboard support
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Handle clicks outside modal to close it
  window.addEventListener('click', function(e) {
    const modal = document.getElementById('menuModal');
    if (modal && e.target === modal) {
      closeModal();
    }
  });
  
  // Add escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/**
 * Open the delivery options modal
 * @param {Event} event - The click event
 */
function openDeliveryModal(event) {
  if (event) event.preventDefault();
  
  const modal = document.getElementById('deliveryModal');
  if (!modal) return;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Set focus to the close button for accessibility
  setTimeout(() => {
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
  }, 100);
}

/**
 * Close the delivery options modal
 */
function closeDeliveryModal() {
  const modal = document.getElementById('deliveryModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
  
  // Return focus to the element that opened the modal for accessibility
  const orderButton = document.querySelector('.order-now');
  if (orderButton) orderButton.focus();
}

document.addEventListener('DOMContentLoaded', function() {
  initializeAccordions();
  setupImageLazyLoading();
  initializeMenuCards();
  
  // Close modals with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
      closeDeliveryModal();
    }
  });
  
  // Handle clicks outside delivery modal to close it
  window.addEventListener('click', function(e) {
    const deliveryModal = document.getElementById('deliveryModal');
    if (deliveryModal && e.target === deliveryModal) {
      closeDeliveryModal();
    }
  });
  
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
