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
                
                const aboutLink = navbar.querySelector('[data-about-link]');
                if (aboutLink) aboutLink.href = '../index.html#about';
                
            } else if (isResume) {
                // Configure for resume page
                const brandLink = navbar.querySelector('[data-home-link]');
                if (brandLink) brandLink.href = 'index.html';
                
                const homeLink = navbar.querySelector('[data-home-link-nav]');
                if (homeLink) homeLink.href = 'index.html';
                
                const portfolioLink = navbar.querySelector('[data-portfolio-link]');
                if (portfolioLink) portfolioLink.href = 'index.html#projects';
                
                const aboutLink = navbar.querySelector('[data-about-link]');
                if (aboutLink) aboutLink.href = 'index.html#about';
                
            } else {
                // Configure for main page
                const brandLink = navbar.querySelector('[data-home-link]');
                if (brandLink) brandLink.href = 'index.html';
                
                const homeLink = navbar.querySelector('[data-home-link-nav]');
                if (homeLink) homeLink.href = '#home';
                
                const portfolioLink = navbar.querySelector('[data-portfolio-link]');
                if (portfolioLink) portfolioLink.href = '#projects';
                
                const aboutLink = navbar.querySelector('[data-about-link]');
                if (aboutLink) aboutLink.href = '#about';
                
                // Add smooth scrolling for anchor links on main page
                setTimeout(() => {
                    const anchorLinks = navbar.querySelectorAll('a[href^="#"]');
                    anchorLinks.forEach(link => {
                        link.addEventListener('click', function(e) {
                            const href = this.getAttribute('href');
                            if (href && href !== '#' && href.startsWith('#')) {
                                e.preventDefault();
                                const targetId = href.substring(1);
                                
                                // Determine offset based on screen size
                                const isMobile = window.innerWidth <= 768;
                                const offset = isMobile ? 20 : 80;
                                
                                // Wait for sections to load if needed (with retry logic)
                                let retryCount = 0;
                                const maxRetries = 10;
                                
                                const checkAndScroll = () => {
                                    const targetElement = document.getElementById(targetId);
                                    if (targetElement) {
                                        const elementPosition = targetElement.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                                        
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                    } else if (retryCount < maxRetries) {
                                        // If element not found, try again after a short delay
                                        retryCount++;
                                        setTimeout(checkAndScroll, 100);
                                    }
                                };
                                
                                checkAndScroll();
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
