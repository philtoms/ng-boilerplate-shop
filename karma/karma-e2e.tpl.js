module.exports = function ( karma ) {
  karma.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      // Include the ng-scenario library and adapter
      // Remove these when `karma-ng-scenario` can be included:
      // https://github.com/karma-runner/grunt-karma/issues/13
      'vendor/angular-scenario/angular-scenario.js',
      'node_modules/karma-ng-scenario/lib/adapter.js',

      // Include all scenario tests
      'src/**/*.scenario.*',

      // Serve the contents of the "dist" folder as static files
      {pattern: '<%= grunt.config( "build_dir" ) %>/**/*', watched: false, included: false, served: true}
    ],

    //frameworks: [ 'ng-scenario' ],
    plugins: [ 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-coffee-preprocessor' ],
    preprocessors: {
      '**/*.coffee': 'coffee'
    },

    /**
     * How to report, by default.
     */
    reporters: 'dots',

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9020,
    runnerPort: 9102,
    urlRoot: '/',

    /** 
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * Run E2E tests once by default
     */
    singleRun: true,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Firefox'
    ]
  });
};

