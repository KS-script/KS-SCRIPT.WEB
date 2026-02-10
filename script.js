// Initialize particles
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#22d3ee'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        container.appendChild(particle);
    }
}

createParticles();

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const mobileNav = document.getElementById('mobileNav');

mobileMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    const icon = mobileMenu.querySelector('i');
    icon.className = mobileNav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        mobileMenu.querySelector('i').className = 'fas fa-bars';
    });
});

// Smooth scrolling for navigation links
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

// Active navigation link on scroll
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

// Copy script function
function copyScript() {
    const scriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KS-script/KS-RIVALS-HUB.Load/refs/heads/main/KS.Loader"))()';
    
    navigator.clipboard.writeText(scriptText).then(() => {
        showToast();
        
        // Button animation
        const btn = document.querySelector('.copy-btn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        }, 2500);
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = scriptText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast();
    });
}

// Show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Toggle executor list
function toggleExecutors() {
    const executorList = document.getElementById('executorList');
    const toggleBtn = document.querySelector('.executor-toggle');
    
    executorList.classList.toggle('show');
    toggleBtn.classList.toggle('active');
}

// Animate elements on scroll
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

// Observe all feature cards with staggered animation
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
    observer.observe(card);
});

// Observe other animated elements
document.querySelectorAll('.script-info-card, .social-card, .section-header').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// Prevent Discord link click
document.querySelector('.social-card.discord').addEventListener('click', (e) => {
    e.preventDefault();
});

// Parallax effect for gradient orbs
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateOrbs() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 30;
        orb.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
    });
    
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// Add typing effect to code (optional enhancement)
function typeCode() {
    const codeElement = document.getElementById('scriptCode');
    const originalHTML = codeElement.innerHTML;
    codeElement.innerHTML = '';
    
    let i = 0;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const text = tempDiv.textContent;
    
    // Reset to original after a delay
    setTimeout(() => {
        codeElement.innerHTML = originalHTML;
    }, 100);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
});

// Button hover sound effect (optional - visual feedback)
document.querySelectorAll('.btn, .copy-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.02)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});
