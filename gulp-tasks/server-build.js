var gulp = require('gulp');
var config = require('../gulp.config')();

gulp.task('server-build', ['optimize'], function() {
    config.serve(false /*isDev*/);
});
