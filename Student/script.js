document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations for Entry Experience
    gsap.registerPlugin(TextPlugin);

    // Typewriter effect for tagline
    gsap.to(".tagline", {
        duration: 2,
        text: "Hey Student! Glad you swung by.",
        ease: "power2.inOut",
        delay: 0.5
    });

    // Floating icons with yoyo effect
    gsap.to(".icon-1", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
    gsap.to(".icon-2", {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
    gsap.to(".icon-3", {
        y: -10,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Subtle bounce-in for avatar
    gsap.from(".avatar-container", {
        scale: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 1.5
    });

    // Dialogue Bubbles slide-in
    gsap.from(".dialogue-bubble", {
        x: -200,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
            trigger: ".dialogue-section",
            start: "top 80%"
        }
    });

    // Carousel cards stagger fade-in
    gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".carousel-track",
            start: "top 80%"
        }
    });

    // Call-to-action text fade-up
    gsap.from(".cta-text", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%"
        }
    });

    // Footer icons float and slow spin
    gsap.to(".footer-icons img", {
        y: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5,
        scrollTrigger: {
            trigger: ".student-footer",
            start: "top 90%"
        }
    });

    // Footer quote fade-in with delay
    gsap.from(".footer-quote", {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".student-footer",
            start: "top 90%"
        }
    });
});