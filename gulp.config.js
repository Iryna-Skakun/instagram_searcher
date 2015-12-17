module.exports = function() {
    var src = './src/';
    var srcApp = src + 'app/';
    var server = './';
    var util = require('gulp-util');
    var nodemon = require('gulp-nodemon');
    var config = {
        //all js for analyzing
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        index: src + 'index.html',
        sources: [
            src + '**/*.module.js',
            src + '**/*.js',
            src + '**/*.css'
        ],
        src: src,
        temp: './tmp/',
        //Node settings
        defaultPort: 8080,
        nodeServer: './server.js',
        server: server,
        //build folder
        build: './build/',
        //optimized files
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        //template cache
        htmltemplates: srcApp + '**/*.html',
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'
            }
        },
        //Bower and NPM locations
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/'
        }
    };
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory
        };
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
    //Server function
    config.serve =  function (isDev) {
        var nodeOptions = {
            script: config.nodeServer,
            delayTime: 1,
            env: {
                'PORT': config.defaultPort,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [config.server]
        };
        return nodemon(nodeOptions)
            .on('restart', ['analyzing'], function(ev) {
                config.log('*** nodemon restarted');
                config.log('files changed on restart:\n' + ev);
            })
            .on('start', function() {
                config.log('*** nodemon started');
            })
            .on('crash', function() {
                config.log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function() {
                config.log('*** nodemon exited cleanly');
            });
    };

    return config;
};
