(function($){
  // Simple, robust anchor scroll handler
  $(function(){
    var $root = $('html, body');

  function defaultOffset() {
    return 0; // Side navbar doesn't cover vertically
  }

  function getOffsetForHash(hash) {
    if (!hash) return defaultOffset();
    var key = hash.replace('#', '');
    if (key === 'home') return 0;
    if (key === 'projects' || key === 'portfolio') return 50;
    if (key === 'about') return 0; // All at top since side navbar
    return defaultOffset();
  }    function scrollToHash(hash) {
      if (!hash) return;

      // #home -> top
      if (hash === '#home') {
        $root.stop().animate({ scrollTop: 0 }, 500, function(){
          try { history.replaceState(null, null, hash); } catch (e) {}
        });
        return;
      }

      var id = hash.replace('#', '');
      if (id === 'portfolio') id = 'projects';

      var attempts = 0;
      var maxAttempts = 30;
      var offset = getOffsetForHash(hash);

      function tryScroll() {
        var $target = $('#' + id);
        if ($target.length) {
          // Use scrollIntoView for reliable positioning
          $target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          try { history.replaceState(null, null, hash); } catch (e) {}
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 100);
        } else {
          console.warn('Anchor target not found:', hash);
        }
      }

      tryScroll();
    }

    // Delegated click handler for anchors with hashes
    $(document).on('click', 'a[href*="#"]', function(e){
      var href = $(this).attr('href');
      if (!href) return;
      var idx = href.indexOf('#');
      if (idx < 0) return;

      var path = href.substring(0, idx);
      var hash = href.substring(idx);

      // If link points to a different page, allow navigation
      if (path && path !== '' && path !== window.location.pathname && !path.startsWith('#')) {
        return;
      }

      e.preventDefault();
      scrollToHash(hash);
      return false;
    });

    // Handle initial load hash (if present)
    var initialHash = window.location.hash;
    if (initialHash) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      // allow sections to be loaded (they are fetched async), then attempt scroll
      setTimeout(function(){ scrollToHash(initialHash); }, 300);
    }
  });
})(jQuery);
