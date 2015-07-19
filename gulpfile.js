/**
 * Created by Wei-Jye on 7/12/2015.
 */
(function() {
    'use strict';
    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();

    function browserSyncTask() {
        browserSync.init({
            server: {
                baseDir: './src',
                files: ['index.html', 'app.js', '**/*.html', '**/*.js', '**/*.css'],
                port: 8000,
                // Not working for some reason....
                browser: ['internet explorer', 'google chrome']
            }
        });
    }

    gulp.task('default', browserSyncTask);
    gulp.task('browser-sync', browserSyncTask);

    // Trying out browserify builds + watchify.
    //var watchify = require('watchify');
    //var browserify = require('browserify');

    // TODO: To be continue...
})();