var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('../gulp.config')();

gulp.task('clean-styles', function () {
    var files = config.build + '**/app.css';
    config.clean(files);
});
