// Ensure GSAP and its plugins are loaded before this script runs
document.addEventListener('DOMContentLoaded', () => {

    // GSAP Register Plugins
    gsap.registerPlugin(TextPlugin, ScrollTrigger);

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

// New Code for the Canvas Video Background
const canvas = document.getElementById('video-background-canvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('background-video');

// Adjust canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Animation loop to draw video on canvas
function drawVideoOnCanvas() {
    // Check if the video is ready to be drawn
    if (video.readyState >= 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio to fit the video to the canvas without stretching
        const videoRatio = video.videoWidth / video.videoHeight;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, xOffset, yOffset;

        if (videoRatio > canvasRatio) {
            // Video is wider than canvas
            drawHeight = canvas.height;
            drawWidth = drawHeight * videoRatio;
            xOffset = (canvas.width - drawWidth) / 2;
            yOffset = 0;
        } else {
            // Video is taller than canvas
            drawWidth = canvas.width;
            drawHeight = drawWidth / videoRatio;
            xOffset = 0;
            yOffset = (canvas.height - drawHeight) / 2;
        }

        // Draw the video frame onto the canvas
        ctx.drawImage(video, xOffset, yOffset, drawWidth, drawHeight);
    }
    requestAnimationFrame(drawVideoOnCanvas);
}

// Start drawing the video once it's loaded
video.addEventListener('loadedmetadata', () => {
    drawVideoOnCanvas();
});

// If the video is already loaded, start the drawing
if (video.readyState >= 2) {
    drawVideoOnCanvas();
}