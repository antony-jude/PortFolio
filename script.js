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
    'cat skills.txt': 'Languages: Python, C, Java, Dart\nTechnologies: Flutter, Node.js\nCybersecurity: Networking, Nmap, SIEM Basics, Ethical Hacking\nTools: Git, VS Code, VirtualBox',
    'netstat -an': 'Active Internet connections (servers and established)\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN\ntcp        0      0 192.168.1.5:443         10.0.0.5:54321          ESTABLISHED',
    'help': 'Available commands:\n  whoami       - Display info about myself\n  cat skills   - Output my core technical skill matrix\n  netstat -an  - List active socket connections\n  matrix       - Stream matrix code rain screensaver (Press any key to exit)\n  clear        - Flush terminal buffer console logs',
    'clear': 'CONSOLE_CLEARED'
};

if (terminalBody) {
    terminalBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('terminal-cmd')) {
            const cmd = e.target.getAttribute('data-cmd');
            executeTerminalCommand(cmd);
        }
    });

    // Make the terminal keyboard interactive too!
    // Append input line at bottom for advanced users
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-text mt-3';
    inputLine.style.display = 'flex';
    inputLine.style.alignItems = 'center';
    inputLine.innerHTML = `<span class="prompt">root@antony-jude:~$</span><input type="text" id="terminal-keyboard-input" style="flex:1; background:transparent; border:none; outline:none; color:#27c93f; font-family:inherit; font-size:inherit; padding-left:5px;" placeholder="Type help..." autocomplete="off">`;
    terminalBody.appendChild(inputLine);

    const keyboardInput = document.getElementById('terminal-keyboard-input');
    if (keyboardInput) {
        keyboardInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                const cmd = keyboardInput.value.trim().toLowerCase();
                if (cmd) {
                    keyboardInput.value = '';
                    executeTerminalCommand(cmd);
                }
            }
        });
    }
}

function executeTerminalCommand(cmd) {
    if (!terminalBody) return;

    // Handle clear
    if (cmd === 'clear') {
        // Reset terminal body content but keep keyboard input
        const promptSpan = document.createElement('p');
        promptSpan.className = 'terminal-output';
        promptSpan.textContent = 'System log flushed. Ready for commands. Type "help" for info.';
        
        terminalBody.innerHTML = '';
        terminalBody.appendChild(promptSpan);

        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-text mt-3';
        inputLine.style.display = 'flex';
        inputLine.style.alignItems = 'center';
        inputLine.innerHTML = `<span class="prompt">root@antony-jude:~$</span><input type="text" id="terminal-keyboard-input" style="flex:1; background:transparent; border:none; outline:none; color:#27c93f; font-family:inherit; font-size:inherit; padding-left:5px;" placeholder="Type help..." autocomplete="off">`;
        terminalBody.appendChild(inputLine);

        const keyboardInput = document.getElementById('terminal-keyboard-input');
        if (keyboardInput) {
            keyboardInput.addEventListener('keydown', (keyboardEvent) => {
                if (keyboardEvent.key === 'Enter') {
                    keyboardEvent.preventDefault();
                    keyboardEvent.stopPropagation();
                    const newCmd = keyboardInput.value.trim().toLowerCase();
                    if (newCmd) {
                        keyboardInput.value = '';
                        executeTerminalCommand(newCmd);
                    }
                }
            });
        }
        return;
    }

    // Handle matrix digital rain screensaver easter egg!
    if (cmd === 'matrix') {
        startMatrixScreensaver();
        return;
    }

    let rawCmd = cmd;
    // Map partial matches (e.g. "cat skills" to "cat skills.txt")
    if (cmd === 'cat skills') cmd = 'cat skills.txt';

    const response = responses[cmd] || `Command not found: "${rawCmd}". Type "help" for a list of available systems.`;

    // Hide current interactive options
    const actions = terminalBody.querySelector('.terminal-actions');
    if (actions) actions.style.display = 'none';

    // Type the command line
    const cmdLine = document.createElement('p');
    cmdLine.className = 'terminal-text mt-3';
    cmdLine.innerHTML = `<span class="prompt">root@antony-jude:~$</span> <span>${rawCmd}</span>`;
    
    // Insert before the input line
    const kInputLine = document.getElementById('terminal-keyboard-input')?.closest('.terminal-text');
    if (kInputLine) {
        terminalBody.insertBefore(cmdLine, kInputLine);
    } else {
        terminalBody.appendChild(cmdLine);
    }

    // Show response after a small delay
    setTimeout(() => {
        const resLine = document.createElement('p');
        resLine.className = 'terminal-output mt-2';
        resLine.style.whiteSpace = 'pre-wrap';
        resLine.textContent = response;
        
        if (kInputLine) {
            terminalBody.insertBefore(resLine, kInputLine);
        } else {
            terminalBody.appendChild(resLine);
        }

        // Show back the action buttons if we are not cleared
        setTimeout(() => {
            const originalActions = document.querySelector('.terminal-actions');
            if (originalActions) {
                const newActions = originalActions.cloneNode(true);
                newActions.style.display = 'flex';
                
                if (kInputLine) {
                    terminalBody.insertBefore(newActions, kInputLine);
                } else {
                    terminalBody.appendChild(newActions);
                }
            }
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 300);
    }, 200);
}

// Matrix screensaver execution inside terminal window container
function startMatrixScreensaver() {
    const terminalWindow = document.querySelector('.terminal-window');
    if (!terminalWindow) return;

    // Remove any existing matrix overlays
    const oldCanvas = terminalWindow.querySelector('.matrix-canvas-overlay');
    if (oldCanvas) oldCanvas.remove();

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-canvas-overlay';
    terminalWindow.style.position = 'relative';
    terminalWindow.appendChild(canvas);

    // Set canvas sizes to match window body
    const rect = terminalWindow.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height || 350;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト";
    const charArr = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    let matrixInterval = setInterval(() => {
        // Semitransparent black background to fade previous characters
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Green matrix characters
        ctx.fillStyle = "#00ff00"; 
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = charArr[Math.floor(Math.random() * charArr.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top if it reaches bottom (with randomized delay)
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 33);

    // Clear screensaver when clicking or typing any key
    function stopMatrix() {
        clearInterval(matrixInterval);
        canvas.remove();
        document.removeEventListener('keydown', stopMatrix);
    }

    canvas.addEventListener('click', stopMatrix);
    
    // Register the keydown listener with a tiny delay to avoid catching the Enter keydown bubble
    setTimeout(() => {
        document.addEventListener('keydown', stopMatrix);
    }, 100);
}

// -------------------------------------
