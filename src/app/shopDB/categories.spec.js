describe( 'Categories', function() {

  var $httpBackend,categories;
  var testData = {
    categories:{
      'a':{id:1},
      'b':{id:2, title:"tb"}
    }
  };

  beforeEach( module( 'ngbps.jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, _Categories_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/shop.json').respond(testData);
    categories = _Categories_;
  }));

  it('should expose the categories queryable interface', function(){
    expect(categories.getCategory).toBeDefined();
    expect(categories.queryCategories).toBeDefined();
  });

  it('should return all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all.length).toBe(2);
  });
  
  it('should titlize all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all[0].title).toBe('a');
    expect(all[1].title).toBe('tb');
  });
  
  it('should add url to all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all[0].url).toBe('a');
    expect(all[1].url).toBe('b');
  });

});
