import './style.css';
import { academyImages } from './data/academyImages';

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu Logic
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('#nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 1. Inject Images from Config
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    heroImg.src = '/assets/hero_ai.png';
  }

  const aboutImg = document.getElementById('about-img');
  if (aboutImg && academyImages.aboutAcademy) {
    aboutImg.src = academyImages.aboutAcademy;
  }

  const kidsImg1 = document.getElementById('kids-img-1');
  const kidsImg2 = document.getElementById('kids-img-2');
  const kidsImg3 = document.getElementById('kids-img-3');
  
  if (kidsImg1 && academyImages.kidsTraining[0]) kidsImg1.src = academyImages.kidsTraining[0];
  if (kidsImg2 && academyImages.kidsTraining[1]) kidsImg2.src = academyImages.kidsTraining[1];
  if (kidsImg3 && academyImages.kidsTraining[2]) kidsImg3.src = academyImages.kidsTraining[2];

  const achievementsMain = document.getElementById('achievements-main-img');
  if (achievementsMain && academyImages.achievements.main) {
    achievementsMain.src = academyImages.achievements.main;
  }

  const achievementsGallery = document.getElementById('achievements-gallery-container');
  if (achievementsGallery && academyImages.achievements.gallery) {
    academyImages.achievements.gallery.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Achievement";
      img.loading = "lazy";
      achievementsGallery.appendChild(img);
    });
  }

  const femalesBg = document.getElementById('females-img-bg');
  if (femalesBg && academyImages.femaleTraining) {
    femalesBg.style.backgroundImage = `url('${academyImages.femaleTraining}')`;
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
        lightbox.classList.add('active');
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
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
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    threshold: 0.15,
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
