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