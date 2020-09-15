'use strict';

var gulp            = require( 'gulp' ),
    autoprefixer    = require( 'autoprefixer' ),
    sass            = require( 'gulp-sass' ),
    postcss         = require( 'gulp-postcss' ),
    cleancss        = require( 'gulp-clean-css' ),
    uglify          = require( 'gulp-uglify' ),
    plumber         = require( 'gulp-plumber' ),
    rename          = require( 'gulp-rename' ),
    imagemin        = require( 'gulp-imagemin' ),
    concat          = require( 'gulp-concat' ),
    config          = require( '../config.js' );

// Copy readme file.
gulp.task( 'dist-readme', () => {
    return gulp.src( config.files.readme )
        .pipe( gulp.dest( config.project.dist ) );
} );

// Copy php files.
gulp.task( 'dist-php', () => {
    return gulp.src( config.files.php.src )
        .pipe( gulp.dest( config.project.dist ) );
} );

// Copy language files.
gulp.task( 'dist-languages', () => {
    return gulp.src( config.files.languages.src )
        .pipe( gulp.dest( config.folders.languages.dist ) );
} );

// Optimize and copy images.
gulp.task( 'dist-images', () => {
    return gulp.src( config.files.images.src )
        .pipe( imagemin() )
        .pipe( gulp.dest( config.folders.images.dist ) );
} );

// Copy video files.
gulp.task( 'dist-videos', () => {
    return gulp.src( config.files.videos.src )
        .pipe( gulp.dest( config.folders.videos.dist ) );
} );

// Optimize and copy screenshot.
gulp.task( 'dist-screenshot', () => {
    return gulp.src( config.files.images.screenshot )
        .pipe( imagemin() )
        .pipe( gulp.dest( config.project.dist ) );
} );

// Copy javascript files.
gulp.task( 'dist-js', () => {
    return gulp.src( config.files.js.src )
        .pipe( plumber() )
        // Copy unminified scripts.
        .pipe( gulp.dest( config.folders.js.dist ) )
        // Create minified scripts for production.
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( config.folders.js.dist ) );
} );

// Copy fonts.
gulp.task( 'dist-fonts', () => {
    return gulp.src( config.files.fonts.src )
        .pipe( gulp.dest( config.folders.fonts.dist ) );
} );

// Copy print.css file.
gulp.task( 'dist-print-css', ( done ) => {
    return gulp.src( config.files.scss.printCss )
        .pipe( gulp.dest( config.project.dist ) );
} );

// Compile editor style blocks CSS.
gulp.task( 'dist-editor-style-blocks', () => {
    return gulp.src( config.files.scss.editorStyleBlocks )
        .pipe( sass() ).on( 'error', sass.logError )
        .pipe( postcss( [ autoprefixer() ] ) )
        .pipe( gulp.dest( config.folders.css.dist ) );
} );

// Compile theme CSS.
gulp.task( 'dist-scss', () => {
    return gulp.src( config.files.scss.src )
        .pipe( sass() ).on( 'error', sass.logError )
        .pipe( postcss( [ autoprefixer() ] ) )
        .pipe( gulp.dest( config.project.dist ) );
} );

// Production task.
gulp.task( 'production',
    gulp.series(
        'dist-print-css', 'dist-editor-style-blocks', 'dist-scss',
        gulp.parallel( 'dist-readme', 'dist-php', 'dist-languages', 'dist-images', 'dist-videos', 'dist-screenshot', 'dist-js', 'dist-fonts' )
    )
);
