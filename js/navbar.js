// Navbar loader - dynamically loads and configures the navbar
(function() {
    // Determine base path and page type
    const isTimeline = window.location.pathname.includes('/timeline');
    const isResume = window.location.pathname.includes('resume.html');
    const basePath = isTimeline ? '..' : '.';
    
    // Load navbar HTML
    fetch(`${basePath}/navbar.html`)
        .then(response => response.text())
        .then(html => {
            // Create temporary container
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            // Get navbar element
            const navbar = temp.querySelector('.navbar');
            
            // Update paths based on current page
            if (isTimeline) {
                // Update logo path
                const logo = navbar.querySelector('.brand-logo');
                if (logo) logo.src = '../images/bips_logo.png';
                
                // Update brand link
                const brandLink = navbar.querySelector('[data-home-link]');
                if (brandLink) brandLink.href = '../index.html';
                
                // Configure nav links for timeline page
                const homeLink = navbar.querySelector('[data-home-link-nav]');
                if (homeLink) homeLink.href = '../index.html';
                
                const portfolioLink = navbar.querySelector('[data-portfolio-link]');
                if (portfolioLink) portfolioLink.href = '../index.html#projects';
                
                const contactLink = navbar.querySelector('[data-contact-link]');
                if (contactLink) contactLink.href = '../index.html#contact';
                
            } else if (isResume) {
                // Configure for resume page
                const brandLink = navbar.querySelector('[data-home-link]');
                if (brandLink) brandLink.href = 'index.html';
                
                const homeLink = navbar.querySelector('[data-home-link-nav]');
                if (homeLink) homeLink.href = 'index.html';
                
                const portfolioLink = navbar.querySelector('[data-portfolio-link]');
                if (portfolioLink) portfolioLink.href = 'index.html#projects';
                
                const contactLink = navbar.querySelector('[data-contact-link]');
                if (contactLink) contactLink.href = 'index.html#contact';
                
            } else {
                // Configure for main page
                const brandLink = navbar.querySelector('[data-home-link]');
                if (brandLink) brandLink.href = 'index.html';
                
                const homeLink = navbar.querySelector('[data-home-link-nav]');
                if (homeLink) homeLink.href = '#home';
                
                const portfolioLink = navbar.querySelector('[data-portfolio-link]');
                if (portfolioLink) portfolioLink.href = '#projects';
                
                const contactLink = navbar.querySelector('[data-contact-link]');
                if (contactLink) contactLink.href = '#contact';
                
                // Add smooth scrolling for anchor links on main page
                setTimeout(() => {
                    const anchorLinks = navbar.querySelectorAll('a[href^="#"]');
                    anchorLinks.forEach(link => {
                        link.addEventListener('click', function(e) {
                            const href = this.getAttribute('href');
                            if (href && href !== '#' && href.startsWith('#')) {
                                e.preventDefault();
                                const targetId = href.substring(1);
                                const targetElement = document.getElementById(targetId);
                                if (targetElement) {
                                    targetElement.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }
                            }
                        });
                    });
                }, 100);
            }
            
            // Insert navbar at the beginning of body
            document.body.insertBefore(navbar, document.body.firstChild);
        })
        .catch(error => console.error('Error loading navbar:', error));
})();
