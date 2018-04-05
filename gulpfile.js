/*================

Gulpfile wararyo non-PHP Project

===============*/

/*================
Settings
===============*/

var htmlfiles = "src/**.html"
var jsfiles = "src/js/**.js";
var scssfiles = "src/scss/**.scss";
var imagefiles = "src/images/**";

//var server = "localhost:8888";

/*================*/

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var autoprefixer = require("gulp-autoprefixer");
var frontnote = require("gulp-frontnote");
var uglify = require("gulp-uglify");
var browser = require("browser-sync").create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var usage = ['','Gulpfile for STANS-INC',
	'Usage: gulp [ start | frontnote | sass | js ]',
	'	Basic:',
	'		start     : start browser-sync and auto-compiling',
	'		frontnote : create style guide with frontnote',
	'	Advanced:',
	'		sass      : compile sass manually',
	'		js        : compile javascript manually',''
 ];
 
gulp.task("server", function() {
    browser.init({
        server: "dist"
    });
});

gulp.task("reload", function() {
    browser.reload();
});
 
gulp.task("sass", function() {
    gulp.src(scssfiles)
    	.pipe(plumber({errorHandler: notify.onError({
        	message: "<%= error.message %>",
        	title: "風変わりなSCSSどすなあ"
      	})}))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("dist/"));
});

gulp.task("html", function() {
    gulp.src(htmlfiles)
        .pipe(gulp.dest("dist/"));
});

gulp.task("frontnote", function() {
	gulp.src(scssfiles)
		.pipe(frontnote({
	            css: 'dist/style.css'
	        }));
});

gulp.task("js", function() {
    gulp.src(jsfiles)
    	.pipe(plumber({errorHandler: notify.onError({
        	message: "<%= error.message %>",
        	title: "風変わりなJavaScriptどすなあ"
      	})}))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("start",['server'], function() {
    gulp.watch(jsfiles,["js","reload"]);
    gulp.watch(scssfiles,["sass","reload"]);
    gulp.watch(htmlfiles,["html","reload"]);
    gulp.watch("dist/**",["reload"]);
});

gulp.task('default', function() {
	console.log(usage.join('\n'));
});