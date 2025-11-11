document.addEventListener('DOMContentLoaded', function () {
  const dataUrl = 'timeline-data.json';

  fetch(dataUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(function (data) {
      renderSection(data.work_experience || [], document.getElementById('workContainer'), 'work');
      renderSection(data.academics || [], document.getElementById('academicsContainer'), 'academics');
    })
    .catch(function (err) {
      console.error('Failed to load timeline data:', err);
      var msg = document.createElement('div');
      msg.style.color = '#e0e0e0';
      msg.style.padding = '10px';
      msg.textContent = 'Failed to load timeline data.';
      document.body.appendChild(msg);
    });

  function renderSection(items, container, type) {
    if (!container) return;
    container.innerHTML = '';

    items.forEach(function (item, index) {
      var sideClass = index % 2 === 0 ? 'timeline-block timeline-block-left' : 'timeline-block timeline-block-right';

      var block = document.createElement('div');
      block.className = sideClass;

      var marker = document.createElement('div');
      marker.className = 'marker';
      marker.title = 'Click to expand';

      var content = document.createElement('div');
      content.className = 'timeline-content';

      // Add logo for work experience or icon for academics
      if (type === 'work' && item.logo) {
        var logo = document.createElement('img');
        logo.className = 'timeline-logo';
        logo.src = item.logo;
        logo.alt = item.company + ' logo';
        logo.onerror = function() {
          // Fallback if logo doesn't load
          this.style.display = 'none';
        };
        content.appendChild(logo);
      } else if (type === 'academics' && item.icon) {
        var iconDiv = document.createElement('div');
        iconDiv.className = 'timeline-icon';
        iconDiv.innerHTML = '<i class="fa fa-' + item.icon + '"></i>';
        content.appendChild(iconDiv);
      }

      // Period (h3)
      var h3 = document.createElement('h3');
      h3.textContent = item.period || '';
      content.appendChild(h3);

      // Title
      if (item.title) {
        var titleSpan = document.createElement('span');
        titleSpan.className = 'timeline-title';
        titleSpan.textContent = item.title;
        content.appendChild(titleSpan);
      }

      // Company/Institution
      var orgName = item.company || item.institution || '';
      if (orgName) {
        var companySpan = document.createElement('span');
        companySpan.className = 'timeline-company';
        companySpan.textContent = orgName;
        content.appendChild(companySpan);
      }

      // Department (for academics)
      if (item.department) {
        var deptSpan = document.createElement('span');
        deptSpan.className = 'timeline-company';
        deptSpan.textContent = item.department;
        deptSpan.style.fontSize = '0.9rem';
        deptSpan.style.color = '#9aabbd';
        content.appendChild(deptSpan);
      }

      // Location
      if (item.location) {
        var locationSpan = document.createElement('span');
        locationSpan.className = 'timeline-location';
        locationSpan.textContent = item.location;
        content.appendChild(locationSpan);
      }

      // Description
      if (item.description) {
        var descP = document.createElement('p');
        descP.className = 'timeline-description';
        descP.textContent = item.description;
        content.appendChild(descP);
      }

      // Technologies (for work experience)
      if (item.technologies && item.technologies.length > 0) {
        var tagsDiv = document.createElement('div');
        tagsDiv.className = 'timeline-tags';
        item.technologies.forEach(function(tech) {
          var tag = document.createElement('span');
          tag.className = 'timeline-tag';
          tag.textContent = tech;
          tagsDiv.appendChild(tag);
        });
        content.appendChild(tagsDiv);
      }

      // Achievements
      if (item.achievements && item.achievements.length > 0) {
        var achievementsList = document.createElement('ul');
        achievementsList.className = 'timeline-achievements';
        item.achievements.forEach(function(achievement) {
          var li = document.createElement('li');
          li.textContent = achievement;
          achievementsList.appendChild(li);
        });
        content.appendChild(achievementsList);
      }

      block.appendChild(marker);
      block.appendChild(content);
      container.appendChild(block);
    });
  }
});
