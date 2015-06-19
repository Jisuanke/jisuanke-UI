// Include gulp
var gulp = require('gulp');
    jshint = require('gulp-jshint');
    sass = require('gulp-sass');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    rename = require('gulp-rename');
    clean = require('gulp-clean');

var config = {
    bowerDir: 'bower_components/',
    defaultPath: 'bootflat/',
    fontsDir:'fonts/',
    cssminOptions: {keepSpecialComments: 1},
    uglifyOptions: {preserveComments: 'some'},
};


//Clean fontawesome
gulp.task('clean', function() {
    del([config.fontsDir + '/**/*']);
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./bootflat/bootflat.scss')
        .pipe(sass())
        .pipe(gulp.dest('./bootflat/bootflat.scss'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    // gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', [ 'sass', 'scripts', 'watch']);
