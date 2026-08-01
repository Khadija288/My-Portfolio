      // Typing animation
        const typewriterText = document.getElementById('typewriter-text');
        const texts = ['Fullstack Developer', 'Frontend Developer', 'Web Designer', '.NET Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Remove characters
                typewriterText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add characters
                typewriterText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Determine typing speed
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            // Check if word is complete
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of word (2.5 seconds)
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                textIndex++;
                if (textIndex === texts.length) {
                    textIndex = 0;
                }
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect
        setTimeout(type, 500);
        
        // Theme toggle functionality
        function initTheme() {
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = document.getElementById('theme-icon');
            const body = document.body;
            
            // Check for saved theme preference or default to 'dark'
            const currentTheme = localStorage.getItem('theme') || 'dark';
            body.setAttribute('data-theme', currentTheme);
            
            // Update icon based on current theme
            updateThemeIcon(currentTheme, themeIcon);
            
            // Add click event listener
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme, themeIcon);
                
                // Add a subtle animation to the toggle button
                themeToggle.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    themeToggle.style.transform = '';
                }, 400);
            });
        }
        
        function updateThemeIcon(theme, iconElement) {
            if (theme === 'light') {
                iconElement.className = 'fas fa-moon';
            } else {
                iconElement.className = 'fas fa-sun';
            }
        }
        
        // Header scroll effect
        function handleScroll() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        
        // Glassmorphism Skills Cards Animation with Intersection Observer
function initSkillsAnimation() {
    const skillCards = document.querySelectorAll('.glass-skill-card');
    const animatedCards = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const cardIndex = parseInt(card.getAttribute('data-card-index') || '0');

            if (entry.isIntersecting && !animatedCards.has(card)) {
                animatedCards.add(card);

                setTimeout(() => {
                    card.classList.add('skill-card-visible');
                    card.style.transition = `
                        opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)
                    `;
                }, cardIndex * 150);

                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    skillCards.forEach(card => {
        observer.observe(card);
    });
}

        
        // Enhanced scroll animations (removed old reveal function - using AOS now)
        
        // Initialize scroll reveal on page load
        window.addEventListener('DOMContentLoaded', () => {
            // Initialize theme
            initTheme();
            
            // Initialize AOS (Animate On Scroll)
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                offset: 100
            });
            
            // Initialize skills animation
            initSkillsAnimation();
            
            // Add smooth scrolling for all links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100, // Increased offset for better spacing
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Project filtering
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    const filter = btn.getAttribute('data-filter');
                    
                    // Filter projects
                    projectCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
            
            // Contact form submission - send to WhatsApp
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const message = document.getElementById('message').value;
                    
                    // Create WhatsApp message
                    const whatsappMessage = `*New Portfolio Contact!*%0A%0AName: ${name}%0AEmail: ${email}%0A%0A${message}`;
                    const whatsappUrl = `https://wa.me/923185984320?text=${whatsappMessage}`;
                    
                    // Open WhatsApp
                    window.open(whatsappUrl, '_blank');
                    
                    // Reset form
                    contactForm.reset();
                });
            }
        });