const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');

gulp.task('clean', () => {

    let dirs = [
        'var/sounds',
        'var/logs'
    ];

    return gulp.src(dirs, {read: false})
        .pipe(clean());
});

gulp.task('vendor', () => {

    let files = ['node_modules/jquery/dist/jquery.min.js',
                 'node_modules/three/build/three.min.js'];

    return gulp.src(files)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('js', () => {

    let files = [
        'src/js/interface.js'
    ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('interface.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('public/js'));
});

gulp.task('scss', () => {
 return gulp.src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/scss/*', ['scss']);
});

gulp.task('default', ['vendor', 'js', 'scss', 'watch']);