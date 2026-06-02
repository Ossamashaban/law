// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            message: this.querySelector('textarea').value
        };
        
        // Validate form
        if (formData.name && formData.email && formData.message) {
            // Show success message
            alert('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.');
            
            // Reset form
            this.reset();
        } else {
            alert('الرجاء ملء جميع الحقول المطلوبة');
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and timeline items
document.querySelectorAll('.service-card, .stat-card, .timeline-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Floating stars animation
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

// Call star creation on load
window.addEventListener('load', createStars);

// Add active state to navigation links
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section && section.offsetTop <= window.pageYOffset + 100) {
            current = link.getAttribute('href');
        }
    });
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === current) {
            link.style.color = 'var(--secondary)';
        } else {
            link.style.color = 'white';
        }
    });
});

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Add parallax effect to hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });
}

// Counter animation for stats
function animateCounters() {
    const statCards = document.querySelectorAll('.stat-card h4');
    
    const observerForCounters = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                let currentValue = 0;
                const isPercentage = finalValue.includes('%');
                const isNumber = parseInt(finalValue);
                const increment = isNumber / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= isNumber) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                        observerForCounters.unobserve(target);
                    } else {
                        target.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '+');
                    }
                }, 20);
            }
        });
    }, observerOptions);
    
    statCards.forEach(card => observerForCounters.observe(card));
}

window.addEventListener('load', animateCounters);

// Add ripple effect on button click
function addRippleEffect(e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (e.clientX - button.offsetLeft - radius) + 'px';
    circle.style.top = (e.clientY - button.offsetTop - radius) + 'px';
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) ripple.remove();
    
    button.appendChild(circle);
}

document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
    button.addEventListener('click', addRippleEffect);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu && navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    }
});

console.log('✅ الموقع جاهز - Law Office Website Loaded');