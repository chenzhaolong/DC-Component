const gulp = require('gulp');
const sass = require('gulp-sass');
const combiner = require('stream-combiner2');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');

// 监听文件变化
gulp.task('watch', () => {
    gulp.watch('./Lib/sass/**/*.scss', ['css']);
});

// 编译 样式 文件
gulp.task('css', () => {
        gulp.src('./src/style/**/*.scss')
            .pipe(sass())
            .pipe(rename(path => path.extname = '.css'))
            .pipe(gulp.dest('./src/component/'))
});

// 将组件的md文件合并到一个md文件
gulp.task('allMd', () => {
   gulp.src('./src/components/**/*md')
       .pipe(concat('README.md'))
       .pipe(gulp.dest('./docs'));
});

// 开发模式命令
gulp.task('sc2c', ['css', 'watch']);

// 合并md文件
gulp.task('merge', ['allMd']);