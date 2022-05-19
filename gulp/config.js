/*
config.js
=========
Gulp configuration file for the Themegulper workflow.
*/

/* Theme
--------
theme - Name of your WordPress theme.
*/
var theme = "manifestum";

/* Paths
--------
src   - Source files of your theme. Edit only in this directory.
build - Working version of your theme for testing purposes.
dist  - Distribution version of the WordPress theme with minified styles, scripts, etc.
.temp - Temporary folder. Remove it with 'gulp clean' command.
*/
var src   = `./src/`,
    build = `./build/${theme}/`, // I usually 'build' theme to my local WordPress installation themes directory.
    dist  = `./dist/${theme}/`,
    temp  = `./.temp/`;

/* Settings
-----------
*/
module.exports = {

    /* Project
    ----------
    Main project folders.
    */
    project: {
        src   : src,
        build : build,
        dist  : dist,
        temp  : temp
    },

    /* Folders
    ----------
    Helper project folders based on WordPress theme structure.
    */
    folders: {
        languages: {
            build: build + 'languages/',
            dist: dist + 'languages/'
        },
        fonts: {
            src: src + 'assets/fonts/',
            build: build + 'assets/fonts/',
            dist: dist + 'assets/fonts/'
        },
        images: {
            build: build + 'assets/images/',
            dist: dist + 'assets/images/'
        },
        videos: {
            build: build + 'assets/videos/',
            dist: dist + 'assets/videos/'
        },
        js: {
            src: src + 'assets/js/',
            build: build + 'assets/js/',
            dist: dist + 'assets/js/',
        },
        scss: {
            src: src + 'assets/scss/'
        },
        css: {
            build: build + 'assets/css/',
            dist: dist + 'assets/css/'
        }
    },

    /* Files
    --------
    All PHP files, languages, scripts, fonts, images and styles source files of the WordPress theme.
    */
    files: {
        readme: src + 'readme.txt',
        languages: {
            src: src + 'languages/**/*'
        },
        php: {
            src: src + '**/*.php'
        },
        fonts: {
            src: src + 'assets/fonts/**/*'
        },
        images: {
            src: src + 'assets/images/**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
            screenshot: src + 'screenshot.png'
        },
        videos: {
            src: src + 'assets/videos/**/*'
        },
        js: {
            src: src + 'assets/js/**/*.js'
        },
        scss: {
            src: src + 'assets/scss/style.scss', // Main .scss file with @import's of all other .scss files!
            print: src + 'assets/scss/print.scss',
            editorStyleBlocks: src + 'assets/scss/editor-style-blocks.scss',
            all: src + 'assets/scss/**/*.scss'   // Need this path to 'watch' all files for changes.
        },
        css: {
            src: src + 'assets/css/**/*.css' // Have admin styles here.
        }
    },

    /* Browsersync
    --------------
    Browsersync settings.
    */
    browsersync: {
        open  : 'external',
        proxy : `http://${theme}.dev-local`,
        port  : 8080
    }

};
