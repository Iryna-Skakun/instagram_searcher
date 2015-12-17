var gulp = require('gulp');
var config = require('../gulp.config')();

gulp.task('server-dev', ['inject'], function() {
    config.serve(true /*isDev*/);
});
