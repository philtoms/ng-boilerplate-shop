describe( 'Categories', function() {

  var $httpBackend,categories,testData;

  beforeEach( module( 'jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, _Categories_){
    testData = {
      products:{
        'p1':{id:'p1',links:['p3']},
        'p3':{title:'P 3'}
      },
      categories:{
        'c1':{subCategories:['c2'],products:['p1']},
        'c2':{title:"C 2",products:['p3']}
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
    expect(all[0].title).toBe('c1');
    expect(all[1].title).toBe('C 2');
  });
  
  it('should add id to all categories', function(){
    var all;
    categories.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all[0].id).toBe('c1');
    expect(all[1].id).toBe('c2');
  });

  it('should return a filtered array', function(){
    var filteredCategories;
    categories.queryCategories('title','C 2').then(function(data){
      filteredCategories=data;
    });
    $httpBackend.flush();
    expect(filteredCategories.length).toBe(1);
    expect(filteredCategories[0]).toEqual(testData.categories.c2);
  });

  it('should return a single category', function(){
    var category;
    categories.getCategory('c1').then(function(data){
      category=data;
    });
    $httpBackend.flush();
    expect(category).toEqual(testData.categories.c1);
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
    categories.getCategory('c1').then(function(data){
      subCategories = data.subCategories;
    });
    $httpBackend.flush();
    expect(subCategories[0]).toEqual(testData.categories.c2);
  });

  it('should expand products', function(){
    var products;
    categories.getCategory('c1').then(function(category){
      products = category.products;
    });
    $httpBackend.flush();
    expect(products[0]).toEqual(testData.products.p1);      
    expect(products[0].links[0]).toEqual('p3');
  });

  it('should generate lowercase category urls', function(){
    var category;
    categories.getCategory('c2').then(function(data){
      category = data;
    });
    $httpBackend.flush();
    expect(category.url).toBe('c-2');
  });

  it('should generate lowercase product urls', function(){
    var products;
    categories.getCategory('c2').then(function(category){
      products = category.products;
    });
    $httpBackend.flush();
    expect(products[0].url).toBe('p-3');
  });

  it('should return fully expanded product', function(){
    var product;
    categories.getProductByCategory('c1','p1').then(function(data){
      product = data;
    });
    $httpBackend.flush();
    expect(product).toEqual(testData.products.p1);      
    expect(product.links[0].links[0]).toEqual(testData.products.p3);
  });

});
