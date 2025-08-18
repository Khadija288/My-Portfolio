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
        
        // Scroll reveal animation
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                    
                    // Animate progress bars in skills section
                    if (reveals[i].closest('#skills')) {
                        const skillItems = reveals[i].querySelectorAll('.skill-item');
                        skillItems.forEach(item => {
                            if (!item.classList.contains('active')) {
                                item.classList.add('active');
                            }
                        });
                    }
                }
            }
        }
        
        window.addEventListener('scroll', reveal);
        
        // Initialize scroll reveal on page load
        window.addEventListener('DOMContentLoaded', () => {
            reveal();
            
            // Add smooth scrolling for all links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
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