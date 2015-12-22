var gulp = require('gulp'),
  jade = require('gulp-jade'),
  serve = require('gulp-serve'),
  locals = require('./locals.json'),
  fs = require('fs');

gulp.task('jade', function() {
  gulp.src(
    ['**/*.jade', 
    '!**/layout/*.jade',
    '!**/layout/**/*.jade',
    ], { cwd: 'jade' })
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('jade/**/*.jade', ['jade']);
})

gulp.task('serve', serve({
  root: __dirname,
  port: 8000,
  middleware: function(req, res, next) {
    var exists = fs.existsSync(__dirname + req.url);
    if (!exists && req.url.indexOf('.') === -1) {
      req.url += '.html';
    }
    next();
  }
}));

gulp.task('default', ['serve', 'jade', 'watch']);
