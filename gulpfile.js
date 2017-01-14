const gulp    = require('gulp'),
      pug     = require('gulp-pug'),
      babel   = require('gulp-babel'),
      uglify  = require('gulp-uglify'),
      connect = require('gulp-connect');

gulp.task('connect', () => {
    connect.server({
        port: 1337,
        livereload: true,
        root: './dist'
    });
});

gulp.task('pug', () => {
    gulp.src('pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('build', () => {
    gulp.src('js/*.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch('pug/*.pug', ['pug']);
    gulp.watch('js/*.js', ['build']);
});

gulp.task('default', ['pug', 'build', 'connect', 'watch']);