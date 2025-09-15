// Add to Student/script.js

// GSAP Register Plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger);

// Canvas Wave Animation
const waveCanvas = document.getElementById('wave-background');
const waveCtx = waveCanvas.getContext('2d');

let wavePoints = [];
let waveProperties = {
    lineColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    waveSpeedX: 0.02,
    waveSpeedY: 0.01,
    waveAmpX: 40,
    waveAmpY: 20,
    xGap: 12,
    yGap: 36
};

function resizeWaveCanvas() {
    waveCanvas.width = window.innerWidth;
    waveCanvas.height = window.innerHeight;
    initWavePoints();
}

window.addEventListener('resize', resizeWaveCanvas);
resizeWaveCanvas();

function initWavePoints() {
    wavePoints = [];
    const numX = Math.ceil(waveCanvas.width / waveProperties.xGap);
    const numY = Math.ceil(waveCanvas.height / waveProperties.yGap);
    for (let i = 0; i <= numX; i++) {
        wavePoints[i] = [];
        for (let j = 0; j <= numY; j++) {
            wavePoints[i][j] = {
                x: i * waveProperties.xGap,
                y: j * waveProperties.yGap,
                originalY: j * waveProperties.yGap,
                // Add a random offset for a more organic look
                waveOffset: Math.random() * Math.PI * 2
            };
        }
    }
}

function drawWave() {
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    waveCtx.fillStyle = waveProperties.backgroundColor;
    waveCtx.fillRect(0, 0, waveCanvas.width, waveCanvas.height);

    const time = Date.now() * 0.001;

    for (let i = 0; i < wavePoints.length; i++) {
        for (let j = 0; j < wavePoints[i].length; j++) {
            const point = wavePoints[i][j];
            // Calculate new position based on sine waves
            point.x = i * waveProperties.xGap + Math.sin(time * waveProperties.waveSpeedX + point.waveOffset) * waveProperties.waveAmpX;
            point.y = point.originalY + Math.cos(time * waveProperties.waveSpeedY + point.waveOffset) * waveProperties.waveAmpY;

            // Draw a small glowing point
            const glow = waveCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10);
            glow.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
            waveCtx.fillStyle = glow;
            waveCtx.beginPath();
            waveCtx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            waveCtx.fill();
        }
    }

    // Connect the points to form lines
    waveCtx.strokeStyle = waveProperties.lineColor;
    waveCtx.lineWidth = 1;
    for (let i = 0; i < wavePoints.length; i++) {
        waveCtx.beginPath();
        waveCtx.moveTo(wavePoints[i][0].x, wavePoints[i][0].y);
        for (let j = 1; j < wavePoints[i].length; j++) {
            waveCtx.lineTo(wavePoints[i][j].x, wavePoints[i][j].y);
        }
        waveCtx.stroke();
    }

    requestAnimationFrame(drawWave);
}

// Start the animation
drawWave();

// (The rest of your existing GSAP animations will go here, after the new canvas animation code)

document.addEventListener('DOMContentLoaded', () => {

    // Section 1: Entry Experience
    const heroTl = gsap.timeline();

    heroTl
        // Avatar animation
        .from('.avatar', {
            duration: 1.5,
            scale: 0,
            ease: 'back.out(1.7)'
        })
        .to('.shadow-reveal', {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            ease: 'power2.out'
        }, "<0.5")
        // Typewriter effect on tagline
        .to('.tagline', {
            duration: 2,
            text: {
                value: "Hey Student! Glad you swung by.",
                speed: 0.1
            },
            ease: "none"
        })
        .from('.subline', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, "-=0.5")
        .from('.hero-section .video-container', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, "-=0.5");

    // Section 2: Dialogue Bubbles
    gsap.from('.bubble', {
        scrollTrigger: {
            trigger: '.dialogue-bubbles-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1.5,
        scale: 0.5,
        opacity: 0,
        y: 100,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)'
    });

    // Hover effect for dialogue bubbles
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            gsap.to(bubble, {
                duration: 0.3,
                y: -10,
                rotation: -2,
                ease: 'power1.out',
                boxShadow: '0 10px 30px rgba(255, 126, 95, 0.5)'
            });
            gsap.to(bubble.querySelector('.video-preview-container iframe'), {
                duration: 0.5,
                opacity: 1
            });
            gsap.to(bubble.querySelector('.play-overlay'), {
                duration: 0.3,
                scale: 1.1,
                ease: 'back.out(1.7)'
            });
        });
        bubble.addEventListener('mouseleave', () => {
            gsap.to(bubble, {
                duration: 0.3,
                y: 0,
                rotation: 0,
                ease: 'power1.in',
                boxShadow: 'none'
            });
            gsap.to(bubble.querySelector('.video-preview-container iframe'), {
                duration: 0.5,
                opacity: 0.2
            });
            gsap.to(bubble.querySelector('.play-overlay'), {
                duration: 0.3,
                scale: 1,
                ease: 'power1.out'
            });
        });
    });

    // Section 3: Student-Centric Features (Carousel)
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.student-features-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        duration: 1,
        opacity: 0,
        x: -100,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Tag animation on card entry
    document.querySelectorAll('.project-card').forEach(card => {
        gsap.from(card.querySelectorAll('.tag'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.5,
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // Section 4: Call-to-Action
    const ctaTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    ctaTl
        .from('.cta-text', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power4.out',
            stagger: { each: 0.1, from: 'random' }
        })
        .from('.cta-button', {
            duration: 1,
            scale: 0.5,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, "-=0.5")
        .from('.cta-section .video-container', {
            duration: 1,
            scale: 0.5,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, "-=0.8");

    // Section 5: Student Footer
    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    footerTl
        .from('.footer-quote', {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: 'power2.out'
        })
        .from('.footer-icons .footer-icon', {
            duration: 1,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: 'power2.out'
        }, "-=0.5");

    // Floating orbit animation for footer icons
    const icons = document.querySelectorAll('.footer-icon');
    icons.forEach((icon, index) => {
        gsap.to(icon, {
            y: () => (Math.random() - 0.5) * 20, // Small random vertical float
            x: () => (Math.random() - 0.5) * 20, // Small random horizontal float
            rotation: () => (Math.random() - 0.5) * 10,
            duration: 3 + Math.random(),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2 // Stagger the start
        });
    });

});