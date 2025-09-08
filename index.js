document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;

    // Theme color palettes
    const lightModeColors = ['#7ac4ff', '#ff4d6d', '#ffce54'];
    const darkModeColors = ['#6c63ff', '#7b439c', '#3182ce', '#ed8936'];
    let currentColors;

    // Set initial colors based on current theme
    if (body.classList.contains('dark-mode')) {
        currentColors = darkModeColors;
        moonIcon.innerHTML = '<i class="bx bxs-sun"></i>';
    } else {
        currentColors = lightModeColors;
        moonIcon.innerHTML = '<i class="bx bx-moon"></i>';
    }
    
    moonIcon.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            currentColors = darkModeColors;
            moonIcon.innerHTML = '<i class="bx bxs-sun"></i>';
        } else {
            currentColors = lightModeColors;
            moonIcon.innerHTML = '<i class="bx bx-moon"></i>';
        }
    });

    // Skills Tab Switcher
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.skills-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button and corresponding content
            const tabName = button.getAttribute('data-tab');
            const targetContent = document.querySelector(`.skills-content[data-content="${tabName}"]`);
            
            button.classList.add('active');
            targetContent.classList.add('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.navbar a[href*="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);


    // Scroll Float Animation for Projects
    const projectCards = document.querySelectorAll('.projects-section .project-card');
    const handleScrollFloat = () => {
        const scrollY = window.pageYOffset;
        projectCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (cardCenter - viewportCenter) * 0.1;
            card.style.transform = `translateY(${offset}px)`;
        });
    };

    window.addEventListener('scroll', handleScrollFloat);
    handleScrollFloat(); // Run on load to set initial positions

    // Scroll Reveal Animation for Experience Items
    const experienceItems = document.querySelectorAll('.experience-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    experienceItems.forEach(item => {
        observer.observe(item);
    });


    // --- Combined Background Animations --- 
    const canvas = document.getElementById('liquid-background');
    const ctx = canvas.getContext('2d');
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let particles = [];
    let blobs = [];

    // Set canvas size
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Blob {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = { x: velocity.x, y: velocity.y };
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.velocity.y = -this.velocity.y;
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = color;
            this.alpha = 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.01;
            if (this.alpha < 0) this.alpha = 0;
            this.size *= 0.98;
        }
        draw() {
            const hexColor = this.color.slice(1);
            const r = parseInt(hexColor.substring(0, 2), 16);
            const g = parseInt(hexColor.substring(2, 4), 16);
            const b = parseInt(hexColor.substring(4, 6), 16);

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }


    function init() {
        // Initialize Blobs
        blobs = [];
        const blobColors = body.classList.contains('dark-mode') ? darkModeColors : lightModeColors;
        for (let i = 0; i < 5; i++) {
            const radius = 100 + Math.random() * 150;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const velocity = {
                x: (Math.random() - 0.5) * 1,
                y: (Math.random() - 0.5) * 1
            };
            const color = blobColors[Math.floor(Math.random() * blobColors.length)];
            blobs.push(new Blob(x, y, radius, color, velocity));
        }

        // Initialize Particles with mousemove listener
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
            for (let i = 0; i < 5; i++) {
                particles.push(new Particle(mouse.x, mouse.y, currentColors[Math.floor(Math.random() * currentColors.length)]));
            }
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw blobs
        blobs.forEach(blob => {
            blob.update();
            blob.draw();
        });
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size < 0.3) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    window.addEventListener('resize', setCanvasSize);
    
    setCanvasSize();
    init();
    animate();

});