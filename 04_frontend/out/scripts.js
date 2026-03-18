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
   THREE.JS HERO ANIMATION - PROFESSIONAL NETWORK PARTICLES
   ============================================ */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
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

    // Professional network particles - connected dots representing talent network
    const particles = [];
    const particleCount = 60;
    const connectionDistance = 1.8;

    // Brand colors - subtle blue and gold
    const colors = [0x365eff, 0x6B8AFF, 0xCA9703, 0xD4A843];

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Spread particles across the scene
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 16;
        const z = (Math.random() - 0.5) * 8 - 3;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Store particle data for animation
        particles.push({
            x: x,
            y: y,
            z: z,
            originalX: x,
            originalY: y,
            speed: 0.0003 + Math.random() * 0.0005,
            offset: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Subtle particle material - soft glow
    const material = new THREE.PointsMaterial({
        color: 0x6B8AFF,
        size: 0.08,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Create subtle connection lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x365eff,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending
    });

    const lineGeometries = [];
    const lines = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dz = particles[i].z - particles[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < connectionDistance) {
                const lineGeometry = new THREE.BufferGeometry();
                const linePositions = new Float32Array([
                    particles[i].x, particles[i].y, particles[i].z,
                    particles[j].x, particles[j].y, particles[j].z
                ]);
                lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                const line = new THREE.Line(lineGeometry, lineMaterial);
                lines.add(line);
            }
        }
    }
    scene.add(lines);

    // Subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    camera.position.z = 5;

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
        time += 0.001;

        // Animate particles - subtle floating motion
        const posAttr = particleSystem.geometry.attributes.position;
        particles.forEach((p, i) => {
            // Very subtle floating movement
            p.x = p.originalX + Math.sin(time * 0.5 + p.offset) * 0.3;
            p.y = p.originalY + Math.cos(time * 0.3 + p.offset) * 0.2;

            posAttr.setXYZ(i, p.x, p.y, p.z);
        });
        posAttr.needsUpdate = true;

        // Subtle particle rotation
        particleSystem.rotation.y = time * 0.02;

        // Mouse parallax - very subtle
        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.01;
        camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.01;
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
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        const statNumber = item.querySelector('.stat-number');
        const target = parseInt(item.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            statNumber.textContent = Math.floor(current);
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
