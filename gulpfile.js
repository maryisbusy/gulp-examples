var gulp = require('gulp');

var sass = require('gulp-sass');  
var stylus = require('gulp-stylus');  
var imageMin = require('gulp-imagemin');  

var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var stripDebug = require('gulp-strip-debug');  
var uglify = require('gulp-uglify');  
var clean = require('gulp-clean');  

var paths = {
  sass    : 'src/scss/**/*.scss',
  stylus  : 'src/stylus/**/*.styl',
  scripts : 'src/scripts/**/*.js',
  images  : 'src/imgs/**/*'
};

var prodPaths = {
  css    : 'build/css',
  js     : 'build/js',
  images : 'build/images'
};

gulp.task('sass-styles', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(concat('styles-sass.css'))
        .pipe(gulp.dest(prodPaths.css));
});

gulp.task('stylus-styles', function() {
    gulp.src(paths.stylus)
        .pipe(stylus({
            use: ['nib'],
            set: ['linenos']
        }))
        .pipe(concat('styles-stylus.css'))
        .pipe(gulp.dest(prodPaths.css));
});

gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(prodPaths.js));
});

gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(imageMin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(prodPaths.images));
});

gulp.task('clean', function() {
    gulp.src([prodPaths.css, prodPaths.js, prodPaths.images], {read: false})
        .pipe(clean());
});

gulp.task('production', function() {

    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(concat('styles-sass.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(prodPaths.css));

    gulp.src(paths.stylus)
        .pipe(stylus({
            use: ['nib'],
            set: ['compress']
        }))
        .pipe(concat('styles-stylus.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(prodPaths.css));

    gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(prodPaths.js));

    gulp.start('images');
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass-styles']);
    gulp.watch(paths.stylus, ['stylus-styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass-styles', 'stylus-styles', 'scripts', 'images', 'watch']);



