// Enhanced Blog Site JavaScript with Advanced Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✨ Outstanding Blog Loaded Successfully! ✨', 'color: #ff2a6d; font-size: 16px; font-weight: bold;');
    
    // Enhanced mobile menu toggle with animation
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
            
            // Animate hamburger to X
            if (this.classList.contains('active')) {
                this.innerHTML = '✕';
                this.style.color = '#ff2a6d';
                this.style.transform = 'rotate(90deg)';
            } else {
                this.innerHTML = '☰';
                this.style.color = '#ffffff';
                this.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Enhanced header scroll effect with parallax
    let lastScrollTop = 0;
    const header = document.querySelector('.blog-header');
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = Math.min(scrollTop / (heroSection?.offsetHeight || 1000), 1);
        
        // Enhanced header effects
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
        
        // Smooth hide/show based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-120%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Enhanced smooth scrolling with offset for fixed header
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (window.innerWidth <= 768 && navMenu) {
                    navMenu.classList.remove('show');
                    menuToggle.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.style.color = '#ffffff';
                    menuToggle.style.transform = 'rotate(0deg)';
                }
                
                // Add visual feedback
                createClickEffect(this);
            }
        });
    });
    
    // Enhanced form submission with validation
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                handleSubmit(this, '🚀 Message sent successfully! We\'ll contact you soon.', 'success');
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (validateEmail(emailInput.value)) {
                handleSubmit(this, '🎉 Successfully subscribed to our newsletter!', 'success');
            } else {
                showMessage('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Enhanced card hover effects with 3D transforms
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-25px) scale(1.05) rotateX(5deg)';
            this.style.boxShadow = `
                0 40px 80px rgba(0, 0, 0, 0.6),
                0 0 60px rgba(255, 42, 109, 0.5),
                0 0 120px rgba(5, 217, 232, 0.4)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = `
                0 20px 50px rgba(0, 0, 0, 0.4),
                0 0 30px rgba(255, 42, 109, 0.2)
            `;
        });
        
        // Add subtle tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                translateY(-25px) 
                scale(1.05) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });
    });
    
    // Advanced Intersection Observer for staggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.filter = 'blur(0)';
                }, index * 150); // Staggered entrance
            }
        });
    }, observerOptions);
    
    // Observe elements with enhanced animation
    const animateElements = document.querySelectorAll('.blog-card, .section-title, .stat-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.filter = 'blur(5px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    // Dynamic year and enhanced footer
    const currentYear = new Date().getFullYear();
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        footerBottom.innerHTML = `
            © ${currentYear} <span style="color: #ff2a6d; font-weight: bold;">DDX Studio</span>. 
            <span style="color: #05d9e8;">All rights reserved.</span>
        `;
    }
    
    // Enhanced button effects with multiple animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
            createShockwave(e, this);
            addTemporaryClass(this, 'clicked', 300);
        });
        
        // Hover glow effect
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = `
                ${this.style.boxShadow},
                0 0 30px rgba(255, 42, 109, 0.6)
            `;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = this.style.boxShadow.replace(/,\s*0 0 30px rgba\(255, 42, 109, 0\.6\)/, '');
        });
    });
    
    // Add floating particles effect to background
    createFloatingParticles();
    
    // Enhanced scroll progress indicator
    createScrollIndicator();
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent, 50);
    }
    
    console.log('%c✨ All animations and effects initialized! ✨', 'color: #05d9e8; font-size: 14px;');
});

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff2a6d';
            input.style.boxShadow = '0 0 15px rgba(255, 42, 109, 0.5)';
            setTimeout(() => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }, 2000);
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            showMessage('Please enter a valid email address', 'error');
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced form submission handler
function handleSubmit(form, successMessage, type = 'success') {
    // Simulate API call
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Loading state
    submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Success state
        showMessage(successMessage, type);
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Add success animation
        form.style.transform = 'scale(1.02)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 300);
    }, 1500);
}

// Enhanced message system
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `enhanced-message message-${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${getMessageIcon(type)}</span>
            <span class="message-text">${message}</span>
        </div>
        <button class="message-close">×</button>
    `;
    
    // Enhanced styling
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '30px',
        right: '30px',
        padding: '20px 25px',
        borderRadius: '15px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        transform: 'translateX(150%)',
        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '15px'
    });
    
    // Set background based on type
    const backgrounds = {
        success: 'linear-gradient(45deg, #00b09b, #96c93d)',
        error: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
        info: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        warning: 'linear-gradient(45deg, #FFA500, #FF8C00)'
    };
    
    messageEl.style.background = backgrounds[type] || backgrounds.info;
    
    // Add to document
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove or manual close
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.addEventListener('click', () => removeMessage(messageEl));
    
    setTimeout(() => {
        removeMessage(messageEl);
    }, 5000);
}

function removeMessage(element) {
    element.style.transform = 'translateX(150%) scale(0.8)';
    element.style.opacity = '0';
    setTimeout(() => {
        if (element.parentNode) {
            document.body.removeChild(element);
        }
    }, 500);
}

function getMessageIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    return icons[type] || icons.info;
}

// Enhanced ripple effect
function createRipple(event, button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('enhanced-ripple');
    
    // Enhanced ripple styling
    Object.assign(circle.style, {
        position: 'absolute',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'enhancedRipple 0.8s linear',
        background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)',
        pointerEvents: 'none'
    });
    
    // Add ripple animation to CSS if not exists
    if (!document.querySelector('#enhanced-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'enhanced-ripple-style';
        style.textContent = `
            @keyframes enhancedRipple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                70% {
                    transform: scale(2.5);
                    opacity: 0.7;
                }
                100% {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const ripple = button.getElementsByClassName('enhanced-ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
    
    // Remove after animation
    setTimeout(() => {
        if (circle.parentNode) {
            circle.remove();
        }
    }, 800);
}

// Shockwave effect
function createShockwave(event, element) {
    const shockwave = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    Object.assign(shockwave.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        border: '2px solid rgba(255, 42, 109, 0.8)',
        animation: 'shockwave 0.6s ease-out forwards',
        pointerEvents: 'none',
        zIndex: '1'
    });
    
    if (!document.querySelector('#shockwave-style')) {
        const style = document.createElement('style');
        style.id = 'shockwave-style';
        style.textContent = `
            @keyframes shockwave {
                0% {
                    transform: scale(0.8);
                    opacity: 1;
                }
                100% {
                    transform: scale(1.3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(shockwave);
    
    setTimeout(() => {
        if (shockwave.parentNode) {
            shockwave.remove();
        }
    }, 600);
}

// Utility functions
function addTemporaryClass(element, className, duration) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

function createClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
}

// Floating particles background effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    
    Object.assign(particleContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '-1',
        overflow: 'hidden'
    });
    
    document.body.appendChild(particleContainer);
    
    // Create 30 floating particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 2;
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.1})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatParticle ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
        });
        
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation CSS
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll progress indicator
function createScrollIndicator() {
    const progressContainer = document.createElement('div');
    const progressBar = document.createElement('div');
    
    Object.assign(progressContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: '9999',
        backdropFilter: 'blur(5px)'
    });
    
    Object.assign(progressBar.style, {
        height: '100%',
        width: '0%',
        background: 'linear-gradient(90deg, #ff2a6d, #05d9e8, #ffd700)',
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 10px rgba(255, 42, 109, 0.5)'
    });
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}

// Typewriter effect for hero title
function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500);
}

// Enhanced window resize handler
window.addEventListener('resize', function() {
    // Enhanced mobile menu handling
    const navMenu = document.querySelector('.main-nav ul');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('show');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '☰';
            menuToggle.style.color = '#ffffff';
            menuToggle.style.transform = 'rotate(0deg)';
        }
    }
    
    // Reinitialize any responsive-dependent features
    debounce(() => {
        console.log('Window resized - reinitializing features');
    }, 250)();
});

// Enhanced debounce function
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

// Performance monitoring
console.log('%c⚡ Performance Monitoring Active ⚡', 'color: #00ff00; background: #000; padding: 5px;');
