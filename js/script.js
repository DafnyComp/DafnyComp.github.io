// DafnyComp - Interactive JavaScript Features

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeInteractiveElements();
    initializeScrollEffects();
    // initializeTypewriter();
    initializeParticleSystem();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Close nav when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

// Animation effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.stat-card, .failure-mode, .observation, .download-card, .implication, .stage');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animations for statistics
    const counters = document.querySelectorAll('.stat-number, .percentage, .multiplier');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate numbers/counters
function animateCounter(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));

    if (isNaN(number)) return;

    const duration = 2000;
    const startTime = performance.now();
    const suffix = text.replace(number.toString(), '');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = number * easeOutQuart;

        if (number % 1 === 0) {
            element.textContent = Math.round(current) + suffix;
        } else {
            element.textContent = current.toFixed(1) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Interactive elements
function initializeInteractiveElements() {
    // Performance chart bars animation
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        if (bar.classList.contains('syntax')) {
            bar.style.setProperty('--bar-height', '99%');
        } else if (bar.classList.contains('verification')) {
            bar.style.setProperty('--bar-height', '7%');
        }
    });

    // Hover effects for cards
    const cards = document.querySelectorAll('.stat-card, .download-card, .failure-mode, .observation, .implication');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Model family icons
    const familyIcons = document.querySelectorAll('.family-icon');
    familyIcons.forEach(icon => {
        if (icon.classList.contains('openai')) {
            icon.textContent = 'O';
        } else if (icon.classList.contains('anthropic')) {
            icon.textContent = 'A';
        } else if (icon.classList.contains('google')) {
            icon.textContent = 'G';
        } else if (icon.classList.contains('deepseek')) {
            icon.textContent = 'D';
        } else if (icon.classList.contains('alibaba')) {
            icon.textContent = '阿';
        }
    });

    // Progress bars animation
    const progressBars = document.querySelectorAll('.bar-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero particles
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroParticles.style.transform = `translateY(${rate}px)`;
        });
    }

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = createScrollToTopButton();
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'all';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });
}

// Create scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb, #10b981);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.1)';
        button.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });

    return button;
}

// Typewriter effect for hero title
function initializeTypewriter() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const originalText = titleElement.innerHTML;
    titleElement.innerHTML = '';
    titleElement.style.opacity = '1';

    let i = 0;
    const speed = 10;

    function typeWriter() {
        if (i < originalText.length) {
            if (originalText.charAt(i) === '<') {
                // Skip HTML tags
                const tagEnd = originalText.indexOf('>', i);
                titleElement.innerHTML += originalText.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                titleElement.innerHTML += originalText.charAt(i);
                i++;
            }
            setTimeout(typeWriter, speed);
        } else {
            // Add cursor blink effect
            setTimeout(() => {
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                cursor.style.marginLeft = '5px';
                titleElement.appendChild(cursor);

                // Remove cursor after 3 seconds
                setTimeout(() => {
                    if (cursor.parentNode) {
                        cursor.parentNode.removeChild(cursor);
                    }
                }, 3000);
            }, 500);
        }
    }

    // Add blink animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
}

// Particle system for hero section
function initializeParticleSystem() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
    `;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            pointer-events: none;
        `;

        // Random initial position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Animation
        particle.style.animation = `
            floatParticle ${Math.random() * 20 + 10}s linear infinite
        `;

        particleContainer.appendChild(particle);
    }

    heroSection.appendChild(particleContainer);

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function copyCitation() {
    const citationText = document.getElementById('citation-text');
    if (citationText) {
        navigator.clipboard.writeText(citationText.textContent).then(() => {
            const copyBtn = document.querySelector('.copy-btn');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#10b981';

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '#2563eb';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = citationText.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            const copyBtn = document.querySelector('.copy-btn');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#10b981';

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '#2563eb';
            }, 2000);
        });
    }
}

function showComingSoon() {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 1rem;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        transform: translateY(20px);
        transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
        <div style="font-size: 3rem; color: #2563eb; margin-bottom: 1rem;">
            <i class="fas fa-rocket"></i>
        </div>
        <h3 style="margin-bottom: 1rem; color: #1f2937;">Coming Soon!</h3>
        <p style="margin-bottom: 2rem; color: #6b7280;">
            We're preparing the dataset and source code for public release.
            Stay tuned for updates!
        </p>
        <button onclick="this.parentElement.parentElement.style.opacity='0'; setTimeout(() => this.parentElement.parentElement.remove(), 300)"
                style="
                    background: linear-gradient(135deg, #2563eb, #10b981);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 500;
                    transition: transform 0.2s ease;
                "
                onmouseover="this.style.transform='translateY(-2px)'"
                onmouseout="this.style.transform='translateY(0)'">
            <i class="fas fa-times"></i> Close
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 10);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // Close on ESC key
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);

        // Add performance indicator for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const perfIndicator = document.createElement('div');
            perfIndicator.style.cssText = `
                position: fixed;
                bottom: 1rem;
                left: 1rem;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                font-size: 0.75rem;
                z-index: 1000;
                opacity: 0.7;
            `;
            perfIndicator.textContent = `Load: ${Math.round(loadTime)}ms`;
            document.body.appendChild(perfIndicator);

            // Remove after 5 seconds
            setTimeout(() => {
                perfIndicator.remove();
            }, 5000);
        }
    });
}

// Initialize performance monitoring in development
initializePerformanceMonitoring();

// Export functions for global use
window.copyCitation = copyCitation;
window.showComingSoon = showComingSoon;