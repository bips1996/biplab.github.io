(function () {
  const dataUrl = './sections/portfolio-data.json';
  const container = document.querySelector('.project .container');

  if (!container) {
    console.error('Portfolio container not found');
    return;
  }

  fetch(dataUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load portfolio data');
      return res.json();
    })
    .then(function (data) {
      renderProjects(data.projects || [], container);
    })
    .catch(function (err) {
      console.error('Error loading portfolio:', err);
      container.innerHTML = '<p style="color: #fff; text-align: center;">Failed to load projects.</p>';
    });

  function renderProjects(projects, container) {
    container.innerHTML = '';

    projects.forEach(function (project) {
      // Create card
      const box = document.createElement('div');
      box.className = 'box';
      box.onclick = function () {
        window.open(project.url, '_blank');
      };

      // Create header
      const header = document.createElement('div');
      header.className = 'repo-header';

      const icon = document.createElement('i');
      icon.className = 'fa ' + project.icon + ' icon';

      const title = document.createElement('h1');
      title.className = 'title';
      title.textContent = project.title;

      header.appendChild(icon);
      header.appendChild(title);

      // Create body
      const body = document.createElement('div');
      body.className = 'repo-body';

      const desc = document.createElement('p');
      desc.className = 'desc';
      desc.textContent = project.description;

      const tags = document.createElement('div');
      tags.className = 'repo-tags';

      project.technologies.forEach(function (tech) {
        const tag = document.createElement('span');
        tag.className = 'repo-tag';
        tag.textContent = tech;
        tags.appendChild(tag);
      });

      body.appendChild(desc);
      body.appendChild(tags);

      // Create footer
      const footer = document.createElement('div');
      footer.className = 'repo-footer';

      const langStat = document.createElement('div');
      langStat.className = 'repo-stat';

      const langDot = document.createElement('span');
      langDot.className = 'language-dot ' + project.languageClass;

      const langText = document.createElement('span');
      langText.textContent = project.language;

      langStat.appendChild(langDot);
      langStat.appendChild(langText);

      const categoryStat = document.createElement('div');
      categoryStat.className = 'repo-stat';

      const categoryIcon = document.createElement('i');
      categoryIcon.className = 'fa ' + project.categoryIcon;

      const categoryText = document.createElement('span');
      categoryText.textContent = project.category;

      categoryStat.appendChild(categoryIcon);
      categoryStat.appendChild(categoryText);

      footer.appendChild(langStat);
      footer.appendChild(categoryStat);

      // Assemble card
      box.appendChild(header);
      box.appendChild(body);
      box.appendChild(footer);

      // Add to container
      container.appendChild(box);
    });
  }
})();
