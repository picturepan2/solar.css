const gulp = require("gulp");
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const { exec } = require('child_process');

var paths = {
  scss: './scss/*.scss',
  pug: './pug/!(_)*.pug'
};

gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['build']);
  gulp.watch('./**/*.pug', ['web']);
});

function css() {
  return gulp
    .src(paths.scss)
    .pipe(sass({outputStyle: 'compact', precision: 2})
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./assets/css'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/css'));
}

function web() {
  return gulp
    .src(paths.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./'));
}

function watch() {
  gulp.watch('./**/*.scss', css);
  gulp.watch('./**/*.pug', web);
}

exports.watch = watch;
exports.css = css;
exports.web = web;
exports.default = web;