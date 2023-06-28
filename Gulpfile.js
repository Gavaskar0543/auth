const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');


async function clean() {
    console.log('Cleaning assets folder......');
    const { deleteAsync } = await import('del');
    const deletedFilePaths = await deleteAsync(['./public/assets/**/*']);
    const deletedDirectoryPaths = await deleteAsync(['./public/assets']);
  }

gulp.task('css', async function () {
  console.log('css minifying......');
  
  await import('gulp-rev').then((rev) => {
    return gulp.src('./assets/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest('./assets.css'))
      .pipe(rev.default())
      .pipe(gulp.dest('./public/assets'))
      .pipe(rev.default.manifest({
        cwd: './public',
        merge: true
      }))
      .pipe(gulp.dest('./public/assets/'));
  });
});


gulp.task('build', gulp.series(clean, gulp.parallel('css')));

gulp.task('default', gulp.series('build'));