/**
 * Created by Wei-Jye on 7/12/2015.
 */
(function() {
    'use strict';
    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var fs = require('fs');
    var karma = require('karma');
    var Server = require('karma').Server;

    function browserSyncTask() {
        browserSync.init({
            server: {
                baseDir: './src',
                files: ['index.html', 'app.js', '**/*.html', '**/*.js', '**/*.css'],
                port: 8000,
                // Not working for some reason....
                browser: ['internet explorer', 'google chrome'],
                logLevel: 'debug'
            }
        });

        browserSync.reload({
          stream: true   //
        });

        gulp.watch('src/index.html', function(event, file) {
            browserSync.reload('src/index.html');
        });
        gulp.watch('src/app.js', function() {
            browserSync.reload('src/app.js');
        });
        //gulp.watch('src/**/*.js').on('change', browserSync.reload);
        gulp.watch('src/**/*.js', function(event, file) {
            console.log('event:', event);
            // TODO: Extract the relative path from event.path and reload only those files.
        });
        gulp.watch('src/*.css').on('change', browserSync.reload);
    }

    gulp.task('default', browserSyncTask);
    gulp.task('browser-sync', browserSyncTask);
    gulp.task('test', function (done) {
	  new Server({
	    configFile: __dirname + '/karma.conf.js',
	    singleRun: true
	  }, done).start();
	});

    // Trying out browserify builds + watchify.
    //var watchify = require('watchify');
    //var browserify = require('browserify');

    // TODO: To be continue...
})();