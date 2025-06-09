document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Initialize header state
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    }

    // Slider functionality
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        slider.appendChild(dotsContainer);
        
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        let slideInterval;
        
        // Initialize slider
        function initSlider() {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
            
            // Auto slide change
            slideInterval = setInterval(nextSlide, 6000);
        }
        
        // Show slide
        function showSlide(index) {
            // Reset all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show new slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Next slide
        function nextSlide() {
            let newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }
        
        // Previous slide
        function prevSlide() {
            let newIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        }
        
        // Event listeners for buttons
        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.dataset.index);
                showSlide(slideIndex);
                resetInterval();
            });
        });
        
        // Reset interval
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        }
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', resetInterval);
        
        initSlider();
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            const nameError = name.nextElementSibling;
            if (name.value.length < 5 || name.value.length > 128) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailError = email.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value) || email.value.length > 256) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Validate phone (optional)
            const phone = document.getElementById('phone');
            const phoneError = phone.nextElementSibling;
            if (phone.value && (phone.value.length < 7 || !/^[0-9+]+$/.test(phone.value))) {
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneError.style.display = 'none';
            }
            
            // Validate subject
            const subject = document.getElementById('subject');
            const subjectError = subject.nextElementSibling;
            if (subject.value.length < 3 || subject.value.length > 128) {
                subjectError.style.display = 'block';
                isValid = false;
            } else {
                subjectError.style.display = 'none';
            }
            
            // Validate message
            const message = document.getElementById('message');
            const messageError = message.nextElementSibling;
            if (message.value.length < 5) {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Here you would typically send the form data to the server
                // For demonstration, we'll show a success message
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Odosielam...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Úspešne odoslané!';
                    submitBtn.style.backgroundColor = '#4CAF50';
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.textContent = 'Odoslať správu';
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.style.display = 'none';
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .gallery-item, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature, .gallery-item, .about-image, .about-text');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Lazy loading for images
    const lazyLoadImages = function() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight + 200 && 
                img.getBoundingClientRect().bottom > -200 && 
                getComputedStyle(img).display !== 'none') {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.removeAttribute('loading');
            }
        });
    };
    
    // Use native lazy loading if supported
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Initial check
        lazyLoadImages();
        
        // Check on events
        document.addEventListener('scroll', lazyLoadImages);
        window.addEventListener('resize', lazyLoadImages);
        window.addEventListener('orientationchange', lazyLoadImages);
    }
    
});