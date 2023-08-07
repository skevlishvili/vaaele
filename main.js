var canvas = document.getElementById("myCanvas");

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 4 + 1;
        this.rotation = Math.PI * 2 * Math.random();
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.size = Math.random() * 10 + 2;
        this.xVel = Math.random() > 0.5 ? Math.random() : -Math.random();
        this.yVel = Math.random() * 3 + 1;
    }

    update() {
        this.y += this.yVel;
        this.x += this.xVel;
        this.rotation += 0.01;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}


window.onload = function() {

    // Set canvas size to full viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");

    var text = "❤️ Vaa Ele ❤️".split("");
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var size = 30;
    var amplitude = 30;
    var frequency = 0.1; // increased frequency
    var speed = 0.1; // increased speed
    var offsetX = 0;
    var step = 0;

    var confetti = [];
    for (let i = 0; i < 200; i++) {
        confetti.push(new Confetti());
    }

    ctx.font = size + "px 'Press Start 2P'";


    ctx.textAlign = "center";

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < confetti.length; i++) {
            confetti[i].update();
            confetti[i].draw(ctx);
            if (confetti[i].y > canvas.height) {
                confetti[i] = new Confetti(); // Replace off-screen confetti
            }
        }

        for (var i = 0; i < step; i++) {
            var char = text[i];

            // Alter y position based on character in string
            var yPos = y + Math.sin((i + offsetX) * frequency) * amplitude;
            var xPos = x + (i - text.length / 2) * size;

            // Create opacity transition for each character
            ctx.fillStyle = "rgba(255, 105, 180, " + Math.min(step / i, 1) + ")"; // adjust RGBA values for desired color

            ctx.fillText(char, xPos, yPos);
        }

        offsetX += speed;
        step = Math.min(step + 0.5, text.length); // increased the step increment to make characters appear faster

        requestAnimationFrame(animate);
    }

    animate();
};
