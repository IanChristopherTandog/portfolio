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

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';

    emailjs.sendForm('service_7xgnai9', 'template_b0v7rbk', contactForm)
        .then(() => {
            showStatus('✅ Message sent successfully!', 'success');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            showStatus('❌ Failed to send message. Please try again later.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitText.textContent = 'Send Message';
        });
});


//EmailJS Integration 
(function(){
    emailjs.init({
    publicKey: "zniOUuwBCCLF-cIso",
    });
})();

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
    if(!backToTopBtn) return;
    
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

// Enhanced Projects data array with gallery and detailed information
const projects = [
    {
    title: "Salon Management System",
    type: "Capstone / Academic",
    description: "A web-based appointment and inquiry system designed to streamline salon operations, reduce scheduling conflicts, and improve client engagement through digital transformation.",
    detailedDescription: `
        <p>This capstone project was developed for Minell’s Hair, Nail, and Lashes Salon, a growing beauty and wellness business located in Dasmariñas City, Cavite. The system addresses the salon’s manual scheduling and record-keeping process, which previously relied on notebooks and Facebook Messenger for appointments, leading to frequent booking errors and missed reminders.</p>
        <p>The system introduces an online platform that enables clients to conveniently book, reschedule, or cancel appointments. It provides real-time availability tracking, automated email notifications, and a built-in inquiry feature where clients can ask about services, promotions, and availability. On the administrative side, the salon staff can efficiently manage appointments, client records, inquiries, and reports through an integrated dashboard.</p>
        <p>By transitioning from manual documentation to a structured digital system, the project enhances data management accuracy, improves client satisfaction, and promotes operational efficiency. This transformation allows staff to focus more on providing quality services rather than handling paperwork.</p>
    `,
    image: "/assets/images/salon.png",
    imageAlt: "Salon Management System Interface",
    gallery: [
        { src: "/assets/images/salon/dashboard.png", alt: "Admin Dashboard Overview" },
        { src: "/assets/images/salon/appointment.png", alt: "Client Booking Interface" },
        { src: "/assets/images/salon/home.png", alt: "Landing Page Interface" }
    ],
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML", "CSS"],
    features: [
        "Online appointment scheduling with real-time slot availability",
        "Inquiry feature for client questions and service details",
        "Admin dashboard for managing clients, staff, and reports",
        "Automated email notifications and reminders",
        "Content management for services, pricing, and promotions",
        "Profile management with secure login and password recovery",
        "Virtual hairstyle preview for enhanced customer experience"
    ],
    challenges: "One of the main challenges was ensuring data accuracy and preventing scheduling conflicts when multiple users accessed the system simultaneously. The team also focused on building a reliable inquiry feature that provided fast, organized communication between clients and staff, while maintaining user-friendly design and secure data handling.",
    github: "https://github.com/IanChristopherTandog/Web-based-Appointment-System-with-Inquiry-for-Minell-s-Hair-Nail-and-Lashes-Salon",
    demo: null
    },

    {
        title: "Marci Metzger Real Estate",
        type: "Personal",
        description: "Responsive real estate landing page demonstrating modern web design with React and Tailwind CSS. Originally created for a Web Builder assignment, revamped as a portfolio showcase.",
        detailedDescription: `
            <p>A modern, visually striking landing page for a real estate professional that showcases property listings and services. This project emphasizes responsive design principles and contemporary UI/UX patterns.</p>
            <p>Initially developed as an academic assignment, the project was completely redesigned and rebuilt using modern React patterns and Tailwind CSS to create a portfolio-worthy demonstration of front-end development skills.</p>
        `,
        image: "/assets/images/real-estate.png",
        imageAlt: "Marci Metzger Real Estate Landing Page",
        gallery: [
            { src: "/assets/images/real-state/home.png", alt: "Hero Section" },
            { src: "/assets/images/real-state/getSold.png", alt: "Property Listings" },
            { src: "/assets/images/real-state/services.png", alt: "Services Section" }
        ],
        tech: ["React", "Tailwind CSS"],
        features: [
            "Fully responsive design that adapts seamlessly from mobile to desktop",
            "Component-based architecture for easy maintenance and scalability",
            "Modern UI with smooth animations and micro-interactions",
            "Optimized images and lazy loading for fast page performance",
            "Clean, accessible markup following WCAG guidelines"
        ],
        challenges: "Achieving pixel-perfect responsiveness across all breakpoints required careful planning of the Tailwind utility classes. Created custom component variants to maintain design consistency while ensuring flexibility for different screen sizes.",
        github: "https://github.com/IanChristopherTandog/Marci-Metzger-Real-Estate",
        demo: "https://marci-metzger-real-estate.pages.dev/"
    },
    {
        title: "Warehouse Management System",
        type: "Academic",
        description: "Desktop application built with C# WinForms for managing warehouse operations. Features intuitive interface for products, inventory, customers, and orders with SQL Server integration.",
        detailedDescription: `
            <p>A robust desktop application designed to handle the complex requirements of warehouse inventory and order management. The system provides real-time tracking of stock levels and automated alerts for low inventory.</p>
            <p>Developed using C# WinForms and ADO.NET, this project demonstrates understanding of desktop application architecture, database design, and business logic implementation for enterprise-level operations.</p>
        `,
        image: "/assets/images/warehouse.png", 
        imageAlt: "Warehouse Management System Interface",
        gallery: [
            { src: "/assets/images/warehouse/homepage.png", alt: "Main Dashboard" },
            { src: "/assets/images/warehouse/inventory.png", alt: "Inventory Management" },
            { src: "/assets/images/warehouse/orders.png", alt: "Order Processing" },
            { src: "/assets/images/warehouse/login.png", alt: "Login Screen"}
        ],
        tech: ["C#", "WinForms", "SQL Server", "ADO.NET"],
        features: [
            "Complete CRUD operations for products, inventory, customers, and orders",
            "Real-time inventory tracking with automatic stock level calculations",
            "Advanced search and filtering capabilities across all data tables",
            "Order processing workflow with status tracking and history",
            "Data validation and error handling to maintain database integrity",
            "Report generation for inventory status and order analytics"
        ],
        challenges: "Managing complex relationships between products, orders, and inventory required careful database schema design. Implemented transaction handling to ensure data consistency during order processing and inventory updates. Also created custom data binding mechanisms for efficient UI updates.",
        github: "https://github.com/IanChristopherTandog/warehouse-management-system",
        demo: null
    },
    {
        title: "Tank Battle",
        type: "Personal",
        description: "2D action game featuring player-controlled tanks with unlockable skills, power-ups, AI-driven enemies, and boss battles. Showcases smooth combat mechanics and resource management.",
        detailedDescription: `
            <p>An engaging 2D action game that combines strategic gameplay with fast-paced combat. Players control tanks through increasingly difficult levels, managing resources and unlocking abilities to overcome challenging AI opponents.</p>
            <p>Built with Godot Engine, this project showcases game development fundamentals including physics simulation, AI behavior trees, particle effects, and responsive controls that create a polished gaming experience.</p>
        `,
        image: "/assets/images/tank.png", 
        imageAlt: "Tank Battle Game Gameplay",
        gallery: [
            { src: "/assets/images/tank/gameplay.png", alt: "Gameplay Action" },
            { src: "/assets/images/tank/gameover.png", alt: "Game Over" },
            { src: "/assets/images/tank/title.png", alt: "Title Screen" }
        ],
        tech: ["Godot 3", "GDScript"],
        features: [
            "Skill progression system with multiple unlockable abilities and upgrades",
            "Diverse enemy AI with different behavior patterns and attack strategies",
            "Epic boss battles with unique mechanics and multiple phases",
            "Power-up system for temporary boosts and strategic advantages",
            "Smooth 60 FPS gameplay with responsive tank controls and physics",
            "Dynamic particle effects for weapons, explosions, and environmental elements"
        ],
        challenges: "Balancing gameplay difficulty while maintaining engagement was crucial. Implemented a dynamic difficulty system that adjusts enemy spawn rates and AI aggressiveness based on player performance. Optimized the game loop and collision detection to maintain consistent frame rates even with multiple entities on screen.",
        github: "https://github.com/IanChristopherTandog/Tank-Battle",
        demo: "https://ianchristophertandog.github.io/Tank-Battle/"
    }
];

// Gallery management
let currentImageIndex = 0;
let currentProjectGallery = [];

// Function to generate project cards
function renderProjects() {
    const container = document.getElementById('projects-container');
    
    projects.forEach((project, index) => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.onclick = () => openModal(index);
        
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
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                        GitHub →
                    </a>
                    ${project.demo ? `
                        <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                            Live Demo →
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Modal functions
function openModal(projectIndex) {
    const project = projects[projectIndex];
    const modal = document.getElementById('projectModal');
    
    // Populate modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalType').textContent = project.type;
    document.getElementById('modalDescription').innerHTML = project.detailedDescription;
    
    // Tech tags
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = project.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    // Challenges (optional)
    const challengesSection = document.getElementById('modalChallengesSection');
    if (project.challenges) {
        challengesSection.style.display = 'block';
        document.getElementById('modalChallenges').innerHTML = `<p>${project.challenges}</p>`;
    } else {
        challengesSection.style.display = 'none';
    }
    
    // Gallery
    currentProjectGallery = project.gallery || [{ src: project.image, alt: project.imageAlt }];
    currentImageIndex = 0;
    renderGallery();
    
    // Action buttons
    document.getElementById('modalGithub').href = project.github;
    
    const demoBtn = document.getElementById('modalDemo');
    if (project.demo) {
        demoBtn.href = project.demo;
        demoBtn.style.display = 'flex';
    } else {
        demoBtn.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderGallery() {
    // Main image
    const mainImage = document.getElementById('galleryMainImage');
    mainImage.src = currentProjectGallery[currentImageIndex].src;
    mainImage.alt = currentProjectGallery[currentImageIndex].alt;
    
    // Counter
    document.getElementById('galleryCurrentIndex').textContent = currentImageIndex + 1;
    document.getElementById('galleryTotalImages').textContent = currentProjectGallery.length;
    
    // Thumbnails
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    thumbnailsContainer.innerHTML = currentProjectGallery.map((img, index) => `
        <div class="gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}" onclick="changeImage(${index})">
            <img src="${img.src}" alt="${img.alt}">
        </div>
    `).join('');
}

function changeImage(index) {
    currentImageIndex = index;
    renderGallery();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentProjectGallery.length;
    renderGallery();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentProjectGallery.length) % currentProjectGallery.length;
    renderGallery();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    // Modal close button
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Close on overlay click
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Gallery navigation
    document.querySelector('.gallery-prev').addEventListener('click', prevImage);
    document.querySelector('.gallery-next').addEventListener('click', nextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('projectModal');
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
});
