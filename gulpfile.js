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
const pug = require('gulp-pug');
const fsUtil = require('@jeneric/core/app/util/fs');
const del = require('del');
const path = require('path');

const conf = {

    browserify: {
        entries: ['./web/js/index.js']
    },

    bablify: {
        presets: [[require.resolve('babel-preset-env')]],
        global: true,
        plugins: [require.resolve("babel-plugin-transform-object-assign")]
    },

    linkedModules: {
        'jeneric-core': '@jeneric/core',
    },

    pug: {
        src: './web/pug/',
        //partials: './web/pug/partials/',
        dest: './public/',
        conf: {
            pretty: true
        }
    },

    js: {
        src: './src/js/',
        dest: './public/js/'
    },

    img: {
        src: './web/img',
        dest: './public/img'
    },

    reportOptions: {
        err: true,
        stderr: true,
        stdout: true
    },

    publicPath: './public'

};

gulp.task('init', (cb) => {
    del.sync(conf.publicPath);
    fs.mkdirSync(conf.publicPath);
    fs.mkdirSync(conf.js.dest);
    fsUtil.copySync(path.join(__dirname, conf.img.src), path.join(__dirname, conf.img.dest));
    cb();
});

gulp.task('link', () => {

    let commands = [];

    for (let moduleName in conf.linkedModules) {

        let packageName = conf.linkedModules[moduleName];

        commands.push('rm -R node_modules/' + packageName);

        commands.push('cd ../' + moduleName + ' && npm unlink && npm link');
        commands.push('npm link ' + packageName);
        commands.push('echo "linked: ' + packageName + '"');
    }

    let stream = gulp.src('./');

    for (let command of commands) {
        stream = stream.pipe(exec(command));
    }

    stream = stream.pipe(exec.reporter(conf.reportOptions));

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

/**
 * pug
 */
gulp.task('pug', () => {

    return gulp.src(conf.pug.src + '**/*.pug')
        .pipe(pug(conf.pug.conf))
        .pipe(gulp.dest(conf.pug.dest));
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
        'node_modules/socket.io-client/dist/socket.io.js',
        'node_modules/jquery/dist/jquery.min.js'
    ];

    return gulp.src(files)
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./public/js'));

});

gulp.task('scss', () => {
    return gulp.src('web/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
    gulp.watch('web/**/*', gulp.series('pug', 'scss', 'js', 'js-uglify'))
});

gulp.task(
    'default',
    gulp.series(
        'init',
        gulp.parallel(
            'pug',
            'scss',
            'js'
        ),
        'js-uglify',
        'js-uglify-vendor',
        'watch'
    )
);
