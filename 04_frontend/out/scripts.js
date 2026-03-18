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
   THREE.JS HERO ANIMATION - HEXAGONAL NETWORK GRID
   ============================================ */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Colors
    const blueColor = new THREE.Color(0x365eff);
    const goldColor = new THREE.Color(0xCA9703);
    const cyanColor = new THREE.Color(0x00d4ff);

    // Create hexagonal grid nodes
    const hexNodes = [];
    const hexRadius = 1.2;
    const gridSize = 4;
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    // Create hex grid positions
    for (let row = -gridSize; row <= gridSize; row++) {
        for (let col = -gridSize; col <= gridSize; col++) {
            const xOffset = row % 2 === 0 ? 0 : hexRadius * 0.866;
            const x = col * hexRadius * 1.732 + xOffset;
            const y = row * hexRadius * 1.5;

            // Skip nodes too far from center
            if (Math.sqrt(x * x + y * y) > hexRadius * gridSize * 1.8) continue;

            // Random chance to include node (creates organic gaps)
            if (Math.random() > 0.4) {
                // Determine if this is a key node (intersections)
                const isKeyNode = (Math.abs(row) + Math.abs(col)) % 3 === 0;
                const isGoldNode = Math.random() > 0.75;

                const size = isKeyNode ? 0.12 : 0.06 + Math.random() * 0.04;
                const nodeColor = isGoldNode ? goldColor : (isKeyNode ? cyanColor : blueColor);

                // Create node with glow
                const geometry = new THREE.SphereGeometry(size, 16, 16);
                const material = new THREE.MeshBasicMaterial({
                    color: nodeColor,
                    transparent: true,
                    opacity: isKeyNode ? 1 : 0.85
                });

                const node = new THREE.Mesh(geometry, material);
                node.position.set(x, y, (Math.random() - 0.5) * 2);

                // Outer glow
                const glowGeo = new THREE.SphereGeometry(size * 2.5, 16, 16);
                const glowMat = new THREE.MeshBasicMaterial({
                    color: nodeColor,
                    transparent: true,
                    opacity: isKeyNode ? 0.3 : 0.12,
                    blending: THREE.AdditiveBlending
                });
                const glow = new THREE.Mesh(glowGeo, glowMat);
                node.add(glow);

                // Animation data
                node.userData = {
                    baseX: x,
                    baseY: y,
                    baseZ: node.position.z,
                    speed: 0.15 + Math.random() * 0.25,
                    offset: Math.random() * Math.PI * 2,
                    isKey: isKeyNode,
                    pulseOffset: Math.random() * Math.PI * 2
                };

                hexNodes.push(node);
                nodesGroup.add(node);
            }
        }
    }

    // Create connections between nearby nodes (hexagonal pattern)
    const connectionGroup = new THREE.Group();
    scene.add(connectionGroup);
    const connections = [];

    function createConnections() {
        // Clear existing
        connections.forEach(c => connectionGroup.remove(c));
        connections.length = 0;

        const maxDist = hexRadius * 1.8;

        hexNodes.forEach((nodeA, i) => {
            hexNodes.forEach((nodeB, j) => {
                if (i >= j) return;

                const dist = nodeA.position.distanceTo(nodeB.position);
                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.4;
                    const material = new THREE.LineBasicMaterial({
                        color: nodeA.userData.isKey ? 0x00d4ff : 0x365eff,
                        transparent: true,
                        opacity: opacity,
                        blending: THREE.AdditiveBlending
                    });

                    const geometry = new THREE.BufferGeometry();
                    const positions = new Float32Array([
                        nodeA.position.x, nodeA.position.y, nodeA.position.z,
                        nodeB.position.x, nodeB.position.y, nodeB.position.z
                    ]);
                    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                    const line = new THREE.Line(geometry, material);
                    connections.push(line);
                    connectionGroup.add(line);
                }
            });
        });
    }

    createConnections();

    // Animated particles flowing through connections
    const particleCount = 30;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const pGeo = new THREE.SphereGeometry(0.03, 8, 8);
        const pMat = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? goldColor : cyanColor,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });
        const particle = new THREE.Mesh(pGeo, pMat);

        // Random starting position between two nodes
        const startNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];
        const endNode = hexNodes[Math.floor(Math.random() * hexNodes.length)];

        particle.userData = {
            nodeA: startNode,
            nodeB: endNode,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.005
        };

        particles.push(particle);
        scene.add(particle);
    }

    camera.position.z = 8;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.016;

        // Gentle scene rotation based on mouse
        targetRotX = mouseY * 0.15;
        targetRotY = mouseX * 0.15;

        nodesGroup.rotation.x += (targetRotX - nodesGroup.rotation.x) * 0.03;
        nodesGroup.rotation.y += (targetRotY - nodesGroup.rotation.y) * 0.03;
        connectionGroup.rotation.x = nodesGroup.rotation.x;
        connectionGroup.rotation.y = nodesGroup.rotation.y;

        // Animate nodes - breathing/pulsing effect
        hexNodes.forEach((node, i) => {
            const data = node.userData;

            // Gentle floating
            node.position.x = data.baseX + Math.sin(time * data.speed + data.offset) * 0.15;
            node.position.y = data.baseY + Math.cos(time * data.speed * 0.8 + data.offset) * 0.15;
            node.position.z = data.baseZ + Math.sin(time * data.speed * 0.5 + data.offset) * 0.3;

            // Pulse effect for key nodes
            if (data.isKey) {
                const scale = 1 + Math.sin(time * 2 + data.pulseOffset) * 0.15;
                node.scale.setScalar(scale);
            }
        });

        // Animate flowing particles
        particles.forEach(p => {
            const data = p.userData;
            data.progress += data.speed;

            if (data.progress > 1) {
                data.progress = 0;
                data.nodeA = hexNodes[Math.floor(Math.random() * hexNodes.length)];
                data.nodeB = hexNodes[Math.floor(Math.random() * hexNodes.length)];
            }

            // Interpolate between nodes
            p.position.x = data.nodeA.position.x + (data.nodeB.position.x - data.nodeA.position.x) * data.progress;
            p.position.y = data.nodeA.position.y + (data.nodeB.position.y - data.nodeA.position.y) * data.progress;
            p.position.z = data.nodeA.position.z + (data.nodeB.position.z - data.nodeA.position.z) * data.progress;
        });

        // Slow overall rotation
        nodesGroup.rotation.z += 0.0008;
        connectionGroup.rotation.z = nodesGroup.rotation.z;

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
