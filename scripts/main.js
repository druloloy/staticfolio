document.addEventListener("DOMContentLoaded", function () {
    const stories = {
        2016: "Wanted to be a wizard. Settled for a keyboard.",
        2017: "Dreamed of building worlds with code.",
        2019: "Love–hate relationship with programming.",
        2020: "Obsessed with coding.",
        2023: "Found joy again. Won multiple comps.",
        2024: "Lost my path. Even the best fall sometimes.",
        2025: "Rebuilding. Slower, stronger.",
        2026: "You might be part of this story.",
    };

    const timelineYears = document.querySelectorAll(".timeline span");
    const subtitleElement = document.querySelector(".subtitle");
    const cursorElement = document.querySelector(".cursor");

    const animatedYears = new Set();
    let isTyping = false;

    function typewriter(element, text, onComplete) {
        if (isTyping) return;
        isTyping = true;
        element.textContent = "";
        cursorElement.style.display = "inline-block";

        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40);
            } else {
                isTyping = false;
                cursorElement.style.display = "none";
                if (onComplete) onComplete();
            }
        }
        type();
    }

    function updateContent(year) {
        if (isTyping) return;

        timelineYears.forEach((span) => {
            span.classList.toggle("active", span.dataset.year === year);
        });

        if (animatedYears.has(year)) {
            subtitleElement.textContent = stories[year];
        } else {
            typewriter(subtitleElement, stories[year], () => {
                animatedYears.add(year);
            });
        }
    }

    timelineYears.forEach((span) => {
        span.addEventListener("click", function () {
            const year = this.dataset.year;
            updateContent(year);
        });
    });

    updateContent("2016");

    const tooltip = document.getElementById("tooltip");
    const tooltipElements = document.querySelectorAll("[data-tooltip]");
    let hideTooltipTimeout;

    const tooltipText = {
        title: "The only variable name I didn't regret.",
        linkedin: "Let's connect... professionally.",
        github: "My other social life.",
        telegram: "The cooler chat app.",
        email: "Send me your best spam.",
    };

    tooltipElements.forEach((element) => {
        element.addEventListener("mouseover", (e) => {
            clearTimeout(hideTooltipTimeout);
            const key = e.currentTarget.dataset.tooltip;
            tooltip.textContent = tooltipText[key];
            tooltip.style.display = "block";
            setTimeout(() => {
                tooltip.style.opacity = "1";
            }, 10);
        });

        element.addEventListener("mousemove", (e) => {
            tooltip.style.left = `${e.clientX + 15}px`;
            tooltip.style.top = `${e.clientY + 15}px`;
        });

        element.addEventListener("mouseout", () => {
            tooltip.style.opacity = "0";
            hideTooltipTimeout = setTimeout(() => {
                tooltip.style.display = "none";
            }, 200);
        });
    });

    const canvas = document.getElementById("background-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let circles = [];
    let particles = [];
    const mouse = { x: undefined, y: undefined };

    const maxRadius = 30;
    const circleColor = "rgba(252, 252, 100, 0.25)";
    const particleColor = "rgba(252, 252, 100, 0.7)";

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    canvas.addEventListener("click", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        for (let i = circles.length - 1; i >= 0; i--) {
            const circle = circles[i];
            const dist = Math.hypot(mouseX - circle.x, mouseY - circle.y);

            if (dist - circle.radius < 1) {
                for (let j = 0; j < circle.radius * 2; j++) {
                    particles.push(
                        new Particle(
                            circle.x,
                            circle.y,
                            Math.random() * 2 + 1,
                            (Math.random() - 0.5) * (Math.random() * 6),
                            (Math.random() - 0.5) * (Math.random() * 6),
                        ),
                    );
                }
                circles.splice(i, 1);
                break;
            }
        }
    });

    class Circle {
        constructor(x, y, radius, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.minRadius = radius;
            this.dx = dx;
            this.dy = dy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = circleColor;
            ctx.fill();
        }

        update() {
            if (
                this.x + this.radius > canvas.width || this.x - this.radius < 0
            ) {
                this.dx = -this.dx;
            }
            if (
                this.y + this.radius > canvas.height || this.y - this.radius < 0
            ) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;

            if (
                mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 && mouse.y - this.y > -50
            ) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        }
    }

    class Particle {
        constructor(x, y, radius, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
            this.opacity = 1;
            this.gravity = 0.05;
            this.friction = 0.99;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = particleColor;
            ctx.fill();
            ctx.restore();
        }

        update() {
            // Movement
            this.dx *= this.friction;
            this.dy *= this.friction;
            this.dy += this.gravity;
            this.x += this.dx;
            this.y += this.dy;
            this.opacity -= 0.02;

            this.draw();
        }
    }

    function init() {
        circles = [];
        const numberOfCircles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfCircles; i++) {
            const radius = Math.random() * 4 + 2;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 0.5;
            const dy = (Math.random() - 0.5) * 0.5;
            circles.push(new Circle(x, y, radius, dx, dy));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach((circle) => {
            circle.update();
        });

        particles.forEach((particle, index) => {
            if (particle.opacity <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
            }
        });
    }

    init();
    animate();
});
