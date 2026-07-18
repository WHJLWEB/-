/* =========================================================================
   1. LENIS SMOOTH SCROLL ARCHITECTURE
========================================================================= */
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

/* =========================================================================
   2. GSAP SCROLLTRIGGER INTERACTIVE SUITE
========================================================================= */
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Intro Loader Trigger Sequence
window.addEventListener("load", () => {
    document.querySelectorAll(".loader-name span").forEach((span, index) => {
        span.style.setProperty("--i", index + 1);
    });

    const loader = document.getElementById("introLoader");
    
    setTimeout(() => {
        if (loader) {
            loader.classList.add("hide");
            executeHeroEntrance();
        }
    }, 3200);
});

// Fail-safe Timer
setTimeout(() => {
    const loader = document.getElementById("introLoader");
    if (loader && !loader.classList.contains("hide")) {
        loader.classList.add("hide");
        executeHeroEntrance();
    }
}, 4000);

function executeHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.to(".navbar", { y: 0, opacity: 1, duration: 1 })
      .from(".hello", { y: 30, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-title h1 span", { y: 50, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.4")
      .from(".lastname", { opacity: 0, letterSpacing: "25px", duration: 0.8 }, "-=0.6")
      .from(".hero-title h2", { y: 30, opacity: 0, duration: 0.6 }, "-=0.6")
      .from(".hero-description", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".hero-buttons a", { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.4")
      .from(".profile-orb", { scale: 0.5, opacity: 0, duration: 1, ease: "elastic.out(1, 0.75)" }, "-=0.8")
      .from(".floating-card", { scale: 0.8, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.6");

    gsap.to(".profile-orb", { y: 12, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".card-one", { y: 8, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".card-two", { y: -8, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Global Scroll Reveals (Project cards අයින් කර ඇත)
    gsap.utils.toArray(".section-heading, .about-text, .skill-card").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out"
        });
    });
}

/* =========================================================================
   3. CURSOR & INTERACTIVE PARALLAX MODULES
========================================================================= */
const orb = document.querySelector(".profile-orb");
const cardOne = document.querySelector(".card-one");
const cardTwo = document.querySelector(".card-two");

document.addEventListener("mousemove", (e) => {
    if (typeof gsap === 'undefined') return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 25;
    const y = (e.clientY / window.innerHeight - 0.5) * 25;

    if (orb && window.innerWidth > 968) {
        gsap.to(orb, { x: x, y: y, duration: 0.8, ease: "power2.out" });
        gsap.to(cardOne, { x: x * 0.5, y: y * 0.5, duration: 1 });
        gsap.to(cardTwo, { x: -x * 0.4, y: -y * 0.4, duration: 1 });
    }
});

// Magnetic Buttons
document.querySelectorAll(".primary-btn, .secondary-btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        if (typeof gsap === 'undefined') return;
        const rect = btn.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: mx * 0.25, y: my * 0.25, duration: 0.4 });
    });
    btn.addEventListener("mouseleave", () => {
        if (typeof gsap === 'undefined') return;
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    });
});

/* =========================================================================
   4. INTERACTIVE ACTIONS (NAVBAR & FORM)
========================================================================= */
const navbar = document.querySelector(".navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
    
    let currentSectionId = "";
    document.querySelectorAll("main, section").forEach(section => {
        const sectionTop = section.offsetTop - 180;
        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
});

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });
    });
}

const form = document.querySelector(".contact-form");
const submitBtn = document.querySelector(".send-btn");
const btnText = document.querySelector(".btn-text");

if (form && submitBtn && btnText) {
    form.addEventListener("submit", () => {
        btnText.innerHTML = "Sending...";
        submitBtn.style.opacity = "0.75";
        submitBtn.style.pointerEvents = "none";
    });
}

/* =========================================================================
   FORM SUBMISSION - OPEN IN NEW WINDOW
========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", () => {
            // Form එක submit වෙද්දී browser එකෙන් වෙනම tab එකක් open කරන්න සලස්වයි
            contactForm.setAttribute("target", "_blank");
        });
    }
});




/* =========================================================================
   PREMIUM AJAX SUBMISSION (NO NEW WINDOW NEEDED)
========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Page එක refresh වීම හෝ open වීම නවත්වනවා
            
            const submitBtn = contactForm.querySelector(".send-btn");
            const originalText = submitBtn.innerHTML;
            
            // Button Loading State
            submitBtn.innerHTML = "Transmitting... ⏳";
            submitBtn.style.pointerEvents = "none";
            submitBtn.style.background = "#151518";
            submitBtn.style.color = "#77777a";

            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    // Success State UI Animation
                    submitBtn.innerHTML = "Message Transmitted Successfully! ✓";
                    submitBtn.style.background = "#00e5ff";
                    submitBtn.style.color = "#000";
                    submitBtn.style.boxShadow = "0 0 30px rgba(0, 229, 255, 0.4)";
                    contactForm.reset();
                    
                    // තත්පර 4කින් බටන් එක සාමාන්‍ය තත්වයට පත් කිරීම
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.pointerEvents = "all";
                        submitBtn.style.background = "#fff";
                        submitBtn.style.boxShadow = "none";
                    }, 4000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Error State
                submitBtn.innerHTML = "Transmission Failed. Retry ⚠";
                submitBtn.style.background = "#ff3cac";
                submitBtn.style.color = "#fff";
                submitBtn.style.pointerEvents = "all";
            }
        });
    }
});
