module.exports = function() {
    var src = './src/';
    var srcApp = src + 'app/';
    var server = './';
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
    return config;
};
