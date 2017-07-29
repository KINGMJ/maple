var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
    gulp.src(['src/assets/less/**/main.less', 'src/assets/less/**/*.less'])
        .pipe(concat('style.less'))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('src/assets/less/**/*.less', ['less'])
});


gulp.task('test', function () {
    gulp.src('src/assets/less/**/test.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css'))
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['less', 'auto']);