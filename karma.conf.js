module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher'
    ],
    //list of files to load in browser, pay attn to order
    files: [
      //source files
      './client/lib/angular/angular.min.js',
      './client/lib/angular-animate/angular-animate.min.js',
      './client/lib/angular-bootstrap/ui-bootstrap.min.js',
      './client/lib/angular-route/angular-route.min.js',
      './client/lib/angular-ui-router/release/angular-ui-router.min.js',
      './client/lib/jquery/dist/jquery.min.js',
      './client/lib/bootstrap/dist/js/bootstrap.min.js',
      // './node_modules/requirejs/require.js',
      // './node_modules/karma-requirejs/lib/adapter.js',
      './node_modules/sequelize/lib/sequelize.js',




      //app code
      './client/**/**/*.js',
      './server/db/*.js',

      //spec files
      './spec/specs.js'
    ],


    /*
    port: 3000,
    preprocessors: {

    },

    reporters: [],


    colors: true,

    logLevel: config.LOG_INFO


      singleRun: true
      */
  })
}
