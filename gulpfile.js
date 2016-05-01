var gulp = require('gulp'),
    tasks = require('./build');


gulp.task(
    'watch-scripts',
    tasks.watchScripts
);

gulp.task(
    'build-scripts',
    tasks.buildScripts
);


gulp.task(
    'default',
    ['build-scripts']
);
