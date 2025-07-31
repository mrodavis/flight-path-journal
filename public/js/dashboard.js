document.addEventListener('DOMContentLoaded', () => {
  const hoursDisplay = document.getElementById('hoursTotal');
  const milestoneDisplay = document.getElementById('milestoneTotal');
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');

  const totalHours = parseInt(hoursDisplay?.dataset.count || 0);
  const totalMilestones = parseInt(milestoneDisplay?.dataset.count || 0);
  const progressPercent = parseFloat(progressBar?.dataset.progress || 0);

  animateCount(hoursDisplay, totalHours, 1000);
  animateCount(milestoneDisplay, totalMilestones, 1000);
  animateProgress(progressBar, progressLabel, progressPercent, 1000);
});

function animateCount(element, endValue, duration) {
  if (!element) return;
  let start = 0;
  const stepTime = 16;
  const increment = endValue / (duration / stepTime);

  function step() {
    start += increment;
    if (start < endValue) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(step);
    } else {
      element.textContent = endValue;
    }
  }

  requestAnimationFrame(step);
}

function animateProgress(bar, label, percent, duration) {
  if (!bar || !label) return;

  const startTime = performance.now();
  const startWidth = 0;

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const width = percent * progress;
    bar.style.width = `${width}%`;
    label.textContent = `${Math.round(width)}%`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
