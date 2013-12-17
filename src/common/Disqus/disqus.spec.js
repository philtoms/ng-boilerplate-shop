describe('DISQUS', function() {

  var $window, $rootScope, $compile;
  var markup = '<disqus identifier="TESTTHREAD" short-name="TEST"></disqus>';

  beforeEach(function() {
    module('DISQUS', function($provide) {
      $provide.decorator('$window', function($delegate) {

        $delegate = {
          DISQUS: {
            reset: jasmine.createSpy()
          },
          document: {
            createElement: angular.noop,
            getElementsByTagName: angular.noop
          }
        };

        spyOn($delegate.document, 'createElement').andReturn({});
        spyOn($delegate.document, 'getElementsByTagName').andReturn([{appendChild:angular.noop}]);

        return $delegate;
      });
    });

    inject(function(_$rootScope_, _$compile_, _$window_) {
      $window = _$window_;
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });     

  });


  it('should place a div with id disqus_thread in DOM', function() {
    var element = $compile(markup)($rootScope);
    expect(element[0].tagName).toBe('DIV');
    expect(element[0].id).toBe('disqus_thread');
  });

  it('should do a call to DISQUS.reset on reload', function() {
    var element1 = $compile(markup)($rootScope);
    var element2 = $compile(markup)($rootScope);

    var resetFn = $window.DISQUS.reset;

    expect(resetFn).toHaveBeenCalled();
  });

  it('should set global page variables', function() {
    var element = $compile('<disqus identifier="TESTTHREAD" short-name="TEST" title="TESTTITLE"></disqus>')($rootScope);

    expect($window.disqus_identifier).toBe("TESTTHREAD");
    expect($window.disqus_title).toBe("TESTTITLE");
  });

});