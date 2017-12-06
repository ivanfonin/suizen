'use strict'

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    plugins = require('gulp-load-plugins')({ camelize: true }),
    config = require('../config.js')

// Copy php files.
gulp.task('php', () => {
    return gulp.src(config.files.php.src)
        .pipe(gulp.dest(config.project.build))
})

// Copy language files.
gulp.task('languages', function() {
    return gulp.src(config.files.languages.src)
        .pipe(gulp.dest(config.folders.languages.build))
})

// Copy images.
gulp.task('images', function() {
    return gulp.src(config.files.images.src)
        .pipe(gulp.dest(config.folders.images.build))
})

// Copy video files.
gulp.task('videos', function() {
    return gulp.src(config.files.videos.src)
        .pipe(gulp.dest(config.folders.videos.build))
})

// Copy screenshot.
gulp.task('screenshot', function() {
    return gulp.src(config.images.screenshot.src)
        .pipe(gulp.dest(config.project.build))
})

// Compile admin scripts.
gulp.task('admin-js', function() {
    return gulp.src(config.files.js.admin.src)
        .pipe(gulp.dest(config.folders.js.admin.build))
})

//
gulp.task('js', ['admin-js'], function() {
    return gulp.src(config.files.js.client.src)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.uglify())
            .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.folders.js.client.build))
})

gulp.task('fonts', function() {
    return gulp.src(config.files.fonts.src)
        .pipe(gulp.dest(config.folders.fonts.build))
})

gulp.task('scss', ['fonts'], () => {
    return gulp.src(config.files.scss.src)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .on('error', config.logErrors)
            .pipe(plugins.postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
            .pipe(plugins.cleanCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.project.temp))
})

gulp.task('css', ['scss'], () => {
    return gulp.src([config.project.src + 'style.css', config.project.temp + 'style.css'])
        .pipe(plugins.concat('style.css'))
        .pipe(gulp.dest(config.project.build))
})

gulp.task('build', ['php', 'languages', 'images', 'videos', 'screenshot', 'js', 'css'])
