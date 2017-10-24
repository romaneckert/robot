const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
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
        //'@jeneric/logger': '../jeneric-logger',
        //'@jeneric/entities': '../jeneric-entities',
        //'@jeneric/marytts': '../jeneric-marytts',
        //'@jeneric/server': '../jeneric-server'
    }

};

const reportOptions = {
    err: true,
    stderr: true,
    stdout: true
};

let linkCommand = 'rm -R node_modules/@jeneric';

for(let module in conf.linkedModules) {

    let command = 'cd ' + conf.linkedModules[module] +
        ' && npm unlink' +
        ' && npm link' +
        ' && rm -R node_modules || true' +
        ' && npm install' +
        ' && npm link @jeneric/core';

    gulp.task(module, () => {
        return gulp.src('./').pipe(exec(command)).pipe(exec.reporter(reportOptions));
    });

    linkCommand += ' && npm link ' + module;
}

gulp.task('link_all', () => {
    return gulp.src('./').pipe(exec(linkCommand)).pipe(exec.reporter(reportOptions));
});

gulp.task('link', gulp.series(gulp.parallel('@jeneric/core'), 'link_all'));

gulp.task('clean', () => {

    let dirs = [
        'var/sounds',
        'var/logs',
        'node_modules'
    ];

    return gulp.src(dirs, {read: false})
        .pipe(clean());
});

gulp.task('js', () => {

    return browserify(conf.browserify)
        .transform('babelify', conf.bablify)
        .bundle()
        .pipe(fs.createWriteStream('./web/js/index.js'));

});

gulp.task('js-uglify', () => {

    let files = [
        'node_modules/socket.io-client/dist/socket.io.js',
        'node_modules/jquery/dist/jquery.min.js',
        './web/js/index.js'
    ];

    return gulp.src(files)
        .pipe(uglify())
        .pipe(concat('index.min.js'))
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
    gulp.watch('web-app/**/*', gulp.series('js', 'js-uglify'))
});

gulp.task('default', gulp.series('js', 'js-uglify', 'watch'));