window.onload = function() {
    var canvas = document.getElementById("myCanvas");

    // Set canvas size to full viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");

    var text = "❤️ Vaa Ele ❤️".split("");
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var size = 30;
    var amplitude = 30;
    var frequency = 0.05;
    var speed = 0.05;
    var offsetX = 0;
    var step = 0;

    ctx.font = size + "px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "pink";

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < step; i++) {
            var char = text[i];

            // Alter y position based on character in string
            var yPos = y + Math.sin((i + offsetX) * frequency) * amplitude;
            var xPos = x + (i - text.length / 2) * size;

            ctx.fillText(char, xPos, yPos);
        }

        offsetX += speed;
        step = Math.min(step + 1, text.length);

        requestAnimationFrame(animate);
    }

    animate();
};
