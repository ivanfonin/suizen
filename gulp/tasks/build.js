'use strict';

var gulp            = require( 'gulp' ),
    sourcemaps      = require( 'gulp-sourcemaps' ),
    autoprefixer    = require( 'autoprefixer' ),
    sass            = require( 'gulp-sass' ),
    postcss         = require( 'gulp-postcss' ),
    cleancss        = require( 'gulp-clean-css' ),
    uglify          = require( 'gulp-uglify' ),
    plumber         = require( 'gulp-plumber' ),
    rename          = require( 'gulp-rename' ),
    concat          = require( 'gulp-concat' ),
    config          = require( '../config.js' );

// Copy php files.
gulp.task( 'readme', () => {
    return gulp.src( config.files.readme )
        .pipe( gulp.dest( config.project.build ) );
} );

// Copy php files.
gulp.task( 'php', () => {
    return gulp.src( config.files.php.src )
        .pipe( gulp.dest( config.project.build ) );
} );

// Copy language files.
gulp.task( 'languages', () => {
    return gulp.src( config.files.languages.src )
        .pipe( gulp.dest( config.folders.languages.build ) );
} );

// Copy images.
gulp.task( 'images', () => {
    return gulp.src( config.files.images.src )
        .pipe( gulp.dest( config.folders.images.build ) );
} );

// Copy video files.
gulp.task( 'videos', () => {
    return gulp.src( config.files.videos.src )
        .pipe( gulp.dest( config.folders.videos.build ) );
} );

// Copy screenshot.
gulp.task( 'screenshot', () => {
    return gulp.src( config.images.screenshot.src )
        .pipe( gulp.dest( config.project.build ) );
} );

// Process and copy javascript files.
gulp.task( 'js', () => {
    return gulp.src( config.files.js.src )
        .pipe( plumber() )
        // Copy unminified scripts.
        .pipe( gulp.dest( config.folders.js.build ) )
        // Create minified scripts for production.
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( config.folders.js.build ) );
} );

// Copy font files.
gulp.task( 'fonts', () => {
    return gulp.src( config.files.fonts.src )
        .pipe( gulp.dest( config.folders.fonts.build ) );
} );

// Copy print.css file.
gulp.task( 'print-css', ( done ) => {
    return gulp.src( config.files.scss.printCss )
        .pipe( gulp.dest( config.project.build ) );
} );

// Build editor style blocks CSS.
gulp.task( 'editor-style-blocks', () => {
    return gulp.src( config.files.scss.editorStyleBlocks )
        .pipe( sourcemaps.init() )
        .pipe( sass() ).on( 'error', sass.logError )
        .pipe( postcss( [ autoprefixer() ] ) )
        // .pipe( cleancss() )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( config.folders.css.build ) );
} );

// Buils theme CSS.
gulp.task( 'scss', () => {
    return gulp.src( config.files.scss.src )
        .pipe( sourcemaps.init() )
        .pipe( sass() ).on( 'error', sass.logError )
        .pipe( postcss( [ autoprefixer() ] ) )
        // .pipe( cleancss() )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( config.project.build ) );
} );

// Build task.
gulp.task( 'build',
    gulp.series(
        'print-css', 'editor-style-blocks', 'scss',
        gulp.parallel( 'readme', 'php', 'languages', 'images', 'videos', 'screenshot', 'js', 'fonts' )
    )
);
