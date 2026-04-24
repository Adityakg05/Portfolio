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
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

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
        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealFunction);
    revealFunction();

    // =============================================
    // ANIMATED NEURAL NETWORK CANVAS BACKGROUND
    // =============================================
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 160;
    const MOUSE = { x: W / 2, y: H / 2 };

    window.addEventListener('mousemove', e => {
        MOUSE.x = e.clientX;
        MOUSE.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.r = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.3;
            // Randomly purple or indigo-blue
            this.color = Math.random() > 0.5
                ? `rgba(168,85,247,${this.alpha})`
                : `rgba(99,102,241,${this.alpha})`;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
        }
        draw() {
            ctx.save();
            ctx.beginPath();
            // Glow effect on dot
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    function drawGrid() {
        const gridSize = 60;
        ctx.save();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.06)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, H);
            ctx.stroke();
        }
        for (let y = 0; y < H; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
            ctx.stroke();
        }
        ctx.restore();
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const opacity = (1 - dist / CONNECTION_DIST) * 0.35;
                    ctx.save();
                    ctx.beginPath();
                    const grad = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    grad.addColorStop(0, `rgba(168,85,247,${opacity})`);
                    grad.addColorStop(1, `rgba(99,102,241,${opacity})`);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
            // Connect to mouse
            const mdx = particles[i].x - MOUSE.x;
            const mdy = particles[i].y - MOUSE.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < CONNECTION_DIST * 1.4) {
                const mOpacity = (1 - mdist / (CONNECTION_DIST * 1.4)) * 0.6;
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = `rgba(216,180,254,${mOpacity})`;
                ctx.lineWidth = 1;
                ctx.shadowColor = 'rgba(168,85,247,0.5)';
                ctx.shadowBlur = 6;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(MOUSE.x, MOUSE.y);
                ctx.stroke();
                ctx.restore();
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        drawGrid();
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
});
