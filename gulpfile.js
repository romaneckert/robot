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
        entries: ['./web/index.js']
    },

    bablify: {
        presets: [[require.resolve('babel-preset-env')]],
        global: true,
        plugins: [require.resolve("babel-plugin-transform-object-assign")]
    },

    linkedModules : {
        'jeneric-core' : '@jeneric/core',
    }

};

const reportOptions = {
    err: true,
    stderr: true,
    stdout: true
};

gulp.task('link', () => {

    let commands = [];

    for(let moduleName in conf.linkedModules) {

        let packageName = conf.linkedModules[moduleName];

        commands.push('rm -R node_modules/' + packageName);

        commands.push('cd ../' + moduleName + ' && npm unlink && npm link');
        commands.push('npm link ' + packageName);
        commands.push('echo "linked: ' + packageName + '"');
    }

    let stream = gulp.src('./');

    for(let command of commands) {
        stream = stream.pipe(exec(command));
    }

    stream = stream.pipe(exec.reporter(reportOptions));

    return stream;
});

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
        .pipe(fs.createWriteStream('public/js/index.js'));

});

gulp.task('js-uglify', () => {

    let files = [
        './public/js/index.js'
    ];

    return gulp.src(files)
        .pipe(uglify())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest('./public/js'));

});

gulp.task('js-uglify-vendor', () => {

    let files = [
        'node_modules/three/build/three.min.js',
        'node_modules/socket.io-client/dist/socket.io.js',
        'node_modules/jquery/dist/jquery.min.js'
    ];

    return gulp.src(files)
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./public/js'));

});

gulp.task('scss', () => {
    return gulp.src('web/resources/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
    gulp.watch('web/**/*', gulp.series('scss', 'js', 'js-uglify'))
});

gulp.task('default', gulp.series('scss', 'js', 'js-uglify', 'js-uglify-vendor', 'watch'));
