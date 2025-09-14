// Function to handle animations on page load
function animateRoles() {
    // Animate the student section (slide in from left)
    gsap.from(".role-division.student", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
    });

    // Animate the viewer section (fade in)
    gsap.from(".role-division.viewer", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 1.0
    });

    // Animate the contributor section (slide in from right)
    gsap.from(".role-division.contributor", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.5
    });

    // Animate the recruiter section (zoom in)
    gsap.from(".role-division.recruiter", {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 2.0
    });
}

// Run the animation function once the page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    animateRoles();
});