'use strict';

var gulp = require('gulp');

// Run build task first and watch files for changes.
gulp.task( 'default', gulp.series( 'build', 'watch' ) );
