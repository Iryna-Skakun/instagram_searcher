module.exports = function () {
    var gulp = require('gulp');
    var util = require('gulp-util');
    var nodemon = require('gulp-nodemon');
    var path = require('path');
    var del = require('del');
    var browserSync = require('browser-sync');
    var src = './src/';
    var srcApp = path.join(src, 'app/');
    var server = './';
    var temp = './tmp/';
    var build = './build/';
    var config = {
        //all js for analyzing
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        index: path.join(src, 'index.html'),
        css: path.join(build, 'styles/'),
        sass: path.join(src, '/styles/*.sass'),
        appComponents: [
            path.join(src, '**/*.module.js'),
            path.join(src, '**/*.js'),
            path.join(build, 'styles/app.css'),
        ],
        bowerJScomponents: [
            './bower_components/angular/angular.js',
            './bower_components/jquery/dist/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js'
        ],
        bowerCSScomponents: [
            './bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        src: src,
        temp: temp,
        //Node settings
        defaultPort: 8080,
        nodeServer: './server.js',
        server: server,
        //build folder
        build: build,
        //optimized files
        optimizedJs: {
            app: 'app.js',
            lib: 'lib.js'
        },
        optimizedCss: {
            app: 'app.css',
            lib: 'lib.css'
        },
        //template cache
        htmltemplates: path.join(srcApp, '**/*.html'),
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'
            }
        }
    };
    //Log function
    config.log = function (msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    util.log(util.colors.blue(msg[item]));
                }
            }
        } else {
            util.log(util.colors.blue(msg));
        }
    };
    //clean function
    config.clean = function (path) {
        config.log('Cleaning: ' + util.colors.blue(path));
        del(path);
    };
    //Server function
    config.serve = function () {
        var nodeOptions = {
            script: config.nodeServer,
            delayTime: 1,
            watch: [config.server]
        };
        return nodemon(nodeOptions)
            .on('restart', function (ev) {
                config.log('*** nodemon restarted');
                config.log('files changed on restart:\n' + ev);
                setTimeout(function () {
                    browserSync.reload({stream: false});
                }, 1000);
            })
            .on('start', function () {
                config.log('*** nodemon started');
                startBrowserSync();
            })
            .on('crash', function () {
                config.log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function () {
                config.log('*** nodemon exited cleanly');
            });
    };

    function startBrowserSync() {
        if (browserSync.active) {
            return;
        }
        config.log('Starting browser-sync on port' + config.defaultPort);
        gulp.watch([config.alljs, config.htmltemplates], ['optimize', browserSync.reload]);
        gulp.watch(config.sass, ['styles', browserSync.reload]);
        var options = {
            proxy: 'localhost:' + config.defaultPort,
            port: config.defaultPort,
            files:  [config.client + '**/*.*', '!' + config.less, config.temp + '**/*.css'],
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            notify: true,
            reloadDelay: 500
        };
        browserSync(options);
    }

    return config;
};
