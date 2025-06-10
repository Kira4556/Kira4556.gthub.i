const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Corazón en forma de partícula
function drawHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
  ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
  ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
  ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
  ctx.fillStyle = '#00aaff'; // Azul
  ctx.fill();
}

const hearts = [];

function createHeart() {
  hearts.push({
    x: Math.random() * width,
    y: -20,
    size: 6 + Math.random() * 10,
    speed: 1 + Math.random() * 2,
    alpha: 0.5 + Math.random() * 0.5
  });
}

function updateHearts() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    ctx.globalAlpha = h.alpha;
    drawHeart(h.x, h.y, h.size);
    h.y += h.speed;

    if (h.y > height + 20) {
      hearts.splice(i, 1);
      i--;
    }
  }
  ctx.globalAlpha = 1.0;
}

function animate() {
  updateHearts();
  if (Math.random() < 0.3) createHeart();
  requestAnimationFrame(animate);
}

animate();
