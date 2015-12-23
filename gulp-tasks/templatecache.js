var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();

gulp.task('templatecache', ['clean-build'], function() {
    config.log('Creating AngularJS $templateCache');
    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache
        (config.templateCache.file,
         config.templateCache.options))
        .pipe(gulp.dest(config.temp));
});
