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
   THREE.JS HERO ANIMATION - DYNAMIC NETWORK WITH MOUSE INTERACTION
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

    // Configuration
    const nodeCount = 25;
    const connectDistance = 3;
    const mouseInfluenceRadius = 5;

    // Colors - brand palette
    const blue = new THREE.Color(0x365eff);
    const cyan = new THREE.Color(0x6B8AFF);
    const gold = new THREE.Color(0xCA9703);

    // Create nodes
    const nodes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    for (let i = 0; i < nodeCount; i++) {
        // Determine node type
        const isKeyNode = i < 5; // 5 key nodes
        const isGold = Math.random() > 0.7;

        const size = isKeyNode ? 0.08 : 0.03 + Math.random() * 0.03;
        const color = isKeyNode ? (isGold ? gold : cyan) : (isGold ? gold : blue);

        // Node sphere
        const geometry = new THREE.SphereGeometry(size, 12, 12);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: isKeyNode ? 1 : 0.85
        });

        const node = new THREE.Mesh(geometry, material);

        // Position in a spread out area - wider
        node.position.set(
            (Math.random() - 0.5) * 16,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6 - 2
        );

        // Glow effect - larger relative to size for softer look
        const glowGeometry = new THREE.SphereGeometry(size * 4, 12, 12);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: isKeyNode ? 0.25 : 0.08,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        node.add(glow);

        // Animation data
        node.userData = {
            vx: (Math.random() - 0.5) * 0.008,
            vy: (Math.random() - 0.5) * 0.008,
            vz: (Math.random() - 0.5) * 0.004,
            baseX: node.position.x,
            baseY: node.position.y,
            baseZ: node.position.z,
            isKey: isKeyNode,
            pulsePhase: Math.random() * Math.PI * 2
        };

        nodes.push(node);
        nodeGroup.add(node);
    }

    // Position camera further back
    camera.position.z = 12;
    camera.position.y = 0;

    // Connection lines - we'll recreate each frame for dynamic effect
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x365eff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
    });

    // Mouse tracking
    const mouse = new THREE.Vector2(0, 0);
    const mouse3D = new THREE.Vector3(0, 0, 0);
    let isMouseMoving = false;
    let mouseTimeout;

    document.addEventListener('mousemove', (event) => {
        // Convert to normalized coordinates (-1 to 1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Project to 3D space (approximate)
        mouse3D.set(mouse.x * 6, mouse.y * 4, 0);

        isMouseMoving = true;
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => { isMouseMoving = false; }, 100);
    });

    // Get distance between two nodes
    function getDistance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    // Animation loop
    let time = 0;
    let lineGeometry = null;
    let lineMesh = null;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.016;

        // Update nodes
        nodes.forEach((node, i) => {
            const data = node.userData;

            // Apply velocity
            node.position.x += data.vx;
            node.position.y += data.vy;
            node.position.z += data.vz;

            // Boundary bounce - keep in view
            if (Math.abs(node.position.x) > 7) data.vx *= -1;
            if (Math.abs(node.position.y) > 5) data.vy *= -1;
            if (Math.abs(node.position.z) > 3) data.vz *= -1;

            // Mouse interaction - nodes attracted to mouse when close
            const distToMouse = getDistance(node.position, mouse3D);
            if (distToMouse < mouseInfluenceRadius) {
                const force = (1 - distToMouse / mouseInfluenceRadius) * 0.015;
                node.position.x += (mouse3D.x - node.position.x) * force;
                node.position.y += (mouse3D.y - node.position.y) * force;
            }

            // Gentle drift back to base
            node.position.x += (data.baseX - node.position.x) * 0.001;
            node.position.y += (data.baseY - node.position.y) * 0.001;
            node.position.z += (data.baseZ - node.position.z) * 0.001;

            // Pulse effect for key nodes
            if (data.isKey) {
                const pulse = 1 + Math.sin(time * 2 + data.pulsePhase) * 0.2;
                node.scale.setScalar(pulse);
            }
        });

        // Dynamic connections - create lines between nearby nodes
        const positions = [];

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = getDistance(nodes[i].position, nodes[j].position);

                if (dist < connectDistance) {
                    // Add line vertices
                    positions.push(
                        nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                        nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                    );
                }
            }
        }

        // Remove old lines
        if (lineMesh) {
            scene.remove(lineMesh);
            lineGeometry.dispose();
        }

        // Create new lines
        if (positions.length > 0) {
            lineGeometry = new THREE.BufferGeometry();
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

            lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lineMesh);
        }

        // Mouse-based scene rotation (subtle)
        nodeGroup.rotation.y += (mouse.x * 0.1 - nodeGroup.rotation.y) * 0.02;
        nodeGroup.rotation.x += (-mouse.y * 0.08 - nodeGroup.rotation.x) * 0.02;

        // Gentle auto rotation when mouse not moving
        if (!isMouseMoving) {
            nodeGroup.rotation.z += 0.0005;
        }

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
