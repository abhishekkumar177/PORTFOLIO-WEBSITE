gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Entry Experience Animations
let taglineElement = document.querySelector("#entry-experience .tagline");
gsap.set(taglineElement, { opacity: 0 }); 

let entryTimeline = gsap.timeline({ delay: 0.5 });
entryTimeline
  .to(taglineElement, {
    opacity: 1,
    duration: 0.1
  })
  .to(taglineElement, {
    duration: 2,
    text: taglineElement.textContent,
    ease: "power1.inOut"
  });

gsap.from(".hero-avatar", {
    scale: 0,
    ease: "elastic.out(1, 0.3)",
    duration: 1.5
});

gsap.from(".hero-content .subline, .hero-video", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
});


// Dialogue Bubbles Animation
gsap.from(".dialogue-bubble", {
    opacity: 0,
    y: 100,
    stagger: 0.3,
    duration: 1.2,
    ease: "elastic.out(1, 0.5)",
    scrollTrigger: {
        trigger: "#dialogue-bubbles",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Student-Centric Features Animation (Carousel)
gsap.set(".carousel-item", {
    opacity: 0,
    y: 100,
    rotation: 10,
    transformOrigin: "center bottom"
});

gsap.to(".carousel-item", {
    opacity: 1,
    y: 0,
    rotation: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".carousel-container",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Call-to-Action Animations
gsap.from("#cta-button", {
    scale: 0,
    ease: "back.out(1.7)",
    duration: 1.5,
    scrollTrigger: {
        trigger: "#call-to-action",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from(".cta-text", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#call-to-action",
        start: "top 85%",
        toggleActions: "play none none none"
    }
});

// Student Footer Animations
gsap.from(".footer-quote, .footer-icons", {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#student-footer",
        start: "top 90%",
        toggleActions: "play none none none"
    }
});

gsap.to(".footer-icons .icon", {
    y: -10,
    duration: 1,
    repeat: -1,
    yoyo: true,
    stagger: 0.2,
    ease: "power1.inOut"
});