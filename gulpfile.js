let gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    autoprefixer    = require('gulp-autoprefixer'),
    less            = require('gulp-less'),
    babel           = require('gulp-babel'), // Перевод JS => ES6 в ES5
    concat          = require('gulp-concat'), // Соединяет файлы в 1
    rename          = require("gulp-rename"),
    path            = require('path'),
    cleanCSS        = require('gulp-clean-css'), // minify css
    uglify          = require('gulp-uglify-es').default; // Сжимаем JS

// Авто обновление браузера
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    browser: "chrome",
    notify: false

  });
  browserSync.watch('*.html', browserSync.reload);
  browserSync.watch('./less/*.less', browserSync.reload);
});

// Подрубаем "LESS"
gulp.task('less', () => {
  return gulp.src('./less/style.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// Подрубаем "JS"
gulp.task('scripts', () => {
  return gulp.src('./js/*.js')
  // .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(uglify())
  // .pipe(rename("script.min.js"))
  .pipe(gulp.dest('./js/min'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// Подрубаем слежку
gulp.task('watch', () => {
  gulp.watch('./less/*.less', gulp.series('less'));
  gulp.watch('./js/*.js', gulp.series('scripts'));
  // gulp.watch('./img/*', gulp.series('img'));
});

// Всё собираем
gulp.task('default', gulp.series(
  gulp.parallel('less', 'scripts'),
  gulp.parallel('watch', 'serve')
));
