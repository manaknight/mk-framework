var gulp = require('gulp');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.src('templates/**/*.html')
        .pipe(template({
            namespace: 'tpl',
            IIFE: false,
            name: function (file) {
                return 'mk-' + file.relative;
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'));
});