// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var bless = require('gulp-bless');
// var csso = require('gulp-csso');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    gulp.src('./_raw/_js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// css processing
gulp.task('processing', function() {
    gulp.src('./_raw/_sass/*.scss')
        .pipe(sass())
        .pipe(rename('1-preprocessed.css'))
        .pipe(gulp.dest('./__tmp'))
        .pipe(rename('2-prefixed.css'))
        .pipe(prefix())
        .pipe(gulp.dest('./__tmp'))
        .pipe(rename('3-optimized.css'))
        .pipe(minifyCSS({keepSpecialComments:1}, {removeEmpty:true}))
        .pipe(gulp.dest('./__tmp'))
        .pipe(rename('stylesheet.css'))
        .pipe(bless('stylesheet.css'))
        .pipe(gulp.dest('./_build/_assets/_css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src('./_raw/_js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./__tmp'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./_build/_assets/_js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./_raw/_js/*.js', ['lint', 'scripts']);
    gulp.watch('./_raw/_sass/*.scss', ['sass']);
});

// Default Task
// gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
// gulp.task('default', ['lint', 'sass', 'autoprefixer', 'scripts']);
gulp.task('default', ['lint', 'processing', 'scripts']);