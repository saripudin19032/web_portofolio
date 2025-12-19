document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Organize only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle
    const btnMenu = document.getElementById('btn-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (btnMenu && mobileMenu) {
        btnMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Animate items interacting
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('fade-in-down');
            }
        });
    }

    // Smooth scroll for anchor links (if browser doesn't support scroll-behavior: smooth perfectly)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu on click
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Active Link Highlight (Scroll Spy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isButton = link.classList.contains('bg-slate-900') || link.classList.contains('bg-primary');

            if (current && href.includes(current)) {
                // Active State
                if (isButton) {
                    link.classList.remove('bg-slate-900', 'hover:bg-slate-800');
                    link.classList.add('bg-primary', 'hover:bg-indigo-600');
                } else {
                    link.classList.remove('text-slate-600');
                    link.classList.add('text-primary');
                }
            } else {
                // Inactive State
                if (isButton) {
                    link.classList.remove('bg-primary', 'hover:bg-indigo-600');
                    link.classList.add('bg-slate-900', 'hover:bg-slate-800');
                } else {
                    link.classList.remove('text-primary');
                    link.classList.add('text-slate-600');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();

});
