var target = document.getElementById("target"),
    input = document.getElementById("file"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");


target.addEventListener("click", function() {
    input.click();
})

input.addEventListener("change", function() {
    var file = this.files[0];

    pixelate(window.URL.createObjectURL(file));
})

function pixelate(path) {
    var image = new Image();

    image.src = path;

    image.onload = function() {
        ctx.drawImage(image, 0, 0, 200, 200);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var rows = 20;
        var cols = 20;
        var cellWidth = imageData.width / cols;
        var cellHeight = imageData.height / rows;

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var x = ~~((cellWidth * j) + (cellWidth / 2));
                var y = ~~((cellHeight * i) + (cellHeight / 2));

                var pos = x * 4 + ~~(y * imageData.width * 4);

                var r = pixels[pos];
                var g = pixels[pos + 1];
                var b = pixels[pos + 2];

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
            }
        }

        target.style.visibility = "hidden";
        canvas.style.visibility = "visible";
    }
}