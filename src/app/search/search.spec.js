describe ('search', function(){

  var $httpBackend,$timeout,search, SearchProvider;
  var testData = {
    admin:{
      search:{
        gseApiKey:'XXXXXXXXXXX-XXX-XXXXXXXXXXXXXX_XXXXXXXX',
        gseCx:'999999999999999999999:XXXXXXXXXXX'
      }
    },
    products:{
      p1:{title:'abcd efgh ij k lmonp QRST UvwxyZ'},
      p2:{title:'ABCD 123'}
    }  
  };

  var gseUrl = 'https://www.googleapis.com/customsearch/v1?' + 
    'key='+ testData.admin.search.gseApiKey + 
    '&cx='+ testData.admin.search.gseCx + 
    '&callback=JSON_CALLBACK' +
    '&q=XYZ';

  var gseResponse = {
    items:[
      {
        link:'a.html',
        htmlTitle:'XYZ',
        htmlSnippet:'Bla bla XYZ bla'
      }
    ] 
  };

  beforeEach(function () {
    // Initialize the service provider 
    // by injecting it to a fake module's config block
    var fakeModule = angular.module('test.app', [], function () {});
    fakeModule.config( function (_SearchProvider_) {
      SearchProvider = _SearchProvider_;
    });

    // Initialize test.app injector
    module( 'jsonRepository', 'ngbps.shopDB', 'ngbps.search', 'utilities','test.app');

    // Kickstart the injectors previously registered 
    // with calls to angular.mock.module
    inject(function () {});
  });


  beforeEach( inject(function(_$httpBackend_,_$timeout_, _Search_){
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET('assets/data/shop.json').respond(testData);
  
    $httpBackend.whenJSONP(gseUrl).respond(gseResponse);

    $timeout = _$timeout_;
    search = _Search_;
  }));


  describe('displaced result set', function(){
    it('should map all products with title abcd onto search results array', function(){
      search.filter('abcd');
      $httpBackend.flush();
      expect(search.results.length).toBe(2);
    });
  });

  describe('typeahead result set', function(){

    it('should return all products with title abcd as results array', function(){
      SearchProvider.displaced=false;
      search.filter('abcd');
      $httpBackend.flush();
      expect(search.results.length).toBe(2);
    });
  });

  describe('filter', function(){
    it('should filter products with title "abcd efg"', function(){
      search.filter('abcd efg');
      $httpBackend.flush();
      expect(search.results.length).toBe(1);
    });

    it('should be case insensitive', function(){
      search.filter('ABCD');
      $httpBackend.flush();
      expect(search.results.length).toBe(2);
    });

    it('should suppress results for inputs < minimum query length"', function(){
      SearchProvider.minimumQueryLength=5;
      search.filter('abcd');
      $httpBackend.flush();
      expect(search.results.length).toBe(0);
    });

    it('should reset search context', function(){
      search.filter('ABCD');
      $httpBackend.flush();
      expect(search.results.length).toBe(2);

      search.reset();
      $timeout.flush();
      expect(search.results).toEqual([]);
    });


  });

  describe('GoogleSearchEngine', function(){

    var markup='<div>{{search.results[0].title}}</div>', $element;

    beforeEach(inject(function(_$rootScope_ ,$compile){
      $rootScope = _$rootScope_;

      scope = $rootScope.$new();
      scope.search = search;
      $element = $compile(markup)(scope);
    }));

    it ('should process response from GSE', function(){
      var results;
      search.filter('XYZ');
      search.more();
      $httpBackend.flush();
      expect(search.results.length).toBe(1);
    });

    it ('should apply response from GSE', function(){
      search.filter('XYZ');
      search.more();
      $httpBackend.flush();
      expect($element.text()).toBe('XYZ');
    });

    it('should force reset search context', function(){
      search.filter('XYZ');
      search.more();
      $httpBackend.flush();
      expect($element.text()).toBe('XYZ');

      // soft reset
      search.reset();
      $timeout.flush();
      expect($element.text()).toBe('XYZ');

      // hard reset
      search.reset(true);
      $timeout.flush();
      expect(search.results).toEqual([]);
    });

  });
});