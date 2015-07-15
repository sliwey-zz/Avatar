var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    minifycss = require("gulp-minify-css"),
    plumber = require("gulp-plumber");


gulp.task("scripts", function() {
    return gulp.src("src/js/*.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
})

gulp.task("styles", function() {
    return gulp.src("src/css/*.css")
        .pipe(plumber())
        .pipe(minifycss())
        .pipe(gulp.dest("dist/css"));
})

gulp.task("watch", function() {
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/css/*.css", ["styles"]);
})

gulp.task("default", ["scripts", "styles", "watch"]);

