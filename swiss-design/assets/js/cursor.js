/* ========================================
   CURSOR.JS — Custom Cursor Logic
   ======================================== */

(function () {
  'use strict';

  // Skip on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow with requestAnimationFrame
  function animate() {
    // Outer circle — eased follow (smooth lag)
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;

    // Inner dot — near-instant follow
    dotX += (mouseX - dotX) * 0.6;
    dotY += (mouseY - dotY) * 0.6;
    dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

    requestAnimationFrame(animate);
  }

  animate();

  // Hover detection on interactive elements
  const interactives = 'a, button, input, textarea, [role="button"], .work__card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      cursor.classList.add('cursor--hover');
      dot.classList.add('cursor--hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      cursor.classList.remove('cursor--hover');
      dot.classList.remove('cursor--hover');
    }
  });

  // Click effect
  document.addEventListener('mousedown', () => cursor.classList.add('cursor--click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('cursor--click'));

  // Hide cursor when leaving the window
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('cursor--hidden');
    dot.classList.add('cursor--hidden');
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('cursor--hidden');
    dot.classList.remove('cursor--hidden');
  });
})();
