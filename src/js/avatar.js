var target = document.getElementById("target"),
    input = document.getElementById("file"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

target.addEventListener("click", function() {
    input.click();
}, false);

target.addEventListener("dragenter", function(event) {
    var types = event.dataTransfer.types;

    //Convert ArrayLike to Array.
    types = Array.prototype.slice.call(types);

    if (types.indexOf("Files") !== -1) {
        this.classList.add("active");
    }

}, false);

target.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

target.addEventListener("dragleave", function(event) {
    this.classList.remove("active");
}, false);


target.addEventListener("drop", function(event) {
    var file = event.dataTransfer.files[0];

    pixelate(file);

    event.preventDefault();
}, false);

input.addEventListener("change", function() {
    var file = this.files[0];
    pixelate(file);
}, false);

function pixelate(file) {
    var image = new Image();

    image.src = window.URL.createObjectURL(file);

    image.onload = function() {
        ctx.drawImage(image, 0, 0, 200, 200);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
            pixels = imageData.data,
            rows = 20,
            cols = 20,
            cellWidth = imageData.width / cols,
            cellHeight = imageData.height / rows,
            i,j,x,y,pos,r,g,b;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                x = ~~((cellWidth * j) + (cellWidth / 2));
                y = ~~((cellHeight * i) + (cellHeight / 2));

                pos = x * 4 + ~~(y * imageData.width * 4);

                r = pixels[pos];
                g = pixels[pos + 1];
                b = pixels[pos + 2];

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
            }
        }

        target.style.visibility = "hidden";
        canvas.style.visibility = "visible";

        window.URL.revokeObjectURL(file);
    }
}