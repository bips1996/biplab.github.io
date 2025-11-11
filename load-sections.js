document.addEventListener('DOMContentLoaded', function() {
  const sections = [
    { id: 'about', file: 'sections/about.html' },
    { id: 'projects', file: 'sections/portfolio.html' },
    { id: 'skills', file: 'sections/skills.html' }
  ];

  sections.forEach(function(sec) {
    const container = document.getElementById(sec.id);
    if (!container) return;
    fetch(sec.file)
      .then(function(res) {
        if (!res.ok) throw new Error('Failed to load ' + sec.file);
        return res.text();
      })
      .then(function(html) {
        container.outerHTML = html; // replace placeholder with real section (preserves anchors)
        
        // Load portfolio.js after portfolio section is loaded
        if (sec.id === 'projects') {
          const script = document.createElement('script');
          script.src = 'sections/portfolio.js';
          document.body.appendChild(script);
        }
      })
      .catch(function(err) {
        console.error(err);
      });
  });
});
