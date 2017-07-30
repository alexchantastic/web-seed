'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    webpack = require('webpack-stream'),
    named = require('vinyl-named'),
    uglify = require('gulp-uglify'),
    browsersync = require('browser-sync'),
    del = require('del'),
    run = require('run-sequence');

var paths = {
  'css': {
    'src': 'styles/src/',
    'dist': 'styles/dist/'
  },
  'js': {
    'src': 'js/src/',
    'dist': 'js/dist/'
  }
};

gulp.task('css', ['clean:css'], function() {
  return gulp.src(paths.css.src + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css.dist))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task('js', ['clean:js'], function() {
  return gulp.src(paths.js.src + '**/*.js')
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest(paths.js.dist))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task('minify:css', function() {
  return gulp.src(paths.css.dist + '**/*.css')
    .pipe(csso())
    .pipe(gulp.dest(paths.css.dist));
});

gulp.task('minify:js', function() {
  return gulp.src(paths.js.dist + '**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task('minify', ['minify:css', 'minify:js']);

gulp.task('server', function() {
  browsersync.init({
    server: {baseDir: '.'},
    open: false
  });
});

gulp.task('server:reload', function() {
  browsersync.reload();
});

gulp.task('watch', ['server'], function() {
  gulp.watch(paths.css.src + '**/*.scss', ['css']);

  gulp.watch(paths.js.src + '**/*.js', ['js']);

  gulp.watch('./*.html', ['server:reload']);
});

gulp.task('clean', ['clean:css', 'clean:js']);

gulp.task('clean:css', function() {
  return del(paths.css.dist  + '**/*');
});

gulp.task('clean:js', function() {
  return del(paths.js.dist + '**/*');
});

gulp.task('build', ['css', 'js']);

gulp.task('build:dist', function() {
  run(['css', 'js'], 'minify');
});

gulp.task('default', ['build', 'watch']);
