var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

//编译、合并、压缩less文件
gulp.task('less', function () {
    gulp.src(['src/assets/less/**/main.less', 'src/assets/less/**/*.less'])
        .pipe(concat('style.less'))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/assets/css'))
});

//合并压缩后的css文件
gulp.task('css', function () {
    gulp.src(['src/assets/css/*.css'])
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/css'))
});


//压缩、合并js文件
gulp.task('main:js', function () {
    gulp.src(['src/assets/js/jquery.min.js', 'src/assets/js/bootstrap.min.js', 'src/assets/js/pace.min.js',
        'src/assets/js/main.js'])
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('post:js', function () {
    gulp.src(['src/assets/js/highlight.pack.js', 'src/assets/js/toc.js',
        'src/assets/js/clipboard.min.js', 'src/assets/js/post.js'])
        .pipe(uglify())
        .pipe(concat('post.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))
});


gulp.task('watch_less', function () {
    gulp.watch('src/assets/less/**/*.less', ['less', 'css'])
});

gulp.task('watch_css', function () {
    gulp.watch('src/assets/css/*.css', ['css'])
});

gulp.task('watch_js', function () {
    gulp.watch('src/assets/js/**/*.js', ['main:js', 'post:js'])
});


//文件监听
gulp.task('auto', ['watch_less', 'watch_css', 'watch_js']);

//生产环境
gulp.task('build', ['less', 'css', 'main:js', 'post:js']);