module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '',
    files: [
      'bower-components/angular/angular.js',
      'bower-components/angular-mocks/angular-mocks.js',
      'angular-progress-arc.js',
      'test/**/*.js'
    ],
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'jasmine'
    ],
    reporters: [
      'dots',
      'coverage'
    ],
    preprocessors: {
      'angular-progress-arc.js': ['coverage']
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-junit-reporter'
    ],
    notifyReporter: {
      reportEachFailure: true,
      reportSuccess: false
    },
    coverageReporter: {
      reporters: [
        {
          type: 'html',
          subdir: 'report-html'
        },
        {
          type: 'lcov',
          subdir: 'report-lcov'
        },
        {
          type: 'text-summary',
          subdir: 'report-summary',
          file: 'text-summary.txt'
        }
      ]
    }
  });
};

