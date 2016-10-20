var gulp = require('gulp');
var eslint = require('gulp-eslint');
var csslint = require('gulp-csslint');
var sasslint = require('gulp-sass-lint');
var options = require('minimist')(process.argv.slice(2));
var phpcs = require('gulp-phpcs');
var guppy = require('git-guppy')(gulp);
var YAML = require('yamljs');
// Get the configuration file
var config = YAML.load('./config.yml');
var drupal_root = config.drupal_root;
var tools = config.tools;
var gulp_default_tasks = [];
var gulp_commit_tasks = [];

if (tools.js && tools.js.enable) {
  if (!tools.js.include || !tools.js.include.length) {
    return;
  }
  var jf = [];
  tools.js.include.forEach(function(file) {
    jf.push(drupal_root + file);
  });
  // Execute js lint.
  gulp.task('jslint', function() {
    return gulp.src(jf)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
  // Add to gulp tasks
  gulp_default_tasks.push('jslint');
  gulp_commit_tasks.push('jslint');
}

if (tools.css && tools.css.enable) {
  if (!tools.css.include || !tools.css.include.length) {
    return;
  }
  var cf = [];
  tools.css.include.forEach(function(file) {
    cf.push(drupal_root + file);
  });
  // Execute csslint.
  gulp.task('csslint', function() {
    return gulp.src(cf)
      .pipe(csslint())
      .pipe(csslint.reporter())
      .pipe(csslint.reporter('fail'));
  });
  // Add to gulp tasks
  gulp_default_tasks.push('csslint');
  gulp_commit_tasks.push('csslint');
}

if (tools.sass && tools.sass.enable) {
  if (!tools.sass.include || !tools.sass.include.length) {
    return;
  }
  var sf = [];
  tools.sass.include.forEach(function(file) {
    sf.push(drupal_root + file);
  });
  // Execute scsslint.
  gulp.task('scsslint', function () {
    return gulp.src(sf)
     .pipe(sasslint())
     .pipe(sasslint.format())
     .pipe(sasslint.failOnError());
  });

  // Add to gulp tasks
  gulp_default_tasks.push('scsslint');
  gulp_commit_tasks.push('scsslint');
}

if (tools.phpcs && tools.phpcs.enable) {
  if (!tools.phpcs.include || !tools.phpcs.include.length) {
    return;
  }
  var extensions = tools.phpcs.exts,
      excludePatterns = tools.phpcs.exclude;
      sourcePatterns = [],

  // Source file defaults to a pattern.
  tools.phpcs.include.forEach(function(file) {
    sourcePatterns.push(drupal_root + file + '.' + extensions);
  });
  // Execute php code sniffer.
  gulp.task('phpcs', function () {
    // If path is provided, override.
    // @todo need to debug this.
    // if (options.hasOwnProperty('path') && options.path.length > 0) {
    //   sourcePatterns = [
    //     options.path + '/*.' + extensions,
    //     options.path + '/**/*.' + extensions
    //   ];
    // }

    // Merge sourcePatters with excludePatterns.
    sourcePatterns = sourcePatterns.concat(excludePatterns);

    // Run phpcs.
    return gulp.src(sourcePatterns)
      .pipe(phpcs({
        bin: './vendor/bin/phpcs',
        standard :  './.phpcsrc.xml',
        warningSeverity: 0
      }))
      .pipe(phpcs.reporter('log'))
      .pipe(phpcs.reporter('fail'));
  });
  // Add to gulp tasks
  gulp_default_tasks.push('phpcs');
  gulp_commit_tasks.push('phpcs');
}

// Runs on git pre-commit.
if (gulp_commit_tasks && gulp_commit_tasks.length) {
  gulp.task('pre-commit', gulp_commit_tasks);
}

// Default gulp task. Runs when gulp is executed standalone.
if (gulp_default_tasks && gulp_default_tasks.length) {
  gulp.task('default', gulp_default_tasks);
}
