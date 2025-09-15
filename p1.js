// GSAP Animations (Keep these as they are)
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Page load stagger reveal for all 4 sections
gsap.from(".page-section", {
    opacity: 0,
    y: 50,
    stagger: 0.3,
    duration: 1.2,
    ease: "power3.out"
});

// Typewriter and glowing text reveal for the tagline
let tagline = "Hello Visitor, Welcome to my Portfolio";
let taglineElement = document.querySelector("#tagline-section h1");

// Ensure the element is ready before animating
gsap.set(taglineElement, { opacity: 0 }); 

// Create a timeline for the text animation
let textTimeline = gsap.timeline({
  delay: 0.5 // delay the start slightly
});
textTimeline
  .to(taglineElement, {
    opacity: 1,
    duration: 0.1 // Fade in the empty element
  })
  .to(taglineElement, {
    duration: 2,
    text: tagline,
    ease: "power1.inOut"
  })
  .fromTo(taglineElement, { textShadow: "0 0 0 white" }, {
    textShadow: "0 0 10px white",
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });


// Pulse + floating effect for the Follow Me button
gsap.to("#follow-me-button", {
    scale: 1.1,
    y: -5,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// ******************************************************
// New Code for the Canvas Background
// ******************************************************
const canvas = document.getElementById('futuristic-background');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = {
    x: undefined,
    y: undefined
};

// Adjust canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class
class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset particle if it goes off-screen
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
        }

        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    for (let i = 0; i < 200; i++) {
        let size = Math.random() * 2 + 0.5;
        let x = Math.random() * (canvas.width - size * 2);
        let y = Math.random() * (canvas.height - size * 2);
        let speedX = (Math.random() * 0.5) - 0.25;
        let speedY = (Math.random() * 0.5) - 0.25;
        let color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`; // Semi-transparent white
        particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    requestAnimationFrame(animate);
}

// Start the animation
initParticles();
animate();

// Add custom cursor animations
const customCursor = document.querySelector('.custom-cursor');
const videos = document.querySelectorAll('video');

// Mouse follow effect
document.addEventListener('mousemove', (e) => {
    gsap.to(customCursor, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out'
    });
});

// Hover effect for videos
videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        gsap.to(customCursor, {
            duration: 0.3,
            scale: 2,
            opacity: 0.5
        });
    });

    video.addEventListener('mouseleave', () => {
        gsap.to(customCursor, {
            duration: 0.3,
            scale: 1,
            opacity: 1
        });
    });
});