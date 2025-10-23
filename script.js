// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-menu .nav-link, .mobile-menu .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', throttle(updateScrollProgress, 10));

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const formStatus = document.getElementById('formStatus');

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!validateEmail(data.email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    
    try {
        // Create mailto URL with form data
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Company: ${data.company || 'Not specified'}\n\n` +
            `Message:\n${data.message}\n\n` +
            `---\nSent from portfolio contact form`
        );
        
        // For demo purposes, we'll show success and open email client
        // In production, you'd send this to your backend/email service
        const mailtoURL = `mailto:ictandog37@gmail.com?subject=${subject}&body=${body}`;
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Open email client
        window.location.href = mailtoURL;
        
        // Show success message
        showStatus('Message prepared! Your email client should open shortly.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showStatus('Something went wrong. Please try again or email directly.', 'error');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
    }
});

// Enhanced Navigation with scroll detection
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Smooth scrolling and active state management
function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Enhanced scroll effects
window.addEventListener('scroll', () => {
    // Navigation background
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Update active navigation link
    updateActiveLink();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.project-card, .timeline-item, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Staggered animation for skills
document.querySelectorAll('.skill-tag').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(el);
});

// Enhanced smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveLink();
}, 100));

// Preload critical images and fonts
document.addEventListener('DOMContentLoaded', () => {
    // Add any preloading logic here
    console.log('Portfolio loaded successfully');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Projects data array
const projects = [
    {
        title: "Salon Management System",
        type: "Academic",
        description: "Full-stack web application that modernizes salon operations with appointment scheduling, AI-powered customer inquiries, and comprehensive admin management.",
        image: "/assets/images/salon.png",
        imageAlt: "Salon Management System Dashboard",
        tech: ["PHP", "MySQL", "Bootstrap", "Chatbase API"],
        github: "https://github.com/IanChristopherTandog/Web-based-Appointment-System-with-Inquiry-for-Minell-s-Hair-Nail-and-Lashes-Salon",
        demo: null
    },
    {
        title: "Marci Metzger Real Estate",
        type: "Personal",
        description: "Responsive real estate landing page demonstrating modern web design with React and Tailwind CSS. Originally created for a Web Builder assignment, revamped as a portfolio showcase.",
        image: "/assets/images/real-estate.png", // Add your image path
        imageAlt: "Marci Metzger Real Estate Landing Page",
        tech: ["React", "Tailwind CSS"],
        github: "https://github.com/IanChristopherTandog/Marci-Metzger-Real-Estate",
        demo: "https://marci-metzger-real-estate.pages.dev/"
    },
    {
        title: "Warehouse Management System",
        type: "Academic",
        description: "Desktop application built with C# WinForms for managing warehouse operations. Features intuitive interface for products, inventory, customers, and orders with SQL Server integration.",
        image: "/assets/images/warehouse.png", // Add your image path
        imageAlt: "Warehouse Management System Interface",
        tech: ["C#", "WinForms", "SQL Server", "ADO.NET"],
        github: "https://github.com/IanChristopherTandog/warehouse-management-system",
        demo: null
    },
    {
        title: "Tank Battle",
        type: "Personal",
        description: "2D action game featuring player-controlled tanks with unlockable skills, power-ups, AI-driven enemies, and boss battles. Showcases smooth combat mechanics and resource management.",
        image: "/assets/images/tank.png", // Add your image path
        imageAlt: "Tank Battle Game Gameplay",
        tech: ["Godot 3", "GDScript"],
        github: "https://github.com/IanChristopherTandog/Tank-Battle",
        demo: "https://ianchristophertandog.github.io/Tank-Battle/"
    }
];

// Function to generate project cards
function renderProjects() {
    const container = document.getElementById('projects-container');
    
    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.imageAlt}">
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-type">${project.type}</div>
                </div>
                
                <p class="project-description">
                    ${project.description}
                </p>

                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>

                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        GitHub →
                    </a>
                    ${project.demo ? `
                        <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                            Live Demo →
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProjects);