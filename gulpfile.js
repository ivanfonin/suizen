/*
gulpfile.js
===========
Rather than manage one giant configuration file responsible
for creating multiple tasks, each task has been broken out into
its own file in 'gulp/tasks'. Any files in that directory get
automatically required below. Order matters!
*/

[ 'clean', 'build', 'production', 'watch', 'default' ].forEach( ( task ) => {
    require( `./gulp/tasks/${task}.js` );
} );
