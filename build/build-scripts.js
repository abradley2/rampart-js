var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    coffeeify = require('coffeeify'),
    source = require('vinyl-source-stream')

function buildScripts () {

    var files = {
        './src/main.coffee': {
            outfile: 'main.js',
            outfolder: './public/dist'
        }
    }

    Object.keys(files).forEach(function (entry) {

        var b = browserify({
            entries: [entry],
            cache: {},
            packageCache: {},
            plugin: []
        })

        b.transform(coffeeify)

        bundle(b, files[entry])
    })

    function bundle (b, config) {

        b.bundle()
            .on('error', function (err) {
                console.log(err.toString())
                this.emit('end')
            })
            .pipe( source(config.outfile) )
            .pipe( gulp.dest(config.outfolder) )

    }

}

module.exports = buildScripts