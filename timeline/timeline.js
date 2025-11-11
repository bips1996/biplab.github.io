document.addEventListener('DOMContentLoaded', function () {
  const dataUrl = 'timeline-data.json';

  fetch(dataUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(function (data) {
      renderSection(data.work_experience || [], document.getElementById('workContainer'));
      renderSection(data.academics || [], document.getElementById('academicsContainer'));
    })
    .catch(function (err) {
      console.error('Failed to load timeline data:', err);
      // Optionally show a small message on the page
      var msg = document.createElement('div');
      msg.style.color = '#e0e0e0';
      msg.style.padding = '10px';
      msg.textContent = 'Failed to load timeline data.';
      document.body.appendChild(msg);
    });

  function renderSection(items, container) {
    if (!container) return;
    container.innerHTML = '';

    items.forEach(function (item, index) {
      var sideClass = index % 2 === 0 ? 'timeline-block timeline-block-left' : 'timeline-block timeline-block-right';

      var block = document.createElement('div');
      block.className = sideClass;

      var marker = document.createElement('div');
      marker.className = 'marker';

      var content = document.createElement('div');
      content.className = 'timeline-content';

      var h3 = document.createElement('h3');
      h3.textContent = item.period || '';
      content.appendChild(h3);

      if (item.title) {
        var s1 = document.createElement('span');
        s1.textContent = item.title;
        content.appendChild(s1);
        content.appendChild(document.createElement('br'));
      }

      var second = item.company || item.institution || '';
      if (second) {
        var s2 = document.createElement('span');
        // preserve comma-separated pieces on separate lines where appropriate
        s2.innerHTML = second.split(', ').join('<br/>');
        content.appendChild(s2);
      }

      block.appendChild(marker);
      block.appendChild(content);
      container.appendChild(block);
    });
  }
});
