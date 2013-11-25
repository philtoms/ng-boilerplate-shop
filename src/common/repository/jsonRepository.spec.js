describe( 'jsonRepository', function() {

  var $httpBackend,repository;
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
    ],
    admin:{tel:'0800 123 456'}
  };

  function count(obj) {
    var c=0;
    for (var v in obj) {c++;}
    return c;
  }

  beforeEach( module( 'ngbps.jsonRepository'));

  beforeEach( inject(function(_$httpBackend_, _Repository_){
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/test.json').respond(testData);
    $httpBackend.whenGET('assets/data/badRequest.json').respond(500,'Server error');
    repository = _Repository_;
  }));

  it('resolves a name and returns a promise', function(){
    expect(repository('test').then).toBeDefined();
  });

  it('resolves a promise', function(){
    var data;
    repository('test').then(function(_data_){
      data = _data_;
    });
    $httpBackend.flush();
    expect(data).toBe(testData);
  });

  it('captures a bad request', function(){
    var success = jasmine.createSpy('success');
    var error = jasmine.createSpy('error');

    repository('badRequest').then(success,error);
    $httpBackend.flush();

    expect(error).toHaveBeenCalled();
  });

  it('returns promise through get clause', function(){
    var data;
    repository('test').get('products').then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data).toBe(testData.products);
  });

  it('returns filtered object through where clause', function(){
    var data;
    repository('test').get('products').where('id','b').then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.b).toBe(testData.products.b);
  });

  it('returns filtered array through where clause', function(){
    var data;
    repository('test').get('categories').where('id',2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(1);
    expect(data[0]).toBe(testData.categories[1]);
  });

  it('filters promise through where clause with skip and take', function(){
    var data;
    // skip 1, take 2
    repository('test').get('products').where('type',2,1,2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(count(data)).toBe(2);
    expect(data.c).toBeDefined();
    expect(data.d).toBeDefined();
  });

  it('takes available data', function(){
    var data;
    // skip 0, take 2
    repository('test').get('products').where('type',1,0,2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(count(data)).toBe(1);
    expect(data.a).toBeDefined();
  });

  it('filters promise through any clause', function(){
    var data;
    repository('test').get('products').any('type',2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.b).toBe(testData.products.b);
  });

  it('projects promise through select clause', function(){
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
