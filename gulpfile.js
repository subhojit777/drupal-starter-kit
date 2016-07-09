var gulp = require('gulp');
var eslint = require('gulp-eslint');
var es = require('event-stream');

gulp.task('default', function() {
  var modules = gulp.src('docroot/sites/all/modules/custom/**/*.js');
  var themes = gulp.src('docroot/sites/all/themes/**/*.js');

  return es.merge(modules, themes)
    .pipe(eslint())
    .pipe(eslint.format());
});
