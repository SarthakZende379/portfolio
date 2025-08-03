// Interactive Constellation Background
class ConstellationBackground {
    constructor() {
        this.canvas = document.getElementById('constellation-bg');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.mouse = { x: null, y: null };
        this.init();
        this.animate();
        
        // Event listeners
        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    init() {
        // Set canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Create stars
        this.stars = [];
        const numStars = Math.floor((this.canvas.width * this.canvas.height) / 10000);
        
        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2
            });
        }
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw stars
        this.stars.forEach((star, i) => {
            // Update position
            star.x += star.vx;
            star.y += star.vy;
            
            // Wrap around edges
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
            
            // Draw star
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
            this.ctx.fill();
            
            // Draw connections to nearby stars
            this.stars.slice(i + 1).forEach(otherStar => {
                const distance = Math.sqrt(
                    Math.pow(star.x - otherStar.x, 2) + 
                    Math.pow(star.y - otherStar.y, 2)
                );
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(star.x, star.y);
                    this.ctx.lineTo(otherStar.x, otherStar.y);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
            
            // Draw connections to mouse
            if (this.mouse.x && this.mouse.y) {
                const mouseDistance = Math.sqrt(
                    Math.pow(star.x - this.mouse.x, 2) + 
                    Math.pow(star.y - this.mouse.y, 2)
                );
                
                if (mouseDistance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(star.x, star.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${0.5 * (1 - mouseDistance / 100)})`;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Projects Data - Easy to add new projects here
const projectsData = [
    {
        title: "Spotify ETL Data Pipeline",
        description: "Built end-to-end ETL pipeline to extract 150-track Spotify playlist daily using CloudWatch + Lambda, transform with Pandas, and store results in Amazon S3. Achieved sub 2s Lambda runtime and 100% pipeline success over 30+ daily executions.",
        image: "https://github.com/SarthakZende379/Spotify-ETL-Data-Pipeline-using-AWS-Services/raw/main/Screenshots/Spotify_Data_Pipeline.png",
        techStack: ["AWS Lambda", "Python", "Pandas", "S3", "CloudWatch", "Glue", "Athena"],
        githubLink: "https://github.com/SarthakZende379/Spotify-ETL-Data-Pipeline-using-AWS-Services",
        liveLink: null,
        duration: "May 2025 - June 2025"
    },
    {
        title: "Social Media End-to-End Data Pipeline",
        description: "Led team of 2 to architect data integration solution that processed 5.8M+ posts. Implemented Docker containerization and Faktory-based distributed processing for 65% faster data ingestion. Created interactive analytics dashboard with 95% code reliability.",
        image: "https://github.com/SarthakZende379/Social-Media-end-to-end-data-pipeline/blob/main/social-media.png?raw=true",
        techStack: ["Python", "Docker", "Faktory", "Flask", "Plotly", "PyTest", "API Integration"],
        githubLink: "https://github.com/SarthakZende379/Social-Media-end-to-end-data-pipeline",
        liveLink: null,
        duration: "Sept 2024 - Dec 2024"
    },
    {
        title: "Bing Shell - Custom Shell Implementation",
        description: "Designed custom UNIX-like shell using C and System Programming with comprehensive I/O redirection, pipe handling, and job control. Implemented robust signal handling system with persistent command history for efficient command recall functionality.",
        image: "https://github.com/SarthakZende379/BingShell/blob/main/binghsell.png?raw=true",
        techStack: ["C", "System Programming", "UNIX", "Signal Handling", "Process Management"],
        githubLink: "https://github.com/SarthakZende379/BingShell",
        liveLink: null,
        duration: "Oct 2024 - Nov 2024"
    }
];

// Function to create project cards dynamically
function createProjectCards() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-duration">${project.duration}</p>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.githubLink ? `
                        <a href="${project.githubLink}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> Code
                        </a>
                    ` : ''}
                    ${project.liveLink ? `
                        <a href="${project.liveLink}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu on link click
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        hamburger.classList.toggle('active');
    });
}

// Add mobile menu styles dynamically
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu.mobile-active {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                flex-direction: column;
                background: var(--bg-secondary);
                padding: 10px 0;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                border-top: 1px solid var(--glass-border);
                align-items: center;
                gap: 0;
            }

            .nav-menu.mobile-active li {
                width: 100%;
                text-align: center;
            }

            .nav-menu.mobile-active .nav-link {
                padding: 15px;
                display: block;
                width: 100%;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation to sections and cards
    const elementsToAnimate = document.querySelectorAll('.skills-section, .experience-section, .projects-section, .contact-section, .education-section, .certifications-section, .timeline-item, .project-card, .tool-card, .education-card, .certification-card, .category');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if(!heroTitle) return;
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.minHeight = '24px';
    
    let index = 0;
    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 500);
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ConstellationBackground();
    addMobileMenuStyles();
    createProjectCards();
    initSmoothScrolling();
    initNavbarScroll();
    initMobileMenu();
    initScrollAnimations();
    initTypingEffect();
    
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Console easter egg
console.log('%c Welcome to Sarthak\'s Portfolio! 🚀', 'color: #FFD700; font-size: 20px; font-weight: bold;');
console.log('%c Built with passion and lots of coffee ☕', 'color: #8B949E; font-size: 14px;');
console.log('%c Want to work together? Reach out at szende@binghamton.edu', 'color: #00BFFF; font-size: 14px;');