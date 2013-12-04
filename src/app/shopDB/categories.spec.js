describe( 'Categories', function() {

  var $httpBackend,categories,testData;

  beforeEach( module( 'ngbps.jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, _Categories_){
    testData = {
      categories:{
        'a':{id:1},
        'b':{id:2, title:"tb"}
      }
    };
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
  
  it('should auto titlize all categories', function(){
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

  it('should return a filtered array', function(){
    var filteredCategories;
    categories.queryCategories('title','tb').then(function(data){
      filteredCategories=data;
    });
    $httpBackend.flush();
    expect(filteredCategories.length).toBe(1);
    expect(filteredCategories[0]).toEqual(testData.categories.b);
  });

  it('should return a single category', function(){
    var done;
    categories.getCategory('a').then(function(category){
      expect(category).toEqual(testData.categories.a);
      done=true;
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should return null for invalid property value', function(){
    var done;
    categories.getCategory('x').then(function(category){
      expect(category).toBeNull();
      done=true;
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

});
