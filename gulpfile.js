var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var requireDir = require('require-dir');
requireDir('./gulp-tasks', {recurse: true});

gulp.task('default', ['server-dev']);
