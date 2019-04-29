const gulp = require('gulp');
const { src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const {
    series
} = require('gulp');


var paths = {
    input: 'src/',
    output: 'dist/',
    scripts: {
        input: 'src/js/*',
        polyfills: '.polyfill.js',
        output: 'dist/js/'
    },
    styles: {
        input: 'src/sass/**/*.{scss,sass}',
        output: 'dist/css/'
    },
    copyIcons: {
        input: 'src/icons/**/*',
        output: 'dist/icons/'
    },
    reload: './dist/'
};


function Scripts(cb) {
    // place code for your default task here
    return src(paths.scripts.input)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('toastme.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.output))

}


exports.Scripts = Scripts;
exports.default = series(Scripts);

/* 
if (process.env.NODE_ENV === 'production') {
    exports.build = series(transpile, minify);
} else {
    exports.build = series(transpile, livereload);
} */
