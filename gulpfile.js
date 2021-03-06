var gulp = require("gulp");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var del = require("del");
var cssmin = require("gulp-cssmin");
var Server = require("karma").Server;


gulp.task("test", function (done) {
  new Server({
    configFile: __dirname + "/karma.conf.js",
    singleRun: true
  }, done).start();
});

gulp.task("lint", function () {
    return gulp.src(["src/*.js", "!node_modules/**"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("deploy",
    ["build", "remove-dist-dir", "copy-files"]
    , function () { }
);

gulp.task("remove-dist-dir", function () {
    del.sync("dist/**");
});

gulp.task("concat-js-files", function () {
    return gulp.src(["./src/angular-barcode-febraban.module.js"
        , "./src/angular-barcode-febraban.utils.js"
        , "./src/angular-barcode-febraban.directive.js"])
        .pipe(concat("angular-barcode-febraban.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("minify-css", function () {
    return gulp.src("./assets/css/barcode.css")
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("copy-barcode-font", function () {
    return gulp.src("./assets/fonts/BarcodeInterleaved2of5.ttf")
        .pipe(gulp.dest("./dist/fonts/"));
});

gulp.task("copy-demo", function () {
    return gulp.src(["./demo/**", "!./demo/index_git.html"])
        .pipe(gulp.dest("./dist/demo/"));
});

gulp.task("copy-files", ["concat-js-files", "minify-css", "copy-barcode-font", "copy-demo"], function () {

});

gulp.task("build", ["lint", "test"], function () {

});

gulp.task("default", ["deploy"], function () {

});