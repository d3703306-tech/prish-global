/* ============================================
   PRISH GLOBAL - Main Scripts
   Three.js + GSAP Animations
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroCanvas();
    initGSAPAnimations();
    initScrollAnimations();
    initStatsCounter();
    initMobileMenu();
    initSmoothScroll();
    initFeatureCards();
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ============================================
   GSAP ANIMATIONS FOR HERO TEXT
   ============================================ */
function initGSAPAnimations() {
    // Wait for load
    window.addEventListener('load', () => {
        // Animate hero elements with GSAP
        gsap.to(".hero-badge", {
            duration: 1,
            y: 0,
            opacity: 1,
            ease: "power2.out"
        });

        gsap.to(".hero-title", {
            duration: 1,
            y: 0,
            opacity: 1,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.to(".hero-subtitle", {
            duration: 1,
            y: 0,
            opacity: 1,
            delay: 0.4,
            ease: "power2.out"
        });

        gsap.to(".hero-cta", {
            duration: 1,
            y: 0,
            opacity: 1,
            delay: 0.6,
            ease: "power2.out"
        });

        gsap.to(".scroll-indicator", {
            duration: 1,
            opacity: 1,
            delay: 1,
            ease: "power2.out"
        });
    });

    // Set initial state
    gsap.set(".hero-badge", { y: 30, opacity: 0 });
    gsap.set(".hero-title", { y: 50, opacity: 0 });
    gsap.set(".hero-subtitle", { y: 30, opacity: 0 });
    gsap.set(".hero-cta", { y: 30, opacity: 0 });
    gsap.set(".scroll-indicator", { opacity: 0 });
}

/* ============================================
   THREE.JS HERO ANIMATION - SIMPLE FLOATING SHAPES
   ============================================ */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create floating shapes - mix of geometries
    const shapes = [];
    const colors = [0x365eff, 0x4d70ff, 0xCA9703, 0xE5B84C];

    const geometries = [
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.TetrahedronGeometry(0.5),
        new THREE.OctahedronGeometry(0.5),
        new THREE.IcosahedronGeometry(0.4),
        new THREE.TorusGeometry(0.4, 0.15, 16, 32)
    ];

    for (let i = 0; i < 20; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.3,
            metalness: 0.5,
            transparent: true,
            opacity: 0.8
        });

        const shape = new THREE.Mesh(geometry, material);

        // Random position
        shape.position.x = (Math.random() - 0.5) * 15;
        shape.position.y = (Math.random() - 0.5) * 15;
        shape.position.z = (Math.random() - 0.5) * 10 - 5;

        // Random rotation
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;

        // Store original position for animation
        shape.userData = {
            originalY: shape.position.y,
            speed: 0.5 + Math.random() * 1,
            offset: Math.random() * Math.PI * 2
        };

        shapes.push(shape);
        scene.add(shape);
    }

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Point lights
    const pointLight1 = new THREE.PointLight(0x365eff, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xCA9703, 0.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    camera.position.z = 8;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Animate each shape
        shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += 0.003 * (index + 1);
            shape.rotation.y += 0.005 * (index + 1);

            // Floating motion
            shape.position.y = shape.userData.originalY +
                Math.sin(time * shape.userData.speed + shape.userData.offset) * 0.5;
        });

        // Mouse parallax
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.feature-card, .section-header, .stat-item, .about-content, .about-visual, .cta-content'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   STATS COUNTER ANIMATION
   ============================================ */
function initStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Create mobile menu if not exists
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(0, 0, 0, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
        } else {
            navLinks.style.display = '';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navLinks.style.display = '';
        });
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/* ============================================
   FEATURE CARD TILT EFFECT
   ============================================ */
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* ============================================
   NAV LINK ACTIVE STATE ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
