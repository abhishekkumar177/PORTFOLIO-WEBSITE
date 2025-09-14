// Import the GSAP library in your HTML file:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>

// And the ScrollTrigger plugin for the scroll snap effect:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>

gsap.registerPlugin(ScrollTrigger);

// Page load stagger reveal for all 4 sections
gsap.from(".page-section", {
    opacity: 0,
    y: 50,
    stagger: 0.3, // Reveals each section with a slight delay
    duration: 1.2,
    ease: "power3.out"
});

// Typewriter and glowing text reveal for the tagline
let tagline = "Hello Visitor, Welcome to my Portfolio";
let taglineElement = document.querySelector("#tagline-section h1");
taglineElement.textContent = ""; // Start with an empty string

gsap.to(taglineElement, {
    duration: 2,
    text: tagline, // The GSAP TextPlugin is great for this, but a simple loop can work too.
    ease: "power1.inOut"
});

// Animate the text glow after the typewriter effect completes
gsap.fromTo(taglineElement, { textShadow: "0 0 0 white" }, {
    textShadow: "0 0 10px white",
    duration: 1,
    repeat: -1, // Infinite repeat
    yoyo: true, // Go back and forth
    delay: 2 // Start after the text has been "typed out"
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