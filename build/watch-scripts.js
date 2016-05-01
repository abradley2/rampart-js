var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    gutil = require('gulp-util'),
    coffeeify = require('coffeeify'),
    source = require('vinyl-source-stream')

function watchScripts () {

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
            plugin: [watchify]
        })

        b.transform(coffeeify)

        b.on('log', gutil.log)

        b.on('update', bundle.bind(null, b, files[entry]) )

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

module.exports = watchScripts