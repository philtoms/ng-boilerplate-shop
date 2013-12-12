describe( 'shopDB', function() {

  var $httpBackend,shopDB;
  var testData = {
    products:{
      'a':{code:1,type:1},
      'b':{code:2,type:2},
      'c':{code:3,type:2},
      'd':{code:4,type:2}
    },
    categories: {},
    admin:{}
  };

  function count(obj) {
    var c=0;
    for (var v in obj) {c++;}
    return c;
  }

  beforeEach( module( 'jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, _ShopDB_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/shop.json').respond(testData);
    shopDB = _ShopDB_;
  }));

  it('should expose the admin queryable object', function(){
    expect(shopDB.admin).toBeDefined();
    expect(shopDB.admin.then).toBeDefined();
  });

  it('should expose the products queryable object', function(){
    expect(shopDB.products).toBeDefined();
    expect(shopDB.products.where).toBeDefined();
    expect(shopDB.products.then).toBeDefined();
  });

  it('should expose the categories queryable object', function(){
    expect(shopDB.categories).toBeDefined();
    expect(shopDB.categories.where).toBeDefined();
    expect(shopDB.categories.then).toBeDefined();
  });

});
