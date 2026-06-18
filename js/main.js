document.addEventListener("DOMContentLoaded", () => {
    // Typewriter effect for roles
    const typedRoleElement = document.getElementById("typedRole");
    const roles = ["Web Developer", "Problem Solver", "Tech Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typedRoleElement.textContent = currentRole.substring(0, charIndex--);
        } else {
            typedRoleElement.textContent = currentRole.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentRole.length + 1) {
            setTimeout(() => (isDeleting = true), 1000);
        } else if (isDeleting && charIndex === -1) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0;
        }

        const typingSpeed = isDeleting ? 75 : 150;
        setTimeout(typeEffect, typingSpeed);
    }

    if (typedRoleElement) {
        typeEffect();
    }

    /* ----- Scroll-to-Top Button ----- */
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.pageYOffset > 300);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ----- Smooth Scroll for Anchor Links ----- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', e => {

            e.preventDefault();

            const target = document.querySelector(
                anchor.getAttribute('href')
            );

            if (target) {

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }

        });

    });

    /* ----- Lazy Load Images ----- */
    if ('IntersectionObserver' in window) {

        const imgObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const img = entry.target;

                    if (img.dataset.src) {

                        img.src = img.dataset.src;

                        img.removeAttribute('data-src');

                    }

                    observer.unobserve(img);

                });

            },

            {
                rootMargin: '200px'
            }

        );

        document.querySelectorAll('img[data-src]')
            .forEach(img => imgObserver.observe(img));

    }

    /* ----- Scroll-triggered entrance animations ----- */

    if ('IntersectionObserver' in window) {

        const animObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('visible');

                    observer.unobserve(entry.target);

                });

            },

            {
                threshold: 0.15
            }

        );

        document.querySelectorAll('.animate-on-scroll')
            .forEach(el => animObserver.observe(el));

    }

});
