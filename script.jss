// ========== Page Navigation System ==========

(function () {
    // Track current page
    let currentPage = 'home';
    let isTransitioning = false;

    // DOM elements
    const pages = {
        home: document.getElementById('page-home'),
        explore: document.getElementById('page-explore'),
        about: document.getElementById('page-about'),
        experiences: document.getElementById('page-experiences'),
        contact: document.getElementById('page-contact')
    };

    const navLinks = {
        explore: document.getElementById('nav-explore'),
        experiences: document.getElementById('nav-experiences'),
        about: document.getElementById('nav-about')
    };

    const brandLogo = document.getElementById('brand-logo');
    const scrollArrow = document.getElementById('scroll-arrow');
    const transitionWipe = document.querySelector('.transition-wipe');

    // ---- Navigate to a page ----
    function navigateTo(targetPage) {
        if (targetPage === currentPage || isTransitioning) return;
        isTransitioning = true;

        const currentEl = pages[currentPage];
        const targetEl = pages[targetPage];

        if (!targetEl) { isTransitioning = false; return; }

        // Fire transition overlay
        transitionWipe.classList.remove('active');
        void transitionWipe.offsetWidth; // force reflow
        transitionWipe.classList.add('active');

        // Slide out current page
        currentEl.classList.remove('active', 'slide-in');
        currentEl.classList.add('slide-out');

        // After a short delay, bring in the new page
        setTimeout(function () {
            currentEl.classList.remove('slide-out');
            currentEl.style.opacity = '0';
            currentEl.style.visibility = 'hidden';

            // Prepare target
            targetEl.style.opacity = '';
            targetEl.style.visibility = '';
            targetEl.classList.remove('slide-out');
            targetEl.classList.add('active', 'slide-in');

            // Update nav active state
            updateNav(targetPage);

            // Hide or show scroll arrow based on whether we are on the contact page
            if (targetPage === 'contact') {
                scrollArrow.style.display = 'none';
            } else {
                scrollArrow.style.display = '';
            }

            currentPage = targetPage;

            // Cleanup after animation completes
            setTimeout(function () {
                isTransitioning = false;
                transitionWipe.classList.remove('active');
            }, 800);
        }, 350);
    }

    // ---- Update active nav link ----
    function updateNav(activePage) {
        Object.values(navLinks).forEach(function (link) {
            link.classList.remove('active');
        });

        if (navLinks[activePage]) {
            navLinks[activePage].classList.add('active');
        }
    }

    // ---- Nav link clicks ----
    Object.keys(navLinks).forEach(function (key) {
        navLinks[key].addEventListener('click', function (e) {
            e.preventDefault();
            var page = this.getAttribute('data-page');

            if (page === 'about') {
                navigateTo('about');
            } else if (page === 'experiences') {
                navigateTo('experiences');
            } else if (page === 'explore') {
                navigateTo('explore');
            }
        });
    });

    // ---- Scroll arrow -> go to next page ----
    scrollArrow.addEventListener('click', function () {
        if (currentPage === 'home') {
            navigateTo('about');
        } else if (currentPage === 'about') {
            navigateTo('experiences');
        } else if (currentPage === 'experiences') {
            navigateTo('explore');
        } else if (currentPage === 'explore') {
            navigateTo('home');
        }
    });

    // ---- ROGUE logo -> go home ----
    brandLogo.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo('home');
    });

    // ---- Start With Rogue button -> go to contact ----
    const btnStartRogue = document.getElementById('btn-start-rogue');
    if (btnStartRogue) {
        btnStartRogue.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo('contact');
        });
    }

    // ---- Keyboard: Escape goes home ----
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            navigateTo('home');
        }
    });

})();
