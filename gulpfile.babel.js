import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import nib from 'nib';

// var git = require('gulp-git');
// var bump = require('gulp-bump');
// var filter = require('gulp-filter');
// var tag_version = require('gulp-tag-version');
// var runSequence = require('run-sequence');
// var wrap = require("gulp-wrap");
// var gutil = require('gulp-util');
// var serve = require('gulp-serve');
// var karma = require('gulp-karma');
// var files = require('./files.conf');
// var testFiles = [].concat(files.libs, files.src, files.test);

gulpLoadPlugins({
  camelize: true
});


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const demo = 'demo/',
  src = 'src/',
  dist = './',
  tmp = '.tmp/';

gulp.task('bump-version', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe($.bump({
      type: "patch"
    }).on('error', $.util.log))
    .pipe(gulp.dest('./'));
});


gulp.task('build', ['styles', 'templates', 'scripts'], () => {
  gulp.src("./angular-minimal-piechart.js")
    .pipe($.wrap({
      src: './build.txt'
    }, {
      info: require('./package.json')
    }))
    .pipe(gulp.dest(dist));

  gulp.src("./angular-minimal-piechart.css")
    .pipe($.wrap({
      src: './build_css.txt'
    }, {
      info: require('./package.json')
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('styles', () => {
  return gulp.src(src + '/**/*.styl')
    .pipe($.stylus({
      compress: true,
      use: nib()
    }))
    .pipe($.concat('angular-minimal-piechart.css'))
    .pipe(gulp.dest(dist))
    .pipe(reload({
      stream: true
    }));
});


gulp.task('scripts', () => {
  return gulp.src([src + '/**/*.js', tmp + '*.js'])
    .pipe($.babel())
    .pipe($.concat('angular-minimal-piechart.js'))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest(dist))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('templates', () => {
  return gulp.src(src + 'templates/*.html')
    .pipe($.minifyHtml({
      quotes: true
    }))
    .pipe($.angularTemplatecache('templates.js', {
      module: 'minimalPiechart'
    }))
    .pipe(gulp.dest(tmp));
});

gulp.task('serve', ['styles', 'templates', 'scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: [dist, demo],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(demo + '*.*').on('change', reload);

  gulp.watch(src + '/**/*.styl', ['styles']);
  gulp.watch([tmp + '**/*.js', src + '**/*.js'], ['scripts']);
  gulp.watch(src + '**/*.html', ['templates']);
});


//
// gulp.task('test', function() {
// 	// Be sure to return the stream
// 	return gulp.src(testFiles)
// 		.pipe(karma({
// 			configFile: 'karma.conf.js',
// 			action: 'run'
// 		}))
// 		.on('error', function(err) {
// 			// Make sure failed tests cause gulp to exit non-zero
// 			throw err;
// 		});
// });
