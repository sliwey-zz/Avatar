;(function(doc, win, undefined) {
    "use strict";

    var target = doc.getElementById("target"),
        input = doc.getElementById("file"),
        pixelateBtn = doc.getElementById("pixelate"),
        inverseBtn = doc.getElementById("inverse"),
        grayBtn = doc.getElementById("gray"),
        initBtn = doc.getElementById("init"),
        canvas = doc.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        isLoaded = false,
        renders = {
            pixelate: false,
            inverse: false,
            gray: false
        },
        oriImageData,
        imageData,
        filters,
        CSS_SELECT = "select";

    filters = {
        pixelate: function() {
            var pixels = imageData.data,
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

            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        },
        inverse: function() {
            var pixels = imageData.data,
                length = imageData.width * imageData.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < length; i++) {
                pixels[i * 4] = 255 - pixels[i * 4];
                pixels[i * 4 + 1] = 255 - pixels[i * 4 + 1];
                pixels[i * 4 + 2] = 255 - pixels[i * 4 + 2];
            }

            ctx.putImageData(imageData, 0, 0);
        },
        gray: function() {
            var pixels = imageData.data,
                length = imageData.width * imageData.height,
                avg;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < length; i++) {
                avg = ~~((pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3);
                pixels[i * 4] = avg;
                pixels[i * 4 + 1] = avg;
                pixels[i * 4 + 2] = avg;
            }

            ctx.putImageData(imageData, 0, 0);
        }
    };

    function init() {
        reset();

        for (var key in renders) {
            if (renders.hasOwnProperty(key)) {
                renders[key] = false;
            }
        }

        pixelateBtn.classList.remove(CSS_SELECT);
        inverseBtn.classList.remove(CSS_SELECT);
        grayBtn.classList.remove(CSS_SELECT);
    }

    function reset() {
        if (oriImageData) {
            ctx.putImageData(oriImageData, 0, 0);
            imageData = createImageData(oriImageData);
        }
    }

    function render() {
        reset();

        for (var key in renders) {
            if (renders.hasOwnProperty(key) && renders[key]) {
                filters[key]();
            }
        }
    }

    function createImageData(imageData) {
        var newImageData = ctx.createImageData(imageData.width, imageData.height),
            pixels = imageData.data,
            newPixels = newImageData.data;

        for (var i = 0; i < pixels.length; i++) {
            newPixels[i] = pixels[i]
        }

        return newImageData;
    }

    function load(file) {
        var image = new Image();

        image.src = win.URL.createObjectURL(file);

        image.onload = function() {
            ctx.drawImage(image, 0, 0, 200, 200);

            target.style.visibility = "hidden";
            canvas.style.visibility = "visible";

            isLoaded = true;
            oriImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            imageData = createImageData(oriImageData);
            win.URL.revokeObjectURL(file);
        }
    }


    target.addEventListener("click", function() {
        input.click();
    }, false);

    target.addEventListener("dragenter", function(event) {
        var types = event.dataTransfer.types;

        //Convert ArrayLike to Array. In Firefox, the type of types is DOMStringList(ArrayLike).
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

        load(file);
        event.preventDefault();
    }, false);

    input.addEventListener("change", function() {
        var file = this.files[0];
        load(file);
    }, false);

    pixelateBtn.addEventListener("click", function() {
        if (isLoaded) {
            renders.pixelate = !renders.pixelate;
            if (renders.pixelate) {
                this.classList.add(CSS_SELECT);
            } else {
                this.classList.remove(CSS_SELECT);
            }
            render();
        }
    }, false);

    inverseBtn.addEventListener("click", function() {
        if (isLoaded) {
            renders.inverse = !renders.inverse;
            if (renders.inverse) {
                this.classList.add(CSS_SELECT);
            } else {
                this.classList.remove(CSS_SELECT);
            }
            render();
        }
    }, false);

    grayBtn.addEventListener("click", function() {
        if (isLoaded) {
            renders.gray = !renders.gray;
            if (renders.gray) {
                this.classList.add(CSS_SELECT);
            } else {
                this.classList.remove(CSS_SELECT);
            }
            render();
        }
    }, false);

    initBtn.addEventListener("click", function() {
        init();
    }, false);

})(document, window);