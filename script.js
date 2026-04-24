document.addEventListener('DOMContentLoaded', () => {
    
    // Set Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Sticky Navbar & Active States
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinksList = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Navbar Scrolled State
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            // Toggle hamburger icon between bars and times
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Trigger reveal on load and on scroll
    window.addEventListener('scroll', revealFunction);
    revealFunction(); // Initial check
});
