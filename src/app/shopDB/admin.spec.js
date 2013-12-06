describe( 'Admin', function() {

  var $httpBackend,admin;
  var testData = {
    admin:{
      telNo:"0800 123 456"
    }
  };


  beforeEach( module( 'jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, _Admin_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/shop.json').respond(testData);
    admin = _Admin_;
  }));


  it('should provide admin values as an object', function(){
    var result;
    admin.then(function(data){
      result=data;
    });
    $httpBackend.flush();
    expect(result.telNo).toBe(testData.admin.telNo);
  });

});
