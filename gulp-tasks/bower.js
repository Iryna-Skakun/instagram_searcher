var gulp = require('gulp');
var bower = require('gulp-bower');
var config = require('../gulp.config')();

gulp.task('bower-install',  function() {
    config.log('Bower install');
    return bower();
});
