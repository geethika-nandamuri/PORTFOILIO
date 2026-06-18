/* =========================================
   PARTICLES.JS — Background Particle System
   =========================================

   This script initializes a simple canvas-based particle system
   that creates a dynamic, ethereal background effect.

   ========================================= */


document.addEventListener('DOMContentLoaded', () => {

    const particlesContainer = document.getElementById('particles-js');

    if (!particlesContainer) return;

    const canvas = document.createElement('canvas');

    particlesContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    let particles = [];

    const properties = {
        particleColor: "rgba(255, 255, 255, 0.4)", // Lighter, more ethereal color
        particleRadius: 1.5,
        particlesNumber: 80, // Fewer particles for a cleaner look
        lineColor: "rgba(129, 140, 248, 0.15)", // Subtle line color
        lineThickness: 0.6,
        limitConnections: true,
        maxConnections: 12,
        minDistance: 150,
        velocity: 0.4, // Slower movement
        breakPoint: 800,
    };

    // Resize canvas to fill container
    function resizeCanvas() {
        canvas.width  = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    }

    // Particle class
    class Particle {

        constructor() {
            this.x        = Math.random() * canvas.width;
            this.y        = Math.random() * canvas.height;
            this.velocityX = Math.random() * (properties.velocity * 2) - properties.velocity;
            this.velocityY = Math.random() * (properties.velocity * 2) - properties.velocity;
            this.radius   = Math.random() * properties.particleRadius + 0.5;
            this.color    = properties.particleColor;
        }

        // Update particle position
        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;

            // Bounce off edges
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.velocityX *= -1;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.velocityY *= -1;
            }
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < properties.particlesNumber; i++) {
            particles.push(new Particle());
        }
    }

    // Draw lines between particles
    function drawLines() {
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt(
                    (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2
                );

                if (distance < properties.minDistance) {
                    const opacity = 1 - (distance / properties.minDistance);
                    ctx.strokeStyle = `rgba(129, 140, 248, ${opacity * 0.15})`; // Use accent color with varying opacity
                    ctx.lineWidth   = properties.lineThickness;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawLines();
    }

    // Event listeners
    window.addEventListener('resize', resizeCanvas);

    // Initialization
    resizeCanvas();
    createParticles();
    animate();

});
