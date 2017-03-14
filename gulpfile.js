var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

gulp.task('clean', function() {

    var dirs = [
        'sounds',
        'logs'
    ];

    return gulp.src(dirs, {read: false})
        .pipe(clean());
});

gulp.task('vendor', function() {

    var files = ['node_modules/jquery/dist/jquery.min.js',
                 'node_modules/three/build/three.min.js'];

    return gulp.src(files)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('js', function() {

    var files = [
        'src/js/interface.js'
    ];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('interface.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('public/js'));
});

gulp.task('scss', function () {
 return gulp.src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/scss/*', ['scss']);
});

gulp.task('default', ['vendor', 'js', 'scss', 'watch']);