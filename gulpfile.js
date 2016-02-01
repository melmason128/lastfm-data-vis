var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var del = require('del');


//Exclude all vendor, minified, or jasmine spec scripts
var srcFiles = ['app/**/*.js', '!app/**/*.min.js', '!app/bower_components/**/*.js', '!app/**/*.spec.js'];


gulp.task('clean-scripts', function(){
   return del(['app/all.min.js']);
});

gulp.task('scripts', ['clean-scripts'], function(){
    return gulp.src(srcFiles)
        .pipe(concat('all.min.js'))
        //annotate before minification.
        //Currently the tsconfig retains comments when compiling to js (i.e. the /** @ngInject */ should remain)
        .pipe(ngAnnotate({add: true}))
        .pipe(uglify())
        .pipe(gulp.dest('app/'));
});

gulp.task('watch', function(){
    gulp.watch(srcFiles, function(){
        gulp.start('scripts');
    });
});

gulp.task('default', ['scripts'], function () { });