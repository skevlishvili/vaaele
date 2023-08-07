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

class Shiba {
    constructor(image) {
        this.image = image;
        this.scale = 0.1; // Scale factor for the image size
        this.width = this.image.width * this.scale; // Adjusted image width
        this.height = this.image.height * this.scale; // Adjusted image height
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.gravity = 0.2; // Gravity factor
        this.bounceFactor = 0.7; // Bounce factor
    }

    update() {
        this.vy += this.gravity; // Apply gravity to vertical speed
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off the edges of the canvas
        if (this.x < 0 || this.x + this.width > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.vy = -Math.abs(this.vy) * this.bounceFactor;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    // Method to make the Shiba jump
    jump() {
        this.vy = -10;
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
    var frequency = 0.1;
    var speed = 0.1;
    var offsetX = 0;
    var step = 0;

    var confetti = [];
    for (let i = 0; i < 200; i++) {
        confetti.push(new Confetti());
    }

    ctx.font = size + "px 'Press Start 2P'";
    ctx.textAlign = "center";

    // Load image
    var image = new Image();
    image.src = 'https://img.freepik.com/premium-vector/pixel-art-dog-character-design-shiba_534389-2.jpg?w=2000'; // replace with your image URL
    var shiba;
    image.onload = function() {
        // Create Shiba object
        shiba = new Shiba(image);
        animate();
    };

    // Event listeners for mouse click and screen touch
    canvas.addEventListener('click', function() {
        shiba.jump();
    });
    canvas.addEventListener('touchstart', function() {
        shiba.jump();
    });

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
            ctx.fillStyle = "rgba(255, 105, 180, " + Math.min(step / i, 1) + ")";

            ctx.fillText(char, xPos, yPos);
        }

        // Update and draw the Shiba
        shiba.update();
        shiba.draw(ctx);

        offsetX += speed;
        step = Math.min(step + 0.5, text.length);

        requestAnimationFrame(animate);
    }
};
