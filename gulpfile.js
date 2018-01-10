const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

/*扫描存在的sass文件*/
gulp.task('scannerCss', function() {
    console.log('here');
    gulp.src('../libs/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('../libs'))
        .pipe(rename({extname: 'css'}))
});

gulp.task('default', function() {
    gulp.watch('../libs/*.sass', ['scannerCss'])
});