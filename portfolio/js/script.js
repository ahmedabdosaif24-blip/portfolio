document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌙';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('portfolio-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        } else {
            localStorage.setItem('portfolio-theme', 'light');
            themeToggleBtn.textContent = '🌙';
        }
    });

    // 2. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 120;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initially on page load

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Account for fixed navbar height if necessary
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinksMenu = document.querySelector('.nav-links');
                const mobileMenuBtnTrigger = document.getElementById('mobile-menu-btn');
                if (navLinksMenu && navLinksMenu.classList.contains('active')) {
                    navLinksMenu.classList.remove('active');
                    if (mobileMenuBtnTrigger) {
                        mobileMenuBtnTrigger.innerHTML = '☰';
                        mobileMenuBtnTrigger.style.fontSize = '2rem';
                    }
                }
            }
        });
    });

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '✕';
                mobileMenuBtn.style.fontSize = '1.8rem';
            } else {
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.style.fontSize = '2rem';
            }
        });
    }

    // 5. Navbar styling on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });

});
