/* =========================================
   PORTFOLIO — JavaScript
   Scroll reveals, parallax, interactivity
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Header scroll effect ----
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Scroll Reveal (Intersection Observer) ----
    const revealSelectors = [
        '.hero__content',
        '.about__composition',
        '.about__floor-orbit',
        '.skills__heading',
        '.skills__statement',
        '.skills__icons-row',
        '.planet-orbit',
        '.work__heading',
        '.work__cards-stack',
        '.contact__card',
        '.footer__socials',
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));
    revealElements.forEach((el) => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ---- Smooth anchor scrolling ----
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Active nav link highlighting ----
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav__link');

    const highlightNav = () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ---- Parallax hero planets on mouse move ----
    const hero = document.querySelector('.hero');
    const heroPlanets = document.querySelectorAll('.hero-planet');

    if (hero && heroPlanets.length) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const x = (clientX - cx) / cx;
            const y = (clientY - cy) / cy;

            heroPlanets.forEach((planet, i) => {
                const speed = 6 + i * 8;
                const dx = x * speed;
                const dy = y * speed;
                planet.style.transform = `translate(${dx}px, ${dy}px)`;
            });
        });
    }

    // ---- Generate star sparkles in the hero ----
    const starsContainer = document.getElementById('hero-stars');
    if (starsContainer) {
        const starCount = 30; // More stars for richness
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const isLarge = Math.random() > 0.85;
            star.className = isLarge ? 'hero__star hero__star--large' : 'hero__star';

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${3 + Math.random() * 5}s`;

            const size = (isLarge ? 3 : 1) + Math.random() * 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            starsContainer.appendChild(star);
        }
    }

    // ---- Magnetic effect on social icons ----
    document.querySelectorAll('.footer__social').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translateY(-3px) translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ---- Tilt on work cards ----
    document.querySelectorAll('.work__card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-20px) scale(1.06) perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---- Skill dot tooltip ----
    document.querySelectorAll('.skill-dot').forEach((dot) => {
        dot.addEventListener('mouseenter', () => {
            const title = dot.getAttribute('title');
            if (title) {
                dot.setAttribute('data-tooltip', title);
            }
        });
    });

    // ---- Stagger hero text entrance ----
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});
