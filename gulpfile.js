var gulp = require("gulp"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

gulp.task('minify',function(){
  gulp.src('pnate.js')
  .pipe(uglify())
  .pipe(rename('pnate.min.js'))
  .pipe(gulp.dest('./'));
});
