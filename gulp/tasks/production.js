'use strict';

var gulp = require( 'gulp' ),
    autoprefixer = require( 'autoprefixer' ),
    sass = require( 'gulp-sass' ),
    postcss = require( 'gulp-postcss' ),
    cleancss = require( 'gulp-clean-css' ),
    uglify = require( 'gulp-uglify' ),
    rename = require( 'gulp-rename' ),
    concat = require( 'gulp-concat' ),
    config = require( '../config.js' );

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

// Copy images.
gulp.task( 'dist-images', () => {
    return gulp.src( config.files.images.src )
        .pipe( gulp.dest( config.folders.images.dist ) );
} );

// Copy video files.
gulp.task( 'dist-videos', () => {
    return gulp.src( config.files.videos.src )
        .pipe( gulp.dest( config.folders.videos.dist ) );
} );

// Copy screenshot.
gulp.task( 'dist-screenshot', () => {
    return gulp.src( config.images.screenshot.src )
        .pipe( gulp.dest( config.project.dist ) );
} );

// Copy javascript files.
gulp.task( 'dist-js', () => {
    return gulp.src( config.files.js.src )
        // Copy unminified scripts.
        .pipe( gulp.dest( config.folders.js.dist ) )
        // Create minified scripts for production.
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( config.folders.js.dist ) );
} );

gulp.task( 'dist-fonts', () => {
    return gulp.src( config.files.fonts.src )
        .pipe( gulp.dest( config.folders.fonts.dist ) );
} );

gulp.task( 'dist-admin-css', () => {
    return gulp.src( config.files.css.src )
        .pipe( gulp.dest( config.folders.css.dist ) );
} );

gulp.task( 'dist-scss', () => {
    return gulp.src( config.files.scss.src )
        .pipe( sass() ).on( 'error', sass.logError )
        .pipe( postcss( [ autoprefixer() ] ) )
        // One change with 'build' task - not minifying css file for wordpress.org
        //.pipe( cleancss() )
        .pipe( gulp.dest( config.project.temp) );
} );

gulp.task( 'dist-css', () => {
    return gulp.src( [ config.project.src + 'style.css', config.project.temp + 'style.css' ] )
        .pipe( concat( 'style.css' ) )
        .pipe( gulp.dest( config.project.dist ) );
} );

gulp.task( 'production',
    gulp.series(
        'dist-admin-css', 'dist-scss', 'dist-css',
        gulp.parallel( 'dist-readme', 'dist-php', 'dist-languages', 'dist-images', 'dist-videos', 'dist-screenshot', 'dist-js', 'dist-fonts' )
    )
);
