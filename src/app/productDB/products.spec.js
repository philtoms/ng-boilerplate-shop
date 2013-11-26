describe( 'Products', function() {

  var $httpBackend,products;
  var testData = {
    products:{
      'a':{code:1,type:1},
      'b':{code:2,type:2},
      'c':{code:3,type:2},
      'd':{code:4,type:2}
    }
  };

  function count(obj) {
    var c=0;
    for (var v in obj) {c++;}
    return c;
  }

  beforeEach( module( 'ngbps.jsonRepository', 'ngbps.productDB'));

  beforeEach( inject(function(_$httpBackend_, Products){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/products.json').respond(testData);
    products = Products;
  }));

  it('should return all products', function(){
    var all;
    products.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(count(all)).toBe(4);
  });

  it('should sequence all products', function(){
    var all;
    products.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    var i=0;
    for(var p in all){
      expect(all[p].sequence).toBe(++i);
    }
  });

  it('should codify all products', function(){
    var all;
    products.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    var i=0;
    for(var p in all){
      expect(all[p].code).toBe('abcd'.charAt(i++));
    }
  });

  it('should expose the products queryable interface', function(){
    expect(products.getProduct).toBeDefined();
    expect(products.queryProducts).toBeDefined();
  });

  it('should return a single product', function(){
    var product;
    products.getProduct('code','a').then(function(data){
      product=data;
    });
    $httpBackend.flush();
    expect(product).toEqual(testData.products.a);
  });

});
