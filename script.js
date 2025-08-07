document.addEventListener('DOMContentLoaded', function() {
  // Header scroll behavior
  const header = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // reCAPTCHA handling
  window.enableSubmit = function() {
    document.querySelector('.submit-btn').disabled = false;
  };

  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !phone || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the form data to your server
      console.log('Form submitted:', { name, email, phone, message });
      
      // Show success message
      alert('Thank you for your message! We will contact you soon.');
      
      // Reset form
      this.reset();
      document.querySelector('.submit-btn').disabled = true;
      
      // Reset reCAPTCHA
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
      }
    });
  }

  // Hero background animation
  const heroBg = document.querySelector('.hero-bg');
  let scaleDirection = 1;
  
  function animateHeroBg() {
    const currentScale = parseFloat(getComputedStyle(heroBg).transform.split(',')[3]) || 1;
    
    if (currentScale >= 1.1) scaleDirection = -1;
    if (currentScale <= 1) scaleDirection = 1;
    
    const newScale = currentScale + (0.001 * scaleDirection);
    heroBg.style.transform = `scale(${newScale})`;
    
    requestAnimationFrame(animateHeroBg);
  }
  
  // Start the animation
  setTimeout(() => {
    heroBg.style.transition = 'transform 0.1s linear';
    animateHeroBg();
  }, 1000);

  // Add animation to cards when they come into view
  const animateOnScroll = function() {
    const cards = document.querySelectorAll('.card, .reason-card');
    
    cards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (cardPosition < screenPosition) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  const cards = document.querySelectorAll('.card, .reason-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
  });

  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});
