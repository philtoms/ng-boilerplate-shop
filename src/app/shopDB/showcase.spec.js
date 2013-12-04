describe( 'Showcase', function() {

  var $httpBackend,showcase;
  var testData = {
    showcase:[
    {"title":"Enjoy all the benefits of living in a well insulated cosy home","text":"","link":"#/products/ultrotherm","imageUrl":"img/featured/ultrotherm-a1.jpg","class":"ultrotherm-a1","logo":"img/logos/ultrotherm.png"},
    {"title":"","text":"Dampexpert offer a competative installation service on all our ventilation systems","link":"DX-80HRV","imageUrl":"img/featured/hrv-a1.jpg","class":"hrv-a1"},
    {"title":"Passive Ventilation","text":"Let the fresh air into your home","link":"SD-UAB","imageUrl":"img/featured/ultrovent-a1.jpg","class":"ultrovent-a1","logo":"img/logos/ultrovent.png"},
    {"title":"","text":"Save £££s on your annual fuel bills by insulating your home with NEW Ultrotherm slimline insulation","link":"#/products/ultrotherm","imageUrl":"img/featured/ultrotherm-a2.jpg","class":"ultrotherm-a2","btn":"See more"},
    {"title":"Independent surveys","text":"","link":"#/services/independent-surveys.html","imageUrl":"img/featured/survey-a1.jpg","class":"survey-a1"},
    {"title":"For that perfect finish every time","text":"See our range of decorating sundries","link":"#/products/everbuild","imageUrl":"img/featured/everbuild-a1.jpg","class":"everbuild-a1","logo":"img/logos/everbuild.png"}
    ]  
  };


  beforeEach( module( 'ngbps.jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, _Showcase_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/shop.json').respond(testData);
    showcase = _Showcase_;
  }));


  it('should provide showCase values as an object', function(){
    var result;
    showcase.then(function(data){
      result=data;
    });
    $httpBackend.flush();
    expect(result.length).toBe(6);
  });

});
