var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    tsProject = ts.createProject('tsconfig.json'),
    Config = require('./gulp.config'),
    config = new Config(),
    sourcemaps = require('gulp-sourcemaps'),
    jasmine = require('gulp-jasmine'),
    del = require('del');

gulp.task('clean', () => {
    return del([config.destination]);
})

gulp.task('compile', ['clean'], () => {
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
        emitError: true
    }));
});

gulp.task('test', () => {
    return gulp.src(config.jsTestFiles)
        .pipe(jasmine({
            errorOnFail: true,
            verbose: true,
            incluseStackTrace: true
        }));
})

gulp.task('watch', () => {
    gulp.watch([config.sourceFiles], ['tslint', 'compile']);
})

gulp.task('default', ['tslint', 'compile', 'test'], () => {});
