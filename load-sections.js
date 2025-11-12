document.addEventListener('DOMContentLoaded', function() {
  const sections = [
    { id: 'about', file: 'sections/about.html' },
    { id: 'projects', file: 'sections/portfolio.html' },
    { id: 'skills', file: 'sections/skills.html' }
  ];

  let loadedCount = 0;
  const totalSections = sections.length;

  sections.forEach(function(sec) {
    const container = document.getElementById(sec.id);
    if (!container) {
      loadedCount++;
      console.log('Container not found for:', sec.id);
      return;
    }
    
    console.log('Loading section:', sec.id);
    
    fetch(sec.file)
      .then(function(res) {
        if (!res.ok) throw new Error('Failed to load ' + sec.file);
        return res.text();
      })
      .then(function(html) {
        container.outerHTML = html; // replace placeholder with real section (preserves anchors)
        console.log('Loaded section:', sec.id);
        
        // Load portfolio.js after portfolio section is loaded
        if (sec.id === 'projects') {
          const script = document.createElement('script');
          script.src = 'sections/portfolio.js';
          document.body.appendChild(script);
        }

        // Increment loaded count
        loadedCount++;

        // Log when all sections are loaded
        if (loadedCount === totalSections) {
          console.log('All sections loaded!');
        }
      })
      .catch(function(err) {
        console.error('Error loading section:', sec.id, err);
        loadedCount++;
      });
  });
});
