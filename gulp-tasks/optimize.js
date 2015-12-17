var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();

gulp.task('optimize', ['inject'], function() {
    config.log('Optimizing the javascript, css, html');
    var templateCache = config.temp + config.templateCache.file,
        assets = $.useref({
            searchPath: './',
            transformPath: function(filePath) {
                return filePath.replace('../', '');
            }
        });
    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        .pipe($.if('*.css', $.csso()))
        .pipe($.if('**!/' + config.optimized.lib, $.uglify()))
        .pipe($.if('**!/' + config.optimized.app, $.ngAnnotate({add: true})))
        .pipe($.if('**!/' + config.optimized.app, $.uglify()))
        .pipe(gulp.dest(config.build));
});
