document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const hoursDisplay = document.getElementById('hoursTotal');
  const milestoneDisplay = document.getElementById('milestoneTotal');
  const progressBar = document.getElementById('progressBar');

  // Sample data (replace with values passed from server or via data-* attributes)
  const totalHours = 48;            // example: user has logged 48 hours
  const milestonesCompleted = 5;    // example: 5 milestones completed
  const progressPercent = 65;       // progress toward next milestone in %

  // Animate numbers
  animateCount(hoursDisplay, totalHours, 1000);
  animateCount(milestoneDisplay, milestonesCompleted, 1000);
  animateProgress(progressBar, progressPercent, 1000);
});

// Animate number counting
function animateCount(element, endValue, duration) {
  let start = 0;
  const increment = endValue / (duration / 16); // ~60fps
  const step = () => {
    start += increment;
    if (start < endValue) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(step);
    } else {
      element.textContent = endValue;
    }
  };
  step();
}

// Animate progress bar width
function animateProgress(bar, percent, duration) {
  let width = 0;
  const step = () => {
    width++;
    if (width <= percent) {
      bar.style.width = `${width}%`;
      requestAnimationFrame(step);
    }
  };
  step();
}
