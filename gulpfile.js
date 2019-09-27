var webserver = require('gulp-webserver');
var gulp = require('gulp');
var inject = require('gulp-inject');
gulp.task('default', function () {
    console.log('Hello World!');
  });
var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/**/*.css',
  tmpJS: 'tmp/**/*.js',  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js'
};

  gulp.task('html', function () {
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
  });
  gulp.task('css', function () {
    return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.tmp));
  });
  gulp.task('js', function () {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
  });
gulp.task('copy',gulp.series('html', 'css', 'js'));
gulp.task('inject', gulp.series('copy', function () {
    var css = gulp.src(paths.tmpCSS);
    var js = gulp.src(paths.tmpJS);
    return gulp.src(paths.tmpIndex)
      .pipe(inject( css, { relative:true } ))
      .pipe(inject( js, { relative:true } ))
      .pipe(gulp.dest(paths.tmp));
  }));
  gulp.task('serve', gulp.series('inject', function () {
    return gulp.src(paths.tmp)
      .pipe(webserver({
        port: 3000,
        livereload: true
      }));
  }));
  gulp.task('watch',gulp.series('serve', function(){
    gulp.watch(paths.src,gulp.series['inject'])
    .on('change', function(path, stats) {
        console.log(path);
        // code to execute on change
    })
    .on('unlink',  function(path, stats) {
        console.log(path);
        // code to execute on delete
    });
}));