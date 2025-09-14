// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate each mobile screen container with a staggered fade-in
gsap.from(".mobile-screen-container", {
    opacity: 0,
    y: 50,
    stagger: 0.3, // Reveals each screen with a slight delay
    duration: 1.2,
    ease: "power3.out"
});

// Animate the gradient blinds background opacity and position
gsap.fromTo(".blind", {
    opacity: 0,
    y: "-50%"
}, {
    opacity: 1,
    y: "0%",
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
    repeat: -1, // Infinite loop
    yoyo: true // Go back and forth
});

// New animation for the background gradient colors
const backgroundTimeline = gsap.timeline({
    repeat: -1,
    yoyo: true
});

backgroundTimeline
    .to(".gradient-blinds-background", {
        duration: 5,
        background: "linear-gradient(135deg, #ff6b6b, #48dbfb, #22a6b3, #be2edd)"
    })
    .to(".gradient-blinds-background", {
        duration: 5,
        background: "linear-gradient(135deg, #be2edd, #22a6b3, #48dbfb, #ff6b6b)"
    });