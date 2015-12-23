var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();

gulp.task('styles', ['clean-styles'], function () {
    config. log('Compiling Sass --> css');

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false}))
        .pipe($.csso())
        .pipe($.sourcemaps.write('../source/styles'))
        .pipe(gulp.dest(config.css));
});
