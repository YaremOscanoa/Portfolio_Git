// Portfolio JavaScript
console.log('Portfolio.js script loaded successfully!');
console.log('Current time:', new Date().toLocaleTimeString());

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Form Elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const charCount = document.getElementById('charCount');

// Mobile Navigation Toggle with Enhanced Animation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .contact-info, .contact-form');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});


// Enhanced Contact Form Validation
let formValidation = {
    name: false,
    email: false,
    message: false
};

// Real-time validation functions
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    return nameRegex.test(name.trim());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateMessage(message) {
    return message.trim().length >= 10 && message.trim().length <= 500;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const successElement = document.getElementById(fieldId + 'Success');
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    successElement.classList.remove('show');
}

function showFieldSuccess(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const successElement = document.getElementById(fieldId + 'Success');
    
    errorElement.classList.remove('show');
    successElement.classList.add('show');
}

function updateCharCounter() {
    const count = messageInput.value.length;
    charCount.textContent = count;
    
    const counterElement = charCount.parentElement;
    counterElement.classList.remove('warning', 'error');
    
    if (count > 450) {
        counterElement.classList.add('error');
    } else if (count > 400) {
        counterElement.classList.add('warning');
    }
}

// Real-time validation event listeners
nameInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (validateName(value)) {
        showFieldSuccess('name');
        formValidation.name = true;
    } else if (value.length > 0) {
        showFieldError('name', 'Name must be 2-30 characters and contain only letters');
        formValidation.name = false;
    } else {
        document.getElementById('nameError').classList.remove('show');
        document.getElementById('nameSuccess').classList.remove('show');
        formValidation.name = false;
    }
});

emailInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (validateEmail(value)) {
        showFieldSuccess('email');
        formValidation.email = true;
    } else if (value.length > 0) {
        showFieldError('email', 'Please enter a valid email address');
        formValidation.email = false;
    } else {
        document.getElementById('emailError').classList.remove('show');
        document.getElementById('emailSuccess').classList.remove('show');
        formValidation.email = false;
    }
});

messageInput.addEventListener('input', (e) => {
    const value = e.target.value;
    updateCharCounter();
    
    if (validateMessage(value)) {
        showFieldSuccess('message');
        formValidation.message = true;
    } else if (value.length > 0) {
        if (value.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
        } else {
            showFieldError('message', 'Message must be less than 500 characters');
        }
        formValidation.message = false;
    } else {
        document.getElementById('messageError').classList.remove('show');
        document.getElementById('messageSuccess').classList.remove('show');
        formValidation.message = false;
    }
});

// Contact Form Submission with Enhanced Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Check all validations
    if (!formValidation.name) {
        showFieldError('name', 'Please enter a valid name');
        nameInput.focus();
        return;
    }
    
    if (!formValidation.email) {
        showFieldError('email', 'Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    if (!formValidation.message) {
        showFieldError('message', 'Please enter a message between 10-500 characters');
        messageInput.focus();
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    showNotification('Sending message...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Reset form state
        Object.keys(formValidation).forEach(key => {
            formValidation[key] = false;
            document.getElementById(key + 'Error').classList.remove('show');
            document.getElementById(key + 'Success').classList.remove('show');
        });
        
        updateCharCounter();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'info':
            notification.style.backgroundColor = '#3b82f6';
            break;
        default:
            notification.style.backgroundColor = '#6b7280';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Advanced Animations and Effects

// Parallax scrolling effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroImage && heroContent) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
        
        // Fade out hero content on scroll
        const opacity = Math.max(0, 1 - scrolled / window.innerHeight);
        heroContent.style.opacity = opacity;
    }
});

// Enhanced typing effect with cursor
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '<span class="typing-cursor">|</span>';
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.innerHTML = text;
            }, 1000);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Small delay to let other animations start
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Add CSS for typing cursor
const style = document.createElement('style');
style.textContent = `
    .typing-cursor {
        animation: blink 1s infinite;
        color: var(--primary-color);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Magnetic effect for buttons
function addMagneticEffect(button) {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
}

// Apply magnetic effect to all buttons
document.querySelectorAll('.btn, .carousel-btn, .project-link').forEach(addMagneticEffect);

// Staggered animation for skill cards
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
}

// Enhanced scroll animations with intersection observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special handling for skill cards
            if (entry.target.classList.contains('skills')) {
                animateSkillCards();
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    animationObserver.observe(section);
});

// Floating animation for hero image
function addFloatingAnimation() {
    const heroImage = document.querySelector('.image-placeholder');
    if (heroImage) {
        heroImage.style.animation = 'float 3s ease-in-out infinite';
    }
}

// Add floating keyframes
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(floatingStyle);

// Initialize floating animation
addFloatingAnimation();

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    hero.appendChild(particleContainer);
}

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Hover effects for tech tags
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
    });
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Smooth reveal animation for section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.classList.add('fade-in');
    observer.observe(title);
});

// Skill cards hover effect enhancement
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards click effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add a subtle click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

// Add smooth reveal animation to section titles (duplicate removed)

// Lazy loading for project images (if real images were used)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== CAROUSEL FUNCTIONALITY =====

class Carousel {
    constructor(trackId, prevBtnId, nextBtnId, dotsId) {
        this.track = document.getElementById(trackId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.dots = document.getElementById(dotsId);
        this.slides = this.track ? this.track.children : [];
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        
        console.log('Carousel initialized:', {
            track: this.track,
            prevBtn: this.prevBtn,
            nextBtn: this.nextBtn,
            dots: this.dots,
            totalSlides: this.totalSlides
        });
        
        this.init();
    }
    
    init() {
        if (!this.track || !this.prevBtn || !this.nextBtn) {
            console.error('Carousel elements not found:', {
                track: !!this.track,
                prevBtn: !!this.prevBtn,
                nextBtn: !!this.nextBtn
            });
            return;
        }
        
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoPlay();
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous button clicked, current slide:', this.currentSlide);
            this.prevSlide();
        });
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked, current slide:', this.currentSlide);
            this.nextSlide();
        });
        
        // Dot navigation
        if (this.dots) {
            this.dots.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    const slideIndex = parseInt(e.target.dataset.slide);
                    this.goToSlide(slideIndex);
                }
            });
        }
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.container.matches(':hover')) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let threshold = 50;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            distX = e.touches[0].clientX - startX;
            distY = e.touches[0].clientY - startY;
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                if (distX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
            
            startX = 0;
            startY = 0;
            distX = 0;
            distY = 0;
        });
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isAnimating = true;
        
        // Update track position
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        this.updateDots();
        
        // Update button states
        this.updateButtons();
        
        // Add slide transition effect
        this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    updateDots() {
        if (!this.dots) return;
        
        const dotElements = this.dots.querySelectorAll('.dot');
        dotElements.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    updateButtons() {
        // Buttons are always enabled for infinite loop
        this.prevBtn.style.opacity = '1';
        this.nextBtn.style.opacity = '1';
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Auto-advance every 5 seconds
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    destroy() {
        this.stopAutoPlay();
        // Remove event listeners if needed
    }
}

// Simple carousel implementation
function initSimpleCarousel(trackId, prevId, nextId, dotsId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dots = document.getElementById(dotsId);
    
    console.log('Initializing carousel:', {
        trackId,
        track: track,
        prevBtn: prevBtn,
        nextBtn: nextBtn,
        dots: dots
    });
    
    if (!track || !prevBtn || !nextBtn) {
        console.error('Carousel elements not found for', trackId, {
            track: !!track,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });
        return null;
    }
    
    let currentSlide = 0;
    const slides = track.children;
    const totalSlides = slides.length;
    
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        console.log('Updating carousel:', {
            currentSlide,
            translateX,
            totalSlides
        });
        
        // Update dots
        if (dots) {
            const dotElements = dots.querySelectorAll('.dot');
            dotElements.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Previous clicked');
        prevSlide();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Next clicked');
        nextSlide();
    });
    
    if (dots) {
        dots.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const slideIndex = parseInt(e.target.dataset.slide);
                goToSlide(slideIndex);
            }
        });
    }
    
    // Initialize
    updateCarousel();
    
    return {
        nextSlide,
        prevSlide,
        goToSlide
    };
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing carousels...');
    console.log('DOMContentLoaded event fired!');
    
    // Wait a bit to ensure all elements are rendered
    setTimeout(() => {
        // Skills section is now a static grid - no carousel needed
        
        // Interests Carousel
        const interestsCarousel = initSimpleCarousel(
            'interestsCarousel',
            'interestsPrev',
            'interestsNext',
            'interestsDots'
        );
        
        console.log('Carousels initialized:', { interestsCarousel });
    }, 100);
});