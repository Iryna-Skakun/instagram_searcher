var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();

gulp.task('inject', ['templatecache', 'styles'], function() {
    config.log('Injecting the bower js/css and app js/css into the html');
    var bowerCSScomponents = gulp.src(config.bowerCSScomponents, {read: false}),
        bowerJScomponents = gulp.src(config.bowerJScomponents, {read: false}),
        appComponents = gulp.src(config.appComponents, {read: false}),
        templateCache = config.temp + config.templateCache.file,
        templateCacheComponent = gulp.src(templateCache, {read: false});
    return gulp
        .src(config.index)
        .pipe($.inject(templateCacheComponent, {starttag: '<!-- inject:templates:js -->'}))
        .pipe($.inject(bowerCSScomponents, {starttag: '<!-- inject:bower:css -->'}))
        .pipe($.inject(bowerJScomponents, {starttag: '<!-- inject:bower:js -->'}))
        .pipe($.inject(appComponents))
        .pipe(gulp.dest(config.src));
});
