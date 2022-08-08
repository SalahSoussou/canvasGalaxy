/**@type {HTMLCanvasElement}*/
const ctx = cnv.getContext("2d");
cnv.width = innerWidth;
cnv.height = innerHeight;


addEventListener('resize', () => {
    cnv.width = innerWidth;
    cnv.height = innerHeight;
});
function ranRang(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)
}
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    };
    update() {
        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.closePath();
    };
}

let particles;
let rdians = 0;
function init() {
    particles = []
    for (let i = 0; i < 200; i++) {
        const cnvWidth = cnv.width + 300;
        const cnvHeight = cnv.height + 300;
        let color = `hsl(${Math.random() * 360},75%, 50%)`;
        const radius = (Math.random() * 2.5) + 0.5;
        const x = (Math.random() * cnvWidth) - cnvWidth / 2;
        const y = (Math.random() * cnvHeight) - cnvHeight / 2;
        particles.push(new Particle(x, y, radius, color))
    }
}
let move = false;
let alpha = 0.9;
function animate() {
    // ctx.fillStyle = `rgba(255, 255, 255, 0.07)`;
    addEventListener('keydown', e => {
        move = true;
    })
    addEventListener('keyup', e => {
        move = false;
    })
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.save()
    ctx.translate(cnv.width / 2, cnv.height / 2);
    ctx.rotate(rdians);
    particles.forEach(particle => {
        particle.update();
    });
    ctx.restore()
    // move ? rdians += 0.009 : rdians += 0.001
    rdians += 0.005
    if (move && alpha >= 0.1) {
        alpha -= 0.01
    } else if (!move && alpha < 1) {
        alpha += 0.01
    }
    requestAnimationFrame(animate)
}
init();
animate();