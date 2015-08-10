var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var csscomb = require('gulp-csscomb');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var header = require('gulp-header');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require("gulp-minify-html");
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');
var order = require("gulp-order");
var protractor = require("gulp-protractor").protractor;

var pkg = require('./package.json');
var mainName = 'slModule';
var dir = 'src/src/app/slModule';

var banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @author <%= pkg.author %>',
' * @version v<%= pkg.version %>',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' */',
''].join('\n');

gulp.task('styles', function() {
    gulp.src([dir+'/**/*.less'])
    .pipe(less({
        strictMath: true
        }))
    .pipe(csscomb())
    .pipe(minifyCSS())
    .pipe(concat(mainName+'.css'))
    .pipe(gulp.dest('dist'))
    .pipe(rename({
        suffix: '.min'
        }))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(gulp.dest('dist'));
    });



gulp.task('service', function() {
    gulp.src([dir+'/slModule.js', dir+'/**/*.js', '!'+dir+'/**/*.spec.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
        .pipe(ngAnnotate())
        .pipe(addsrc('build/**/*.js'))
        .pipe(order([
            'slModule.js',
            dir+'/**/**.js',
            'build/'+mainName+'.templates.js'
            ]))
        .pipe(concat(mainName+'.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
            }))
        .pipe(header(banner, { pkg : pkg }))
        .pipe(gulp.dest('dist'))
        });

// ======
gulp.task('e2eTest', function() {
    gulp.src([dir+'./**/*_spec.js'])
    .pipe(protractor({
        configFile: "protractor_conf.js",
        }))
    .on('error', function(e) {throw e});
    });

gulp.task('tests', ['e2eTest']);
gulp.task('build', ['styles', 'service']);
gulp.task('deploy', ['build', 'tests']);

gulp.task('default', ['deploy'], function() {});