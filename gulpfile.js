const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const exec = require('gulp-exec');
const browserify = require('browserify');
const babelify = require('babelify');
const fs = require('fs');

const conf = {

    browserify: {
        entries: ['./web-app/index.js']
    },

    bablify: {
        presets: [[require.resolve('babel-preset-es2015')]],
        global: true,
        plugins: [require.resolve("babel-plugin-transform-object-assign")]
    },

    linkedModules: {
        '@jeneric/core': '../jeneric-core',
        '@jeneric/logger': '../jeneric-logger',
        '@jeneric/entities': '../jeneric-entities',
        '@jeneric/marytts': '../jeneric-marytts'
    }

};

const reportOptions = {
    err: true,
    stderr: true,
    stdout: true
}

gulp.task('clean', () => {

    let dirs = [
        'var/sounds',
        'var/logs',
        'node_modules'
    ];

    return gulp.src(dirs, {read: false})
        .pipe(clean());
});

gulp.task('link', (cb) => {

    let command1 = 'cd ' + conf.linkedModules['@jeneric/core'] +
        ' && npm unlink' +
        ' && npm link' +
        ' && rm -R node_modules || true' +
        ' && npm install';

    let command2 = 'cd ' + conf.linkedModules['@jeneric/logger'] +
        ' && npm unlink' +
        ' && npm link' +
        ' && rm -R node_modules || true' +
        ' && npm install' +
        ' && npm link @jeneric/core';

    let command3 = 'cd ' + conf.linkedModules['@jeneric/entities'] +
        ' && npm unlink' +
        ' && npm link' +
        ' && rm -R node_modules || true' +
        ' && npm install' +
        ' && npm link @jeneric/core';

    /*
    let command4 = 'cd ' + conf.linkedModules['@jeneric/marytts'] +
        ' && npm unlink' +
        ' && npm link' +
        ' && rm -R node_modules || true' +
        ' && npm install' +
        ' && npm link @jeneric/core';*/

    let command5 = 'rm -R node_modules/@jeneric' +
        ' && npm link @jeneric/core' +
        ' && npm link @jeneric/logger' +
        ' && npm link @jeneric/entities';
        //' && npm link @jeneric/marytts';

    return gulp.src('./')
        .pipe(exec(command1))
        .pipe(exec(command2))
        .pipe(exec(command3))
        //.pipe(exec(command4))
        .pipe(exec(command5))
        .pipe(exec.reporter(reportOptions));

});

gulp.task('js', () => {

    return browserify(conf.browserify)
        .transform('babelify', conf.bablify)
        .bundle()
        .pipe(fs.createWriteStream('web-app/index.js'));

});

gulp.task('js-uglify', () => {

    return gulp.src('./web-app/index.js')
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('./web/js'));

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
    gulp.watch('src/js/*', ['js'])
});

gulp.task('default', gulp.series('js', 'js-uglify'));

//gulp.task('default', gulp.series('js', 'js-uglify', gulp.parallel('connect', 'watch')));