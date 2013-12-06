describe( 'Categories', function() {

  var $httpBackend,categories,testData;

  beforeEach( module( 'jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, _Categories_){
    testData = {
      products:{
        'a1':{id:'a1'}
      },
      categories:{
        'a':{subCategories:['b'],products:['a1']},
        'b':{title:"tb"}
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

  it('should return all categories through direct promise', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all.length).toBe(2);
  });
  
  it('should default title to category id', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all[0].title).toBe('a');
    expect(all[1].title).toBe('tb');
  });
  
  it('should add id to all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all[0].id).toBe('a');
    expect(all[1].id).toBe('b');
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

  it('should expand subcategories', function(){
    var done;
    categories.getCategory('a').then(function(category){
      category.subCategories.then(function(data){
        expect(data[0]).toEqual(testData.categories.b);
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should expand products', function(){
    var done;
    categories.getCategory('a').then(function(category){
      category.products.then(function(data){
        expect(data[0]).toEqual(testData.products.a1);
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

});
