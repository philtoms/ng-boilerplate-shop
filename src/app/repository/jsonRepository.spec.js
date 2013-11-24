describe( 'jsonRepository', function() {

  var $httpBackend,repository;
  var testData = {
    products:[
      {id:1},
      {id:2}
    ],
    categories:[
      {id:1},
      {id:2}
    ]
  };

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

  it('filters promise through where clause', function(){
    var data;
    repository('test').get('products').where('id',2).then(function(_data_){
      data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(1);
    expect(data[0]).toBe(testData.products[1]);
  });

  it('projects promise through select clause', function(){
    var data;
    repository('test').get('products')
      .select(function(x){
        return {extra:10};
      })
    .then(function(_data_){
        data=_data_;
    });
    $httpBackend.flush();
    expect(data.length).toBe(2);
    expect(data[0].extra).toBe(10);
  });
});
