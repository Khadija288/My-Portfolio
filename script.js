      // Typing animation
        const typewriterText = document.getElementById('typewriter-text');
        const texts = ['Frontend Developer', 'Web Designer', 'UI/UX Specialist', 'Tech Enthusiast'];
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
                // Pause at end of word
                typeSpeed = 1500;
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
        
        // Skills Animation with Intersection Observer
function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills-section');
    const skillItems = document.querySelectorAll('.skill-item');
    let hasAnimated = false; // Ensure animation runs only once

    // Intersection Observer to detect when skills section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateSkills();
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    function animateSkills() {
        skillItems.forEach((item, index) => {
            // ✅ FIX: agar data-percentage attribute nahi hai to span ke text se number nikalo
            let percentage = item.getAttribute('data-percentage');
            if (!percentage) {
                const percentTextElement = item.querySelector('.skill-percent');
                if (percentTextElement) {
                    percentage = parseInt(percentTextElement.textContent);
                }
            } else {
                percentage = parseInt(percentage);
            }

            const progressBar = item.querySelector('.skill-progress');
            const percentText = item.querySelector('.skill-percent');

            // Add staggered delay for each skill item
            setTimeout(() => {
                // Add animation class
                item.classList.add('animate');

                // Animate progress bar width
                progressBar.style.width = percentage + '%';

                // Animate percentage text
                animatePercentage(percentText, 0, percentage, 1000); // 1 second duration

            }, index * 150); // 150ms delay between each skill
        });
    }

    function animatePercentage(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;

        function updatePercentage(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Use easing function for smooth animation
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.round(start + (range * easedProgress));

            element.textContent = currentValue + '%';

            if (progress < 1) {
                requestAnimationFrame(updatePercentage);
            }
        }

        requestAnimationFrame(updatePercentage);
    }

    // Easing function for smooth animation
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
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
        });