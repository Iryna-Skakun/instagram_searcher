var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();
var lazypipe = require('lazypipe');

gulp.task('optimize', ['inject'], function () {
    config.log('Optimizing the javascript, css, html');
    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.useref({searchPath: './'}, lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
        .pipe($.if('**/' + config.optimizedCss.lib, $.csso()))
        .pipe($.if('**/' + config.optimizedJs.lib, $.uglify()))
        .pipe($.if('**/' + config.optimizedJs.app, $.ngAnnotate({add: true})))
        .pipe($.if('**/' + config.optimizedJs.app, $.uglify()))
        .pipe($.sourcemaps.write('./source'))
        .pipe(gulp.dest(config.build));
});
