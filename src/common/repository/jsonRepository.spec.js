describe( 'jsonRepository', function() {

  var $rootScope, $httpBackend,repository;
  var testData = {
    products:{
      'a':{code:1,type:1},
      'b':{code:2,type:2},
      'c':{code:3,type:2},
      'd':{code:4,type:2}
    },
    categories:[
      {id:1},
      {id:2}
    ]
  };

  function count(obj) {
    var c=0;
    for (var v in obj) {c++;}
    return c;
  }

  beforeEach( module( 'jsonRepository'));

  beforeEach( inject(function(_$rootScope_,_$httpBackend_, _Repository_){
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/test.json').respond(testData);
    $httpBackend.whenGET('assets/data/badRequest.json').respond(500,'Server error');
    repository = _Repository_;
  }));

  it('resolves a name and returns a promise', function(){
    expect(repository('test').then).toBeDefined();
  });

  it('fulfills a promise of a dataset', function(){
    var data;
    repository('test').then(function(_data_){
      data = _data_;
    });
    $httpBackend.flush();
    expect(data).toBe(testData);
  });

  it('caches dataset requests locally', function(){
    var data, cachedData;
    repository('test').then(function(_data_){
      data = _data_;
    });
    $httpBackend.flush();
    expect(data).toBe(testData);

    // now request from cache
    repository('test').then(function(_data_){
      cachedData = _data_;
    });
    waitsFor(function(){
      $rootScope.$apply();
      return cachedData!=null; 
    });
    runs(function(){
      expect(cachedData).toBe(testData);
    });
  });

  it('captures a bad request', function(){
    var success = jasmine.createSpy('success');
    var error = jasmine.createSpy('error');

    repository('badRequest').then(success,error);
    $httpBackend.flush();

    expect(error).toHaveBeenCalled();
  });

  it('returns promised data through get clause', function(){
    var data;
    repository('test').get('products').then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data).toBe(testData.products);
  });

  it('returns indexed object through where clause', function(){
    var data;
    repository('test').get('products').where('b').then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data[0]).toBe(testData.products.b);
  });

  it('returns filtered array through where clause', function(){
    var data;
    repository('test').get('products').where('type',2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(3);
    expect(data[0]).toBe(testData.products.b);
    expect(data[1]).toBe(testData.products.c);
    expect(data[2]).toBe(testData.products.d);
  });

  it('returns empty array through unmatched where clause', function(){
    var data;
    repository('test').get('products').where('type',99).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(0);
  });

  it('skips and takes filtered data subsets', function(){
    var data;
    // skip 1, take 2
    repository('test').get('products').where('type',2,1,2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(2);
    expect(data[0]).toBe(testData.products.c);
    expect(data[1]).toBe(testData.products.d);
  });

  it('takes all available data', function(){
    var data;
    // skip 0, take 2
    repository('test').get('products').where('type',1,0,2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(1);
    expect(data[0]).toBe(testData.products.a);
  });

  it('returns single object through any clause', function(){
    var data;
    repository('test').get('products').any('type',2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data).toEqual(testData.products.b);
  });

  it('returns null through any clause', function(){
    var data;
    repository('test').get('products').any('type',999).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data).toBeNull();
  });

  it('projects promised data through select clause', function(){
    var data;
    repository('test').get('products')
      .select(function(x,key){
        return {extra:10,code:key};
      })
    .then(function(_data_){
        data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(4);
    expect(data[0].extra).toBe(10);
    expect(data[0].code).toBe('a');
  });
});
