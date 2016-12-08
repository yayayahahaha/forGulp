var gulp      = require('gulp'),
  concat      = require('gulp-concat'),
  minifyCSS   = require('gulp-minify-css'),
  uglify      = require('gulp-uglify'),
  rename      = require("gulp-rename"),
  htmlreplace = require('gulp-html-replace'),
  minifyHTML  = require('gulp-minify-html');

var jsList = ['library','index', 'page2'],
    cssList = ['cssTask'],
    htmlList = [],
    all = [];

  for(var i =1; i< jsList.length;i++){
    htmlList.push(jsList[i]+'_html');
  }

  all = jsList.concat(cssList);
  all = all.concat(htmlList);

  gulp.task('library',function(){
    return gulp.src('./app/assets/js/library/*.js')
    .pipe(concat('library.js'))
    .pipe(uglify())
    .pipe(rename(function(path){
      path.basename += '.min'
      path.extname = '.js'
      }))
    .pipe(gulp.dest('./output/assets/js/'));
  });

  gulp.task('cssTask',function(){
    return gulp.src('./app/assets/css/*.css')
    .pipe(concat('all.css'))
    .pipe(minifyCSS({
        keepBreaks: true,
      }))
    .pipe(rename(function(path){
      path.basename += '.min'
      path.extname = '.css'
      }))
    .pipe(gulp.dest('./output/assets/css/'));
  });

  for(var i = 1; i < jsList.length; i++){
    createJavascript(i);
    createHtml(i-1);
    console.log(i, htmlList[i-1]); 
  }
  function createHtml(i){
    gulp.task(htmlList[i], function(){
      var opts = {comments:false,spare:false,quotes:true};
      return gulp.src("./app/"+jsList[i+1]+".html")
      .pipe(htmlreplace({
          'css': 'assets/css/all.min.css',
          'js': 'assets/js/'+jsList[i+1]+'.min.js'
      }))  
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./output/'));
    });
  }

  function createJavascript(i){
    gulp.task(jsList[i],['library'],function(){
      return gulp.src(['./output/assets/js/library.min.js','app/assets/js/'+jsList[i]+'.js'])
      .pipe(concat(jsList[i]+'.js'))
      .pipe(uglify())
      .pipe(rename(function(path){
        path.basename += '.min'
        path.extname = '.js'
      }))
      .pipe(gulp.dest('./output/assets/js/'));
    });
  }

//console.log(all);
//gulp.task('default', jsList.concat(cssList));
gulp.task('default', all);