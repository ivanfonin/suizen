'use strict'

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    plugins = require('gulp-load-plugins')({ camelize: true }),
    config = require('../config.js')

// Copy php files.
gulp.task('php', () => {
    return gulp.src(config.files.php.src)
        .pipe(gulp.dest(config.project.dist))
})

// Copy language files.
gulp.task('languages', function() {
    return gulp.src(config.files.languages.src)
        .pipe(gulp.dest(config.folders.languages.dist))
})

// Copy images.
gulp.task('images', function() {
    return gulp.src(config.files.images.src)
        .pipe(gulp.dest(config.folders.images.dist))
})

// Copy video files.
gulp.task('videos', function() {
    return gulp.src(config.files.videos.src)
        .pipe(gulp.dest(config.folders.videos.dist))
})

// Copy screenshot.
gulp.task('screenshot', function() {
    return gulp.src(config.images.screenshot.src)
        .pipe(gulp.dest(config.project.dist))
})

// Copy javascript files.
gulp.task('js', function() {
    return gulp.src(config.files.js.src)
        .pipe(gulp.dest(config.folders.js.dist))
})

gulp.task('fonts', function() {
    return gulp.src(config.files.fonts.src)
        .pipe(gulp.dest(config.folders.fonts.dist))
})

gulp.task('admin-css', ['fonts'], function() {
    return gulp.src(config.files.css.src)
        .pipe(gulp.dest(config.folders.css.dist))
})

gulp.task('scss', ['admin-css'], () => {
    return gulp.src(config.files.scss.src)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .on('error', config.logErrors)
            .pipe(plugins.postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
            // One change with 'build' task - not minifying css file for wordpress.org
            //.pipe(plugins.cleanCss()) -
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.project.temp))
})

gulp.task('css', ['scss'], () => {
    return gulp.src([config.project.src + 'style.css', config.project.temp + 'style.css'])
        .pipe(plugins.concat('style.css'))
        .pipe(gulp.dest(config.project.dist))
})

gulp.task('wordpress', ['php', 'languages', 'images', 'videos', 'screenshot', 'js', 'css'])
