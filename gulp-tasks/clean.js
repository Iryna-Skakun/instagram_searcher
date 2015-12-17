var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var config = require('../gulp.config')();

gulp.task('clean', function() {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js',
        config.build + 'styles/**/*.css');
    clean(files);
});

function clean(path) {
    config.log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}
