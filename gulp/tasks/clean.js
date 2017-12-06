'use strict'

var gulp = require('gulp'),
    config = require('../config.js'),
    del = require('del')

gulp.task('clean', (cb) => {
    del([config.project.temp, './build', './dist'], cb)
})
