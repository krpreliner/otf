import './style.css';
import { academyImages } from './data/academyImages';

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu Logic
  const hamburger = document.getElementById('hamburger');
  const desktopNav = document.querySelector('.desktop-nav');
  
  if (hamburger && desktopNav) {
    hamburger.addEventListener('click', () => {
      // Toggle a mobile-active class that we will add to CSS
      desktopNav.classList.toggle('mobile-active');
    });

    document.querySelectorAll('.desktop-nav a').forEach(link => {
      link.addEventListener('click', () => {
        desktopNav.classList.remove('mobile-active');
      });
    });
  }

  // 2. Render Masonry Gallery
  const masonryGallery = document.getElementById('masonry-gallery');
  const renderGallery = (filter = 'ALL') => {
    if (!masonryGallery) return;
    masonryGallery.innerHTML = '';
    
    academyImages.gallery.forEach(item => {
      if (filter === 'ALL' || item.category === filter) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';
        itemDiv.dataset.src = item.src;
        
        itemDiv.innerHTML = `
          <img src="${item.src}" alt="${item.category}" loading="lazy" />
          <div class="gallery-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        `;
        masonryGallery.appendChild(itemDiv);
      }
    });

    // Re-attach lightbox listeners
    attachLightboxListeners();
  };

  renderGallery();

  // 3. Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderGallery(e.target.dataset.filter);
    });
  });

  // 4. Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  function attachLightboxListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightbox.style.display = 'flex';
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // 5. Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 7. Scroll Reveal Animation (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-up');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Trigger reveal for elements already in viewport on load
  setTimeout(() => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);

  // 8. Form Submission Handling
  const form = document.getElementById('demo-form');
  const successMsg = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate form submission
      const btn = form.querySelector('button');
      const originalText = btn.innerText;
      btn.innerText = 'SENDING...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        form.reset();
        successMsg.classList.remove('hidden');
        
        setTimeout(() => {
          successMsg.classList.add('hidden');
        }, 5000);
      }, 1500);
    });
  }
});
