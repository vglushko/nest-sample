var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    tsProject = ts.createProject('tsconfig.json'),
    Config = require('./gulp.config'),
    config = new Config(),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('compile', () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destination));
});

gulp.task('tslint', () => {
    return gulp.src(config.sourceFiles).pipe(tslint({
        formatter: 'stylish'
    })).pipe(tslint.report({        
        emitError: false
    }));
});

gulp.task('watch', () => {
    gulp.watch([config.sourceFiles], ['tslint', 'compile']);
})

gulp.task('default', ['tslint', 'compile'], () => {});
gulp.task('serve', ['default', 'watch'], () => {});