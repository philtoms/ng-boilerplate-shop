describe( 'ProductDB', function() {

  var $httpBackend,productDB;
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

  beforeEach( inject(function(_$httpBackend_, _ProductDB_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/products.json').respond(testData);
    productDB = _ProductDB_;
  }));

  it('should expose the products queryable object', function(){
    expect(productDB.products).toBeDefined();
    expect(productDB.products.where).toBeDefined();
    expect(productDB.products.then).toBeDefined();
  });

  it('should expose the categories queryable object', function(){
    expect(productDB.categories).toBeDefined();
    expect(productDB.categories.where).toBeDefined();
    expect(productDB.categories.then).toBeDefined();
  });

});
