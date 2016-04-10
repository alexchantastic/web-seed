'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    browsersync = require('browser-sync'),
    run = require('run-sequence');

var paths = {
  'sass': 'styles/scss/',
  'css': 'styles/'
};

gulp.task('sass', function() {
  return gulp.src(paths.sass + '*.scss')
  .pipe(sass({
    onError: function(error) {
      console.log(error);
    }
  }))
  .pipe(autoprefixer())
  .pipe(gulp.dest('styles/'))
  .pipe(browsersync.reload({stream: true}));
});

gulp.task('minify', function() {
  return gulp.src(paths.css + '*.css')
    .pipe(csso())
    .pipe(gulp.dest(paths.css));
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('server:reload', function() {
  browsersync.reload();
});

gulp.task('watch', ['server'], function() {
  gulp.watch(paths.sass + '*.scss', ['sass']);

  gulp.watch('./*.html', ['server:reload']);
});

gulp.task('build', ['sass']);

gulp.task('build:dist', function() {
  run('sass', 'minify');
});

gulp.task('default', ['build', 'watch']);
