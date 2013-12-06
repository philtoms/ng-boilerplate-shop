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
    var category;
    categories.getCategory('a').then(function(data){
      category=data;
    });
    $httpBackend.flush();
    expect(category).toEqual(testData.categories.a);
  });

  it('should return null for invalid property value', function(){
    var category;
    categories.getCategory('x').then(function(data){
      category=data;
    });
    $httpBackend.flush();
    expect(category).toBeNull();
  });

  it('should expand subcategories', function(){
    var subCategories;
    categories.getCategory('a').then(function(data){
      subCategories = data.subCategories;
    });
    $httpBackend.flush();
    expect(subCategories[0]).toEqual(testData.categories.b);
  });

  it('should expand products', function(){
    var products;
    categories.getCategory('a').then(function(category){
      products = category.products;
    });
    $httpBackend.flush();
    expect(products[0]).toEqual(testData.products.a1);
      
  });

});
