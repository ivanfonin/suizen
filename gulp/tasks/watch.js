'use strict';

var gulp = require( 'gulp' ),
    browsersync = require( 'browser-sync' ),
    config = require( '../config.js' );

const server = browsersync.create();

// Reload browsersync server.
function reload( done ) {
    server.reload();
    done();
}

// Start brosersync server.
function serve( done ) {
    server.init( config.browsersync );
    done();
}

// Watch files for changes and reload browsersync server.
function watch( done ) {
    gulp.watch( config.files.php.src, gulp.series( 'php', reload ) );

    gulp.watch( config.files.languages.src, gulp.series( 'languages', reload ) );

    gulp.watch( config.files.fonts.src, gulp.series( 'fonts', reload ) );

    gulp.watch( config.files.images.src, gulp.series( 'images', reload ) );

    gulp.watch( config.files.js.src, gulp.series( 'js', reload ) );

    gulp.watch( config.files.scss.all, gulp.series( 'css', reload ) );

    done();
}

// Watch task.
gulp.task( 'watch' , gulp.series( serve, watch ) );
