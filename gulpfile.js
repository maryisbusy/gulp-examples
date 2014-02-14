var gulp = require('gulp');

var concat = require('gulp-concat');
var sass = require('gulp-sass');  
var stylus = require('gulp-stylus');  

var paths = {
  sass: 'scss/**/*.scss',
  stylus: 'stylus/**/*.styl',
  scripts: 'scripts/**/*.js'
};

gulp.task('sass-styles', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(concat('styles-sass.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('stylus-styles', function() {
    gulp.src(paths.stylus)
        .pipe(stylus({
            use: ['nib'],
            set: ['compress', 'linenos']
        }))
        .pipe(concat('styles-stylus.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'));
});


// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass-styles']);
    gulp.watch(paths.stylus, ['stylus-styles']);
    gulp.watch(paths.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass-styles', 'stylus-styles', 'scripts', 'watch']);



