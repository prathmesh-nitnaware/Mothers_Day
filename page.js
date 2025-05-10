// Select the canvas element or create one dynamically
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// Array to hold particles
const particles = [];

// Particle class
class Particle {
    constructor(x, y, color, size, speedY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size; // Size will now represent the width and height of the square
        this.speedY = speedY;
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = -this.size; // Reset particle to the top
            this.x = Math.random() * canvas.width; // Randomize x position
        }
    }

    draw() {
        ctx.beginPath();
        const width = this.size * (Math.random() * 0.5 + 0.75); // Randomize width
        const height = this.size * (Math.random() * 0.5 + 0.75); // Randomize height
        ctx.rect(this.x, this.y, width, height); // Draw a rectangle
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Function to create particles
function createParticles() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 2; // Random size between 2 and 7
        const speedY = Math.random() * 2 + 1; // Random speed between 1 and 3
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        particles.push(new Particle(x, y, color, size, speedY));
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Initialize particles and start animation
createParticles();
animate();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0; // Clear existing particles
    createParticles(); // Recreate particles
});

// Select the container element
const container = document.getElementById("flip-container");

// Add a click event listener to toggle the flip class
container.addEventListener("click", () => {
    container.classList.toggle("flip");
});