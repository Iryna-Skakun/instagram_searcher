var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();

gulp.task('inject', ['templatecache', 'analyzing'], function() {
    config.log('Wire up the bower js/css and app js/css into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    var sources = gulp.src(config.sources, {read: false});
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(sources))
        .pipe(gulp.dest(config.src));
});
