/* ============================================
   PRISH GLOBAL - Main Scripts
   Three.js Hero Animation, Scroll Effects, Interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroCanvas();
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
   THREE.JS HERO ANIMATION - PROFESSIONAL NETWORK CONSTELLATION
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

    // Network nodes - representing talent/companies
    const nodes = [];
    const nodeCount = 25;
    const connectionDistance = 3.5;

    // Brand colors - blue and gold
    const blueColor = new THREE.Color(0x365eff);
    const goldColor = new THREE.Color(0xCA9703);
    const lightBlueColor = new THREE.Color(0x6B8AFF);

    // Create node spheres with glow effect
    for (let i = 0; i < nodeCount; i++) {
        const isKeyNode = i < 4; // 4 key nodes (larger)
        const size = isKeyNode ? 0.15 + Math.random() * 0.1 : 0.05 + Math.random() * 0.08;

        // Pick color - mostly blue, some gold for variety
        const colorChoice = Math.random();
        let nodeColor;
        if (isKeyNode) {
            nodeColor = colorChoice > 0.5 ? blueColor : goldColor;
        } else {
            nodeColor = colorChoice > 0.7 ? goldColor : lightBlueColor;
        }

        const geometry = new THREE.SphereGeometry(size, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: nodeColor,
            transparent: true,
            opacity: 0.9
        });

        const node = new THREE.Mesh(geometry, material);

        // Position in a loose constellation pattern
        node.position.x = (Math.random() - 0.5) * 14;
        node.position.y = (Math.random() - 0.5) * 10;
        node.position.z = (Math.random() - 0.5) * 6 - 2;

        // Add glow effect (larger transparent sphere)
        const glowGeometry = new THREE.SphereGeometry(size * 2, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: nodeColor,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        node.add(glow);

        // Store animation data
        node.userData = {
            originalPos: node.position.clone(),
            speed: 0.3 + Math.random() * 0.4,
            offset: Math.random() * Math.PI * 2,
            floatRange: 0.3 + Math.random() * 0.4
        };

        nodes.push(node);
        scene.add(node);
    }

    // Create dynamic connections between nearby nodes
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x365eff,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
    });

    // Store connections for animation
    const connections = [];

    function updateConnections() {
        // Remove old connections
        connections.forEach(conn => scene.remove(conn));
        connections.length = 0;

        // Create new connections based on current positions
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position);

                if (dist < connectionDistance) {
                    const geometry = new THREE.BufferGeometry();
                    const positions = new Float32Array([
                        nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                        nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                    ]);
                    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                    // Opacity based on distance - closer = more visible
                    const opacity = 0.25 * (1 - dist / connectionDistance);
                    const mat = lineMaterial.clone();
                    mat.opacity = opacity;

                    const line = new THREE.Line(geometry, mat);
                    line.userData = { nodeA: i, nodeB: j };
                    connections.push(line);
                    scene.add(line);
                }
            }
        }
    }

    // Initial connections
    updateConnections();

    // Add subtle ambient particles in background
    const bgParticleCount = 200;
    const bgGeometry = new THREE.BufferGeometry();
    const bgPositions = new Float32Array(bgParticleCount * 3);

    for (let i = 0; i < bgParticleCount; i++) {
        bgPositions[i * 3] = (Math.random() - 0.5) * 25;
        bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
        bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }

    bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

    const bgMaterial = new THREE.PointsMaterial({
        color: 0x6B8AFF,
        size: 0.03,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const bgParticles = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgParticles);

    camera.position.z = 6;

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
        time += 0.016;

        // Animate main network nodes
        nodes.forEach((node, i) => {
            const data = node.userData;

            // Floating motion
            node.position.x = data.originalPos.x + Math.sin(time * data.speed + data.offset) * data.floatRange;
            node.position.y = data.originalPos.y + Math.cos(time * data.speed * 0.7 + data.offset) * data.floatRange;

            // Gentle rotation
            node.rotation.y += 0.002;
            node.rotation.x += 0.001;
        });

        // Update connections every few frames
        if (Math.floor(time * 60) % 3 === 0) {
            updateConnections();
        }

        // Subtle background particle drift
        bgParticles.rotation.y = time * 0.01;
        bgParticles.rotation.x = time * 0.005;

        // Mouse parallax
        camera.position.x += (mouseX * 1 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.02;
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
