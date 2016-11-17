var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var filter = require('gulp-filter');

gulp.task('js', function() {
    return gulp.src(['bower_components/jquery/dist/jquery.js', 'src/js/robot.js'])
        .pipe(concat('robot.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('scss', function() {
    return sass('src/scss/style.scss', {style: 'compressed', noCache: true})
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/js', ['scripts']);
    gulp.watch('src/scss', ['scss']);
});

gulp.task('default', ['js', 'scss', 'watch']);