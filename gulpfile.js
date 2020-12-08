const {src, dest, watch, series, parallel} = require('gulp');
const scss = require('gulp-sass');

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// set file path variables.
const files = {
  scssPath: './src/scss/**/*.scss',
  jsPath: './src/js/dev-js/*.js'
};

// set css taskrunner.
function cssTask() {
  return src(files.scssPath) //locate scss file
    .pipe(scss()) //compile scss to css
    .pipe(postcss([ cssnano() ]))
    .pipe(dest('dist')) //save all files to dist folder
};

function jsTask() {
  return src(files.jsPath) // locate js files
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify()) // minify main.js
    .pipe(dest('dist')); // save to dist folder
}

//create watch taskrunner
function watchTask() {
  watch([files.scssPath, files.jsPath],
    parallel(cssTask, jsTask));  
}

//configure default task
exports.default = series(
  parallel(cssTask, jsTask),
  watchTask
)
