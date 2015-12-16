var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('analyzing', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.debug())
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('clean', function() {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js',
        config.build + 'styles/**/*.css');
    clean(files);
});

gulp.task('templatecache', ['clean'], function() {
    log('Creating AngularJS $templateCache');
    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache
        (config.templateCache.file,
         config.templateCache.options))
        .pipe(gulp.dest(config.temp));
});

gulp.task('inject', ['analyzing', 'templatecache'], function() {
    log('Wire up the bower js/css and app js/css into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    var sources = gulp.src(config.sources, {read: false});
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(sources))
        .pipe(gulp.dest(config.src));
});

gulp.task('optimize', ['inject'], function() {
    log('Optimizing the javascript, css, html');
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
        .pipe($.if('**/' + config.optimized.lib, $.uglify()))
        .pipe($.if('**/' + config.optimized.app, $.ngAnnotate({add: true})))
        .pipe($.if('**/' + config.optimized.app, $.uglify()))
        .pipe(gulp.dest(config.build));
});

gulp.task('server-build', ['optimize'], function() {
    serve(false /*isDev*/);
});

gulp.task('server-dev', ['inject'], function() {
    serve(true /*isDev*/);
});

function serve(isDev) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': config.defaultPort,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
    return $.nodemon(nodeOptions)
        .on('restart', ['analyzing'], function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
        })
        .on('start', function() {
            log('*** nodemon started');
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
