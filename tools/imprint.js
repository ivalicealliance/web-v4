// imprint.js: Export logo as PNG with filter and guides

document.addEventListener('DOMContentLoaded', function () {
  const exportBtn = document.getElementById('export-png-btn');
  exportBtn.addEventListener('click', function () {
    const logoWrap = document.querySelector('.logo-wrap');
    const logoImg = logoWrap.querySelector('.logo');
    const circleGuide = logoWrap.querySelector('.circle-guide');

    // Create a canvas
    const size = 4000;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Draw logo (with filter), filling the canvas
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = logoImg.src;
    img.onload = function () {
      ctx.save();
      ctx.filter = 'brightness(0) saturate(100%)';
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();

      // Export PNG
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'logo-black.png';
      link.click();
    };
  });
});
