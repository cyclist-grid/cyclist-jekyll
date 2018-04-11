var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');


// Paths

function sharedPaths(basePath) {
  var paths = {};
  paths.src = path.join(basePath, 'src');
  paths.build = path.join(basePath, 'build');
  // Sass
  paths.sass = {};
  paths.sass.src = path.join(paths.src, 'sass');
  paths.sass.build = path.join(paths.build, 'css');
  paths.sass.srcGlob = paths.sass.src + '/*.scss';

  return paths;
}
var paths = {};
// Examples
paths.examples = sharedPaths('examples');
// Test
paths.test = sharedPaths('test');
paths.test.lib = path.join('test', 'lib');
// Jade Test
paths.test.jade = {};
paths.test.jade.src = path.join(paths.test.src, 'jade');
paths.test.jade.build = path.join(paths.test.build, 'html');
paths.test.jade.srcGlob = paths.test.jade.src + '/*.jade';
paths.test.jade.srcWatchGlob = paths.test.jade.src + '/**/*.jade';
// Dist
paths.dist = {};
paths.dist.sass = {};
paths.dist.sass.src = 'dist';
paths.dist.sass.srcGlob = paths.dist.sass.src + '/*.scss';
paths.dist.sass.build = paths.dist.sass.src;
paths.dist.sass.srcWatchGlob = 'dist/**/*.scss';

// Sass

function doSass(srcPath, buildPath) {
  gulp.src(srcPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(buildPath));
}

gulp.task('sass-examples', function () {
  doSass(paths.examples.sass.srcGlob, paths.examples.sass.build);
});

gulp.task('sass-test', function () {
  doSass(paths.test.sass.srcGlob, paths.test.sass.build);
});

gulp.task('sass-dist', function () {
  doSass(paths.dist.sass.srcGlob, paths.dist.sass.build);
});

// Jade

function doJade(srcPath, buildPath) {
  gulp.src(srcPath)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(buildPath));
}

gulp.task('jade-test', function() {
  doJade(paths.test.jade.srcGlob, paths.test.jade.build);
});



// Watch

gulp.task('watch', function () {
  gulp.watch(paths.dist.sass.srcWatchGlob, ['sass-dist']);

  var examplesSassPaths = [paths.dist.sass.srcWatchGlob, paths.examples.sass.srcGlob];
  gulp.watch(examplesSassPaths, ['sass-examples']);
  // Test sass
  var testSassPaths = [paths.dist.sass.srcWatchGlob, paths.test.sass.srcGlob];
  gulp.watch(testSassPaths, ['sass-test']);
  gulp.watch(paths.test.jade.srcWatchGlob, ['jade-test']);
});

gulp.task('jade', ['jade-test']);
gulp.task('sass', ['sass-examples', 'sass-test', 'sass-dist']);
gulp.task('default', ['sass', 'jade']);
