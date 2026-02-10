// ==================== CUSTOM CURSOR ====================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const mouseGlow = document.getElementById('mouseGlow');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Mouse glow follows immediately
    mouseGlow.style.left = mouseX + 'px';
    mouseGlow.style.top = mouseY + 'px';
});

function animateCursor() {
    // Smooth cursor follow
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, [data-magnetic], [data-tilt]');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});

// Cursor click effect
document.addEventListener('mousedown', () => {
    cursorFollower.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursorFollower.classList.remove('clicking');
});

// ==================== MAGNETIC EFFECT ====================
const magneticElements = document.querySelectorAll('[data-magnetic]');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// ==================== TILT EFFECT ====================
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
    const maxTilt = el.dataset.tiltMax || 10;
    
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ==================== RIPPLE EFFECT ====================
const rippleElements = document.querySelectorAll('[data-ripple]');

rippleElements.forEach(el => {
    el.addEventListener('click', function(e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== PARTICLES ====================
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        container.appendChild(particle);
    }
}

createParticles();

// ==================== SCROLL INDICATOR HIDE ====================
const scrollIndicator = document.getElementById('scrollIndicator');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

// ==================== HEADER SCROLL EFFECT ====================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== MOBILE MENU ====================
const mobileMenu = document.getElementById('mobileMenu');
const mobileNav = document.getElementById('mobileNav');

mobileMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    const icon = mobileMenu.querySelector('i');
    icon.className = mobileNav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
});

document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        mobileMenu.querySelector('i').className = 'fas fa-bars';
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== COPY SCRIPT ====================
function copyScript() {
    const scriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KS-script/KS-RIVALS-HUB.Load/refs/heads/main/KS.Loader"))()';
    
    navigator.clipboard.writeText(scriptText).then(() => {
        showToast();
        
        const btn = document.querySelector('.copy-btn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        btn.style.background = 'var(--success)';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = 'var(--white)';
            btn.style.color = 'var(--black)';
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy:', err);
        const textArea = document.createElement('textarea');
        textArea.value = scriptText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast();
    });
}

// ==================== TOAST ====================
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ==================== EXECUTOR TOGGLE ====================
function toggleExecutors() {
    const executorList = document.getElementById('executorList');
    const toggleBtn = document.querySelector('.executor-toggle');
    
    executorList.classList.toggle('show');
    toggleBtn.classList.toggle('active');
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s`;
    observer.observe(card);
});

document.querySelectorAll('.script-info-card, .social-card, .section-header').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// ==================== PARALLAX ORBS ====================
let orbMouseX = 0;
let orbMouseY = 0;
let currentOrbX = 0;
let currentOrbY = 0;

document.addEventListener('mousemove', (e) => {
    orbMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    orbMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateOrbs() {
    currentOrbX += (orbMouseX - currentOrbX) * 0.03;
    currentOrbY += (orbMouseY - currentOrbY) * 0.03;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 40;
        orb.style.transform = `translate(${currentOrbX * speed}px, ${currentOrbY * speed}px)`;
    });
    
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ==================== INTERACTIVE SHAPES ====================
const shapes = document.querySelectorAll('.shape');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 15;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
    });
});

// ==================== PREVENT DISCORD CLICK ====================
document.querySelector('.social-card.discord').addEventListener('click', (e) => {
    e.preventDefault();
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
