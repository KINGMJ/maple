var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
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
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css'))
});

//压缩、合并js文件
gulp.task('js', function () {
    gulp.src('src/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
});


gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('src/assets/less/**/*.less', ['less'])
});

//生产环境
gulp.task('build', ['less', 'js']);