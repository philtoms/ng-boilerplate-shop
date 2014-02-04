/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * Seo can be configured for local or remote scraping. A local server will
   * be fired up on the designated port.
   */
  seo_options: {
    domain: 'localhost:9000',
    server: '',
    delay: 2000,
    public: 'public',
    folder: 'seo',
    changefreq: 'daily',
    replace: {
    }
  },

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, `unit` contains our
   * app's unit tests, `fixture` contains $http data fixtures, and `scenario`
   * contains our app's e2e tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/**/*.midway.js', '!src/**/*.fixture.js', '!src/**/*.scenario.js' ],
    jsunit: [ 'src/**/*.spec.js', 'src/**/*.midway.js' ],
    jsfixture: [ 'src/**/*.fixture.js' ],
    jsscenario: [ 'src/**/*.scenario.js' ],
    
    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee', '!src/**/*.midway.coffee', '!src/**/*.fixture.coffee', '!src/**/*.scenario.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee', 'src/**/*.midway.coffee' ],
    coffeefixture: [ 'src/**/*.fixture.coffee' ],
    coffeescenario: [ 'src/**/*.scenario.coffee' ],

    atpl: [ 'src/app/**/*.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    views: [ '**/*.html', '!**/*.tpl.html'],
    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.dev` property holds any JS files to be included for
   * development only.
   */
  vendor_files: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-social/angular-social.js',
      /*
       * disabled until bootstrap is compatible with angular > ~1.2 
      'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      */
      'vendor/placeholders/angular-placeholders.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-ui-utils/modules/route/route.js'
    ],
    css: [
      'vendor/angular-social/angular-social.css',
    ],
    dev: [
      'vendor/angular-mocks/angular-mocks.js',
      'node_modules/ng-midway-tester/src/ngMidwayTester.js'
    ]
  }
};
