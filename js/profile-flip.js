// Profile Flip Card Functionality
function initFlipCards() {
    // About section profile card
    const profileCard = document.getElementById('profileFlipCard');
    
    if (profileCard && !profileCard.dataset.initialized) {
        profileCard.dataset.initialized = 'true';
        // Toggle flip on click
        profileCard.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('flipped');
            console.log('Profile card clicked, flipped:', this.classList.contains('flipped'));
        });
    }
    
    // Homepage logo card
    const logoCard = document.getElementById('logoFlipCard');
    
    if (logoCard && !logoCard.dataset.initialized) {
        logoCard.dataset.initialized = 'true';
        // Toggle flip on click
        logoCard.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('flipped');
            console.log('Logo card clicked, flipped:', this.classList.contains('flipped'));
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initFlipCards);

// Re-initialize after a short delay (for dynamically loaded content)
setTimeout(initFlipCards, 500);
setTimeout(initFlipCards, 1000);

// Watch for dynamic content loading
const observer = new MutationObserver(function(mutations) {
    initFlipCards();
});

// Start observing the document for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});
