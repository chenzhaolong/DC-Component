const gulp = require('gulp');
const sass = require('gulp-sass');
const combiner = require('stream-combiner2');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

// 监听文件变化
gulp.task('watch', () => {
    gulp.watch('./Lib/sass/**/*.scss', ['css']);
});

// 编译 样式 文件
gulp.task('css', () => {
        gulp.src('./Lib/sass/**/*.scss')
            .pipe(sass())
            .pipe(rename(path => path.extname = '.css'))
            .pipe(gulp.dest('./Lib/libs'))
});

// 开发模式命令
gulp.task('dev', ['css', 'watch']);