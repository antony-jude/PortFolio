// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileMenuIcon = document.querySelector('.mobile-menu-btn i');

if (mobileMenuBtn && navLinks && mobileMenuIcon) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon
        if (navLinks.classList.contains('active')) {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
        } else {
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-links a');
if (links && navLinks && mobileMenuIcon) {
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        });
    });
}

// Sticky Header & Active Link Switching
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Header shadow
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Active link highlighting
    let current = '';
    
    if (sections) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
    }
    
    if (navItems) {
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.startsWith('#') && href.substring(1) === current) {
                item.classList.add('active');
            }
        });
    }
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});

// Advanced Typewriter Effect for Hero
const roleElement = document.querySelector('.role');
if (roleElement) {
    const rolesData = roleElement.getAttribute('data-roles');
    const roles = rolesData ? JSON.parse(rolesData) : [
        "Aspiring Ethical Hacker",
        "Cyber Security Student",
        "Software Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Clear initial text
    roleElement.textContent = '';
    
    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 50;
        if (isDeleting) {
            typeSpeed /= 2; // Delete faster
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1000; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 200; // Pause before typing next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Custom Cursor Effect (Dot and Ring)
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

const cursorRing = document.createElement('div');
cursorRing.classList.add('cursor-ring');
document.body.appendChild(cursorRing);

// Spotlight Effect
const spotlight = document.createElement('div');
spotlight.classList.add('spotlight');
document.body.appendChild(spotlight);

// Parallax Hero Elements
const heroText = document.querySelector('.hero-text');
const heroImage = document.querySelector('.hero-image-container');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
    
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    
    if (heroText && heroImage) {
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        
        heroText.style.transform = `translate(${x}px, ${y}px)`;
        heroImage.style.transform = `translate(${-x}px, ${-y}px)`;
    }
});

document.addEventListener('mousedown', () => {
    cursorRing.classList.add('hovered');
});

document.addEventListener('mouseup', () => {
    cursorRing.classList.remove('hovered');
});

// Add hover effect to all links and buttons
const interactives = document.querySelectorAll('a, button, .btn, input, textarea');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hovered');
    });
});

// Initialize Vanilla Tilt for 3D card effects
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".glass-panel"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
    });
}

// Hacker Mode Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    // Check local storage for preference
    if (localStorage.getItem('hackerMode') === 'enabled') {
        document.body.classList.add('hacker-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('hacker-mode');
        
        // Save preference
        if (document.body.classList.contains('hacker-mode')) {
            localStorage.setItem('hackerMode', 'enabled');
        } else {
            localStorage.setItem('hackerMode', 'disabled');
        }
    });
}

// Initialize Particles.js (Network Background)
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: ["#6366f1", "#ec4899", "#00ff00"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#8b5cf6",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// Terminal Widget Logic
const terminalBody = document.getElementById('terminal-body');

const responses = {
    'whoami': 'Antony Jude R - Aspiring Ethical Hacker & Software Developer.',
    'cat skills.txt': 'Kali Linux, Git, VS Code, Networking, Malware Analysis, Python, C++, Web Dev.',
    'netstat -an': 'Active Internet connections (servers and established)\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN\ntcp        0      0 192.168.1.5:443         10.0.0.5:54321          ESTABLISHED'
};

if (terminalBody) {
    terminalBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('terminal-cmd')) {
            const cmd = e.target.getAttribute('data-cmd');
            const response = responses[cmd];
            
            // Find the actions container that was clicked and hide it
            const actions = e.target.closest('.terminal-actions');
            if (actions) actions.style.display = 'none';
            
            // Type the command
            const cmdLine = document.createElement('p');
            cmdLine.className = 'terminal-text mt-3';
            cmdLine.innerHTML = `<span class="prompt">root@antony-jude:~$</span> <span class="typing">${cmd}</span>`;
            terminalBody.appendChild(cmdLine);
            
            // Show response after a small delay
            setTimeout(() => {
                const resLine = document.createElement('p');
                resLine.className = 'terminal-output mt-2';
                resLine.style.whiteSpace = 'pre-wrap';
                resLine.textContent = response;
                terminalBody.appendChild(resLine);
                
                // Bring back a new actions container
                setTimeout(() => {
                    // Clone the FIRST original actions container to reset state
                    const originalActions = document.querySelector('.terminal-actions');
                    const newActions = originalActions.cloneNode(true);
                    newActions.style.display = 'flex';
                    terminalBody.appendChild(newActions);
                    
                    // Scroll terminal to bottom
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 500);
            }, 300);
        }
    });
}

