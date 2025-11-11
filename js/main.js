// --- Interactive Skills Section Tooltip ---
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.skills-grid');
  const tooltip = document.getElementById('skill-tooltip');
  if (!grid || !tooltip) return;

  function showTooltip(e, skill, desc) {
    tooltip.innerHTML = `<strong>${skill}</strong><br><span style='font-size:0.95em;'>${desc}</span>`;
    tooltip.style.display = 'block';
    const rect = e.target.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    tooltip.style.left = (rect.left + rect.width / 2 + scrollX - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10 + scrollY) + 'px';
  }

  function hideTooltip() {
    tooltip.style.display = 'none';
  }

  grid.querySelectorAll('.skill-logo').forEach(logo => {
    logo.addEventListener('mouseenter', e => {
      showTooltip(e, logo.dataset.skill, logo.dataset.desc);
    });
    logo.addEventListener('mouseleave', hideTooltip);
    logo.addEventListener('touchstart', e => {
      showTooltip(e, logo.dataset.skill, logo.dataset.desc);
    });
    logo.addEventListener('touchend', hideTooltip);
    logo.addEventListener('focus', e => {
      showTooltip(e, logo.dataset.skill, logo.dataset.desc);
    });
    logo.addEventListener('blur', hideTooltip);
  });
});
var i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;

var textArray = [
  "| 'Code is like humor. When you have to explain it, it’s bad.' - Cory House",
  "| 'The best way to predict the future is to invent it.' - Alan Kay",
  "| 'Software is a great combination of artistry and engineering.' - Bill Gates",
  "| 'The Internet is becoming the town square for the global village of tomorrow.' - Bill Gates",
  "| 'The computer was born to solve problems that did not exist before.' - Bill Gates",
  "| 'Simplicity is the soul of efficiency.' - Austin Freeman",
  "| 'The only thing that interferes with my learning is my education.' - Albert Einstein",
  "| 'The function of good software is to make the complex appear to be simple.' - Grady Booch",
  "| 'Any sufficiently advanced technology is indistinguishable from magic.' - Arthur C. Clarke",
];

var speedForward = 50,
  speedWait = 1000,
  speedBetweenLines = 1000,
  speedBackspace = 20;

typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("h2"),
    eParagraph = element.children("p");

  if (!isBackspacing) {
    if (i < aString.length) {
      if (aString.charAt(i) == "|") {
        isParagraph = true;

        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedBetweenLines);
      } else {
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedForward);
      }
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedWait);
    }
  } else {
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      if (eParagraph.text().length > 0) {
        eParagraph.text(
          eParagraph.text().substring(0, eParagraph.text().length - 1)
        );
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedBackspace);
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length;
      setTimeout(function () {
        typeWriter(id, ar);
      }, 50);
    }
  }
}

// --- Scroll Progress Bar ---
window.addEventListener('scroll', function() {
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  if (!scrollProgressBar) return;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  
  scrollProgressBar.style.width = scrollPercentage + '%';
});

// --- Smooth Scroll Reveal Animation ---
function revealOnScroll() {
  const reveals = document.querySelectorAll('.about-section, .project-section, #skills, .contact-section');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('reveal-active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Trigger reveal after sections are loaded
setTimeout(revealOnScroll, 500);

// --- Back to Top Button ---
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
