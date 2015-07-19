module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    plugins: ['karma-chrome-launcher', 'karma-jasmine'],
    files: [
      'src/index.html', 'src/app.js', 'src/**/*.html', 'src/**/*.js'
    ]
  });
};