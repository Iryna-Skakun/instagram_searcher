var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();

gulp.task('analyzing', function() {
    config.log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.debug())
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});
