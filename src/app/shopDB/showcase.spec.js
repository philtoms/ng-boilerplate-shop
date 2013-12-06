describe( 'Showcase', function() {

  var $httpBackend,$timeout,showcase;
  var testData = {
    admin:{
      showcase:{
        interval:5,
        initialInterval:1
      }
    },
    products:{
      p1:{url:'p1.html'},
      p2:{url:'p2.html'}
    },
    showcase:[
      {"title":"T1","text":"t1","link":"p1","imageUrl":"i1.jpg","logo":"h1.png"},
      {"title":"T2","text":"t1","link":"#/another/page.html","btn":"More...","class":"showcase"}
    ]  
  };

  beforeEach( module( 'jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_,_$timeout_, _Showcase_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/shop.json').respond(testData);
    $timeout = _$timeout_;
    showcase = _Showcase_;
  }));

  it('should return the showcase interface', function(){
    var result;
    showcase.then(function(data){
      result=data;
    });
    $httpBackend.flush();
    expect(result.highlights).toBeDefined();
    expect(result.interval).toBeDefined();
  });

  it('should initialize the showcase timer', function(){
    var result;
    showcase.then(function(data){
      result=data;
    });
    $httpBackend.flush();
    expect(result.interval).toBe(1);
  });

  it('should reset the showcase timer after initial interval has expired', function(){
    var result;
    showcase.then(function(data){
      result=data;
    });
    $httpBackend.flush();
    $timeout.flush();
    expect(result.interval).toBe(5);
  });

  it('should provide highlight values as an array', function(){
    var result;
    showcase.then(function(data){
      result=data.highlights;
    });
    $httpBackend.flush();
    expect(result.length).toBe(2);
  });

  it('should map showcase properties onto highlights', function(){
    var result;
    showcase.then(function(data){
      result=data.highlights[1];
    });
    $httpBackend.flush();
    for(var p in result){
      expect(result[p]).toEqual(testData.showcase[1][p]);
    }
  });

  it('should expand showcase product links', function(){
    var result;
    showcase.then(function(data){
      result=data.highlights;
    });
    $httpBackend.flush();
    expect(result[0].link).toBe('#/products/p1.html');
  });

  it('should add showcase class to highlight item', function(){
    var result;
    showcase.then(function(data){
      result=data.highlights[0];
    });
    $httpBackend.flush();
    expect(result.class).toBe('showcase');
  });

});
