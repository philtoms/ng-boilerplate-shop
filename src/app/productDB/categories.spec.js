describe( 'Categories', function() {

  var $httpBackend,categories;
  var testData = {
    categories:{
      'a':{id:1},
      'b':{id:2, title:"tb"}
    }
  };

  function count(obj) {
    var c=0;
    for (var v in obj) {c++;}
    return c;
  }

  beforeEach( module( 'ngbps.jsonRepository', 'ngbps.productDB'));

  beforeEach( inject(function(_$httpBackend_, _Categories_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/products.json').respond(testData);
    categories = _Categories_;
  }));

  it('should return all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(count(all)).toBe(2);
  });
  
  it('should titlize all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all.a.title).toBe('a');
    expect(all.b.title).toBe('tb');
  });
  
  it('should add url to all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all.a.url).toBe('a');
    expect(all.b.url).toBe('b');
  });

  it('should expose the categories queryable interface', function(){
    expect(categories.getCategory).toBeDefined();
    expect(categories.queryCategories).toBeDefined();
  });

});
