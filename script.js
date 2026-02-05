// ===============================
// UTILITIES
// ===============================
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

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===============================
// MOBILE MENU TOGGLE
// ===============================
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const body = document.body;

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
  });

  // Close mobile menu when clicking on links
  document
    .querySelectorAll(".mobile-menu .nav-link, .mobile-menu .nav-cta")
    .forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        body.style.overflow = "";
      });
    });
}

// ===============================
// SCROLL PROGRESS INDICATOR
// ===============================
const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = scrollPercent + "%";
}

window.addEventListener("scroll", throttle(updateScrollProgress, 10));

// ===============================
// CONTACT FORM HANDLING
// ===============================
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const submitText = document.getElementById("submitText");
const formStatus = document.getElementById("formStatus");

function showStatus(message, type) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.style.display = "block";

  setTimeout(() => {
    formStatus.style.display = "none";
  }, 5000);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = "Sending...";

    // EmailJS
    if (window.emailjs) {
      emailjs
        .sendForm("service_7xgnai9", "template_b0v7rbk", contactForm)
        .then(() => {
          showStatus("✅ Message sent successfully!", "success");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          showStatus("❌ Failed to send message. Please try again later.", "error");
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
          if (submitText) submitText.textContent = "Send Message";
        });
    } else {
      showStatus("❌ EmailJS not loaded.", "error");
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = "Send Message";
    }
  });
}

// EmailJS init
(function () {
  if (!window.emailjs) return;
  emailjs.init({ publicKey: "zniOUuwBCCLF-cIso" });
})();

// ===============================
// ENHANCED NAVIGATION + ACTIVE LINKS
// ===============================
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

function updateActiveLink() {
  if (!sections.length || !navLinks.length) return;

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  if (nav) {
    if (window.scrollY > 100) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  updateActiveLink();
});

// Smooth scrolling for anchors
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    const target = href ? document.querySelector(href) : null;
    if (!target) return;

    e.preventDefault();
    const headerOffset = 80;
    const offsetPosition = target.offsetTop - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  });
});

// ===============================
// INTERSECTION OBSERVER ANIMATIONS
// ===============================
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .timeline-item, .contact-method").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
  observer.observe(el);
});

document.querySelectorAll(".skill-tag").forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
  observer.observe(el);
});

// ===============================
// KEYBOARD NAVIGATION CLASS
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") document.body.classList.add("keyboard-navigation");
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// ===============================
// BACK TO TOP BUTTON
// ===============================
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;
  if (window.pageYOffset > 300) backToTopBtn.classList.add("show");
  else backToTopBtn.classList.remove("show");
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===============================
// CERTIFICATIONS (DATA + RENDER)
// ===============================
const certifications = [
  {
    featured: true,
    title: "Accenture — Tech AmplifAI Program",
    date: "Sep 2025 – Jan 2026 • Completed",
    pill: "Training",
    issuer: "Accenture",
    issuerLogo: "assets/icons/issuers/accenture.png",
    description:
      "Intensive program focused on <strong>Java backend development</strong>, <strong>REST API design</strong>, and modern <strong>React practices</strong>.",
    tags: ["Java", "REST API", "Architecture", "React"],
    thumb: "assets/images/certs/accenture.png",
    pdf: "assets/certs/accenture.pdf",
  },
  {
    featured: true,
    title: "Ground Gurus — Advanced Java (Spring Framework)",
    date: "Jul – Aug 2025 • Completed",
    pill: "Certificate",
    issuer: "Ground Gurus",
    issuerLogo: "assets/icons/issuers/ground-gurus.png",
    description:
      "Completed interactive training on <strong>Spring Framework</strong> and building <strong>web apps & REST APIs</strong> using Java.",
    tags: ["Java", "Spring", "REST API"],
    thumb: "assets/images/certs/ground-gurus.png",
    pdf: "assets/certs/ground-gurus.pdf",
  },
  {
    featured: false,
    title: "Oracle Academy — Java Fundamentals",
    date: "Jun 2022 • Completed",
    pill: "Certificate",
    issuer: "Oracle Academy",
    issuerLogo: "assets/icons/issuers/oracle.png",
    description: "Core Java foundations covering <strong>OOP</strong> and programming basics.",
    tags: ["Java", "OOP"],
    thumb: "assets/images/certs/oracle-java.png",
    pdf: "assets/certs/oracle-java-fundamentals.pdf",
  },
  {
    featured: false,
    title: "System Administration",
    date: "Jun 2022 • Completed",
    pill: "Certificate",
    issuer: "Oracle Academy",
    issuerLogo: "assets/icons/issuers/oracle.png",
    description: "System administration fundamentals and basic infrastructure concepts.",
    tags: ["IT", "Admin"],
    thumb: "assets/images/certs/sysadmin.png",
    pdf: "assets/certs/system-administration.pdf",
  },
  {
    featured: false,
    title: "Huawei ICT Academy — Cloud Basics",
    date: "Aug 2025 • Completed",
    pill: "Certificate",
    issuer: "Huawei ICT Academy",
    issuerLogo: "assets/icons/issuers/huawei.png",
    description: "Cloud basics: development concepts and fundamental cloud principles.",
    tags: ["Cloud", "Basics"],
    thumb: "assets/images/certs/huawei-cloud.png",
    pdf: "", 
  },
  {
    featured: false,
    title: "Development and Basic Concepts of Cloud Computing",
    date: "Aug 2025 • Completed",
    pill: "Certificate",
    issuer: "Huawei ICT Academy",
    issuerLogo: "assets/icons/issuers/huawei.png",
    description: "Cloud Computing: Development and Basic Concepts of Cloud Computing",
    tags: ["Cloud", "Basics", "Development"],
    thumb: "assets/images/certs/Development-and-Basic-Concepts-of-Cloud-Computing.png",
    pdf: "", 
  },
];

function certCardTemplate(cert) {
  const tagsHtml = (cert.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");

  const issuerLogoHtml = cert.issuerLogo
    ? `<img class="cert-issuer-logo" src="${cert.issuerLogo}" alt="${escapeHtml(cert.issuer || "Issuer")} logo" loading="lazy">`
    : "";

  const hasPdf = !!cert.pdf;

  return `
    <article class="cert-card">
      <div class="cert-top">
        <div class="cert-issuer">
          ${issuerLogoHtml}
          <div>
            <h4 class="cert-title">${escapeHtml(cert.title)}</h4>
            <p class="cert-subtitle">${escapeHtml(cert.date || "")}</p>
          </div>
        </div>
        <span class="cert-pill">${escapeHtml(cert.pill || "Certificate")}</span>
      </div>

      ${cert.description ? `<p class="cert-desc">${cert.description}</p>` : ""}

      <div class="cert-tags">${tagsHtml}</div>

      <div class="cert-media">
        <button class="thumb-btn" type="button"
          data-title="${escapeHtml(cert.title)}"
          data-image="${cert.thumb}"
          data-pdf="${hasPdf ? cert.pdf : ""}">
          <img class="thumb" src="${cert.thumb}" alt="${escapeHtml(cert.title)} thumbnail" loading="lazy">
          <span class="thumb-overlay">Preview</span>
        </button>
      </div>

      <div class="cert-actions">
        ${
          hasPdf
            ? `<a class="cert-link" href="${cert.pdf}" target="_blank" rel="noopener noreferrer">View PDF →</a>`
            : `<span class="cert-link" style="opacity:.6;">No PDF available</span>`
        }
      </div>
    </article>
  `;
}

function renderCertifications() {
  const featuredEl = document.getElementById("cert-featured");
  const moreEl = document.getElementById("cert-more");
  const moreBtn = document.getElementById("certMoreBtn");

  if (!featuredEl || !moreEl || !moreBtn) return;

  const featured = certifications.filter((c) => c.featured);
  const more = certifications.filter((c) => !c.featured);

  featuredEl.innerHTML = featured.slice(0, 2).map(certCardTemplate).join("");
  moreEl.innerHTML = more.map(certCardTemplate).join("");

  moreBtn.style.display = more.length ? "" : "none";
}

// ===============================
// CERT MODAL (PREVIEW)
// ===============================
function openCertModal({ title, image, pdf }) {
  const modal = document.getElementById("certModal");
  const modalTitle = document.getElementById("certModalTitle");
  const modalImage = document.getElementById("certModalImage");
  const modalPdf = document.getElementById("certModalPdf");

  if (!modal || !modalTitle || !modalImage || !modalPdf) return;

  modalTitle.textContent = title || "Certificate";
  modalImage.src = image || "";
  modalImage.alt = `${title || "Certificate"} preview`;

  if (pdf) {
    modalPdf.href = pdf;
    modalPdf.target = "_blank";
    modalPdf.rel = "noopener noreferrer";
    modalPdf.style.pointerEvents = "auto";
    modalPdf.style.opacity = "1";
  } else {
    modalPdf.href = "#";
    modalPdf.style.pointerEvents = "none";
    modalPdf.style.opacity = ".6";
  }

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCertModal() {
  const modal = document.getElementById("certModal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setupCertModalEvents() {
  // Delegation so it works after injecting cards
  document.addEventListener("click", (e) => {
    const target = e.target;

    const thumbBtn = target.closest?.(".thumb-btn");
    if (thumbBtn) {
      openCertModal({
        title: thumbBtn.dataset.title,
        image: thumbBtn.dataset.image,
        pdf: thumbBtn.dataset.pdf,
      });
      return;
    }

    // Close ONLY when clicking overlay or close button (data-close="true")
    if (target?.dataset?.close === "true") {
      closeCertModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCertModal();
  });
}

// ===============================
// CERT "VIEW MORE" TOGGLE
// ===============================
function setupCertMoreToggle() {
  const btn = document.getElementById("certMoreBtn");
  const icon = document.getElementById("certMoreIcon");
  const wrap = document.getElementById("certMoreWrap");

  if (!btn || !icon || !wrap) return;

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";

    btn.setAttribute("aria-expanded", String(!expanded));
    icon.textContent = expanded ? "+" : "–";

    if (expanded) {
      // CLOSE
      wrap.style.maxHeight = wrap.scrollHeight + "px";
      requestAnimationFrame(() => {
        wrap.classList.remove("is-open");
        wrap.style.maxHeight = "0px";
        wrap.setAttribute("aria-hidden", "true");
      });
    } else {
      // OPEN
      wrap.classList.add("is-open");
      wrap.setAttribute("aria-hidden", "false");

      const h = wrap.scrollHeight;
      wrap.style.maxHeight = h + "px";

      // allow flexible height after opening
      setTimeout(() => {
        if (btn.getAttribute("aria-expanded") === "true") {
          wrap.style.maxHeight = "9999px";
        }
      }, 400);
    }
  });
}

// ===============================
// PROJECTS (your existing code below)
// ===============================

// Enhanced Projects data array with gallery and detailed information
const projects = [
  {
    title: "Salon Management System",
    type: "Capstone / Academic",
    description:
      "A web-based appointment and inquiry system designed to streamline salon operations, reduce scheduling conflicts, and improve client engagement through digital transformation.",
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
      { src: "/assets/images/salon/home.png", alt: "Landing Page Interface" },
    ],
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML", "CSS"],
    features: [
      "Online appointment scheduling with real-time slot availability",
      "Inquiry feature for client questions and service details",
      "Admin dashboard for managing clients, staff, and reports",
      "Automated email notifications and reminders",
      "Content management for services, pricing, and promotions",
      "Profile management with secure login and password recovery",
      "Virtual hairstyle preview for enhanced customer experience",
    ],
    challenges:
      "One of the main challenges was ensuring data accuracy and preventing scheduling conflicts when multiple users accessed the system simultaneously. The team also focused on building a reliable inquiry feature that provided fast, organized communication between clients and staff, while maintaining user-friendly design and secure data handling.",
    github:
      "https://github.com/IanChristopherTandog/Web-based-Appointment-System-with-Inquiry-for-Minell-s-Hair-Nail-and-Lashes-Salon",
    demo: null,
  },

  {
    title: "Marci Metzger Real Estate",
    type: "Personal",
    description:
      "Responsive real estate landing page demonstrating modern web design with React and Tailwind CSS. Originally created for a Web Builder assignment, revamped as a portfolio showcase.",
    detailedDescription: `
            <p>A modern, visually striking landing page for a real estate professional that showcases property listings and services. This project emphasizes responsive design principles and contemporary UI/UX patterns.</p>
            <p>Initially developed as an academic assignment, the project was completely redesigned and rebuilt using modern React patterns and Tailwind CSS to create a portfolio-worthy demonstration of front-end development skills.</p>
        `,
    image: "/assets/images/real-estate.png",
    imageAlt: "Marci Metzger Real Estate Landing Page",
    gallery: [
      { src: "/assets/images/real-state/home.png", alt: "Hero Section" },
      { src: "/assets/images/real-state/getSold.png", alt: "Property Listings" },
      { src: "/assets/images/real-state/services.png", alt: "Services Section" },
    ],
    tech: ["React", "Tailwind CSS"],
    features: [
      "Fully responsive design that adapts seamlessly from mobile to desktop",
      "Component-based architecture for easy maintenance and scalability",
      "Modern UI with smooth animations and micro-interactions",
      "Optimized images and lazy loading for fast page performance",
      "Clean, accessible markup following WCAG guidelines",
    ],
    challenges:
      "Achieving pixel-perfect responsiveness across all breakpoints required careful planning of the Tailwind utility classes. Created custom component variants to maintain design consistency while ensuring flexibility for different screen sizes.",
    github: "https://github.com/IanChristopherTandog/Marci-Metzger-Real-Estate",
    demo: "https://marci-metzger-real-estate.pages.dev/",
  },

  {
    title: "Warehouse Management System",
    type: "Academic",
    description:
      "Desktop application built with C# WinForms for managing warehouse operations. Features intuitive interface for products, inventory, customers, and orders with SQL Server integration.",
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
      { src: "/assets/images/warehouse/login.png", alt: "Login Screen" },
    ],
    tech: ["C#", "WinForms", "SQL Server", "ADO.NET"],
    features: [
      "Complete CRUD operations for products, inventory, customers, and orders",
      "Real-time inventory tracking with automatic stock level calculations",
      "Advanced search and filtering capabilities across all data tables",
      "Order processing workflow with status tracking and history",
      "Data validation and error handling to maintain database integrity",
      "Report generation for inventory status and order analytics",
    ],
    challenges:
      "Managing complex relationships between products, orders, and inventory required careful database schema design. Implemented transaction handling to ensure data consistency during order processing and inventory updates. Also created custom data binding mechanisms for efficient UI updates.",
    github: "https://github.com/IanChristopherTandog/warehouse-management-system",
    demo: null,
  },

  {
    title: "Tank Battle",
    type: "Personal",
    description:
      "2D action game featuring player-controlled tanks with unlockable skills, power-ups, AI-driven enemies, and boss battles. Showcases smooth combat mechanics and resource management.",
    detailedDescription: `
            <p>An engaging 2D action game that combines strategic gameplay with fast-paced combat. Players control tanks through increasingly difficult levels, managing resources and unlocking abilities to overcome challenging AI opponents.</p>
            <p>Built with Godot Engine, this project showcases game development fundamentals including physics simulation, AI behavior trees, particle effects, and responsive controls that create a polished gaming experience.</p>
        `,
    image: "/assets/images/tank.png",
    imageAlt: "Tank Battle Game Gameplay",
    gallery: [
      { src: "/assets/images/tank/gameplay.png", alt: "Gameplay Action" },
      { src: "/assets/images/tank/gameover.png", alt: "Game Over" },
      { src: "/assets/images/tank/title.png", alt: "Title Screen" },
    ],
    tech: ["Godot 3", "GDScript"],
    features: [
      "Skill progression system with multiple unlockable abilities and upgrades",
      "Diverse enemy AI with different behavior patterns and attack strategies",
      "Epic boss battles with unique mechanics and multiple phases",
      "Power-up system for temporary boosts and strategic advantages",
      "Smooth 60 FPS gameplay with responsive tank controls and physics",
      "Dynamic particle effects for weapons, explosions, and environmental elements",
    ],
    challenges:
      "Balancing gameplay difficulty while maintaining engagement was crucial. Implemented a dynamic difficulty system that adjusts enemy spawn rates and AI aggressiveness based on player performance. Optimized the game loop and collision detection to maintain consistent frame rates even with multiple entities on screen.",
    github: "https://github.com/IanChristopherTandog/Tank-Battle",
    demo: "https://ianchristophertandog.github.io/Tank-Battle/",
  },
];

// Gallery management
let currentImageIndex = 0;
let currentProjectGallery = [];
let autoSlideInterval;

// Currently Building data
const currentWork = [
  {
    title: "JRJT Repair Shop Website & Management System",
    status: "In progress",
    description: "Modernizing a local repair shop with a new website and management system.",
    tech: ["React (Vite)", "TypeScript", "Tailwind CSS"],
    focus: "Focus: UI components, design system, responsive layout",
    github: null,
    demo: "https://jrjt-frontend.vercel.app/",
    image: "/assets/images/current/jrjt.png",
    imageAlt: "JRJT Repair Shop project preview",
  },
  {
    title: "Zero2Projects",
    status: "Active",
    description: "A guided, project-based learning platform for aspiring developers.",
    tech: ["React", "Tailwind CSS", "Spring Boot", "Java", "MySQL"],
    focus: "Focus: backend APIs, SEO, UI polish",
    github: "https://github.com/IanChristopherTandog/Zero2Projects",
    demo: "https://zero2projects.vercel.app/",
    image: "/assets/images/current/zero2projects.png",
    imageAlt: "Zero2Projects project preview",
  },
];

// Render current work cards
function renderCurrentWork() {
  const container = document.getElementById("current-container");
  if (!container) return;

  container.innerHTML = "";

  currentWork.forEach((item) => {
    const card = document.createElement("article");
    card.className = "current-card";

    card.innerHTML = `
      ${item.image ? `
        <div class="current-image">
          <img src="${item.image}" alt="${item.imageAlt || item.title}" loading="lazy">
        </div>
      ` : ""}

      <div class="current-title-row">
        <h3 class="current-title">${item.title}</h3>
        <span class="current-status">${item.status}</span>
      </div>

      <p class="current-description">${item.description}</p>

      <div class="current-meta">
        ${(item.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join("")}
      </div>

      ${item.focus ? `<div class="current-focus">${item.focus}</div>` : ""}

      <div class="current-links">
        ${item.github ? `<a class="current-link" href="${item.github}" target="_blank" rel="noopener noreferrer">GitHub →</a>` : ""}
        ${item.demo ? `<a class="current-link" href="${item.demo}" target="_blank" rel="noopener noreferrer">Live Demo →</a>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}

// Generate project cards
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";
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

        <p class="project-description">${project.description}</p>

        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
        </div>

        <div class="project-links">
          <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">GitHub →</a>
          ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Live Demo →</a>` : ""}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ===== Project Modal Functions =====
function openModal(projectIndex) {
  const project = projects[projectIndex];
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalType").textContent = project.type;
  document.getElementById("modalDescription").innerHTML = project.detailedDescription;

  const techContainer = document.getElementById("modalTech");
  techContainer.innerHTML = project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("");

  const featuresContainer = document.getElementById("modalFeatures");
  featuresContainer.innerHTML = project.features.map((f) => `<li>${f}</li>`).join("");

  const challengesSection = document.getElementById("modalChallengesSection");
  if (project.challenges) {
    challengesSection.style.display = "block";
    document.getElementById("modalChallenges").innerHTML = `<p>${project.challenges}</p>`;
  } else {
    challengesSection.style.display = "none";
  }

  currentProjectGallery = project.gallery || [{ src: project.image, alt: project.imageAlt }];
  currentImageIndex = 0;
  renderGallery();

  document.getElementById("modalGithub").href = project.github;

  const demoBtn = document.getElementById("modalDemo");
  if (project.demo) {
    demoBtn.href = project.demo;
    demoBtn.style.display = "flex";
  } else {
    demoBtn.style.display = "none";
  }

  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextImage, 5000);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function renderGallery() {
  const mainImage = document.getElementById("galleryMainImage");
  if (!mainImage) return;

  mainImage.src = currentProjectGallery[currentImageIndex].src;
  mainImage.alt = currentProjectGallery[currentImageIndex].alt;

  const cur = document.getElementById("galleryCurrentIndex");
  const total = document.getElementById("galleryTotalImages");
  if (cur) cur.textContent = currentImageIndex + 1;
  if (total) total.textContent = currentProjectGallery.length;

  const thumbnailsContainer = document.getElementById("galleryThumbnails");
  if (!thumbnailsContainer) return;

  thumbnailsContainer.innerHTML = currentProjectGallery
    .map(
      (img, index) => `
        <div class="gallery-thumbnail ${index === currentImageIndex ? "active" : ""}" onclick="changeImage(${index})">
          <img src="${img.src}" alt="${img.alt}">
        </div>
      `
    )
    .join("");
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

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully");

  // Render sections (safe if not on page)
  renderCurrentWork();
  renderProjects();
  renderCertifications();

  // Setup cert behaviors
  setupCertMoreToggle();
  setupCertModalEvents();

  // Project modal listeners (safe checks)
  const modalCloseBtn = document.querySelector(".modal-close");
  const modalOverlay = document.querySelector(".modal-overlay");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
  if (prevBtn) prevBtn.addEventListener("click", prevImage);
  if (nextBtn) nextBtn.addEventListener("click", nextImage);

  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("projectModal");
    if (!modal || !modal.classList.contains("active")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });
});
