// Grab our gulp packages
var gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  cssnano = require("gulp-cssnano"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  stylish = require("jshint-stylish"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  plumber = require("gulp-plumber"),
  babel = require("gulp-babel"),
  browserSync = require("browser-sync").create();

// Compile Sass, Autoprefix and minify
gulp.task("styles", function() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(
      plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init()) // Start Sourcemaps
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./assets/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano())
    .pipe(sourcemaps.write(".")) // Creates sourcemaps for minified styles
    .pipe(gulp.dest("./assets/css/"));
});

// JSHint, concat, and minify JavaScript
gulp.task("site-js", function() {
  return gulp
    .src([
      // Grab your custom scripts
      "./assets/javascripts/*.js"
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("./assets/js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(sourcemaps.write(".")) // Creates sourcemap for minified JS
    .pipe(gulp.dest("./assets/js"));
});

// Browser-Sync watch files and inject changes
gulp.task("browsersync", function() {
  // Watch files
  var files = [
    "./assets/css/*.css",
    "./assets/js/*.js",
    "**/*.html",
    "assets/images/**/*.{png,jpg,gif,svg,webp}"
  ];

  browserSync.init(files, {
    // Replace with URL of your local site
    proxy: "http://localhost:3000/"
  });

  gulp.watch("./assets/scss/**/*.scss", ["styles"]);
  gulp
    .watch("./assets/javascripts/**/*.js", ["site-js"])
    .on("change", browserSync.reload);
});

// Watch files for changes (without Browser-Sync)
gulp.task("watch", function() {
  // Watch .scss files
  gulp.watch("./assets/scss/**/*.scss", ["styles"]);

  // Watch site-js files
  gulp.watch("./assets/javascripts/**/*.js", ["site-js"]);
});

// Run styles and site-js
gulp.task("default", function() {
  gulp.start("styles", "site-js");
});
