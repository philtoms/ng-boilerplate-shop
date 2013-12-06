describe( 'Products', function() {

  var $httpBackend,products,testData;

  beforeEach( module( 'jsonRepository', 'ngbps.shopDB'));

  beforeEach( inject(function(_$httpBackend_, Products){
    testData = {
      products:{
        'a':{type:1, links:[]},
        'b':{type:2, links:['a','c']},
        'c':{type:2, links:[{'Group A':['a','b']},{'Group B':['d','e']}]},
        'd':{type:3, links:[{'Template':'template.html'}]},
        'e':{type:3, links:['a',{'Template':'template.html'}]},
        'f':{type:4, links:[{'Links':[{'l1':'http://l1.html'},{'l2':'l2.html'}]}]}
      }
    };

    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET('assets/data/shop.json').respond(testData);
    products = Products;
  }));

  it('should expose the products queryable interface', function(){
    expect(products.getProduct).toBeDefined();
    expect(products.queryProducts).toBeDefined();
  });

  it('should return all products', function(){
    var all;
    products.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    expect(all.length).toBe(6);
  });

  it('should codify all products', function(){
    var all;
    products.then(function(data){
      all=data;
    });
    $httpBackend.flush();
    var i=0;
    for(var p in all){
      expect(all[p].id).toBe('abcdef'.charAt(i++));
    }
  });

  it('should return a filtered array', function(){
    var filteredProducts;
    products.queryProducts('type',3).then(function(data){
      filteredProducts=data;
    });
    $httpBackend.flush();
    expect(filteredProducts.length).toBe(2);
    expect(filteredProducts[0]).toEqual(testData.products.d);
  });

  it('should return a single expanded product', function(){
    var product;
    products.getProduct('a').then(function(data){
      product=data;
    });
    $httpBackend.flush();
    expect(product).toEqual(testData.products.a);
  });

  it('should return null for invalue property value', function(){
    var product;
    products.getProduct('x').then(function(data){
      product=data;
    });
    $httpBackend.flush();
    expect(product).toBeNull();
  });

  it('should expand empty links to empty links array', function(){
    var done;
    products.getProduct('a').then(function(product){
      product.links.then(function(data){
        expect(data.length).toBe(0);
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should expand product links to full products', function(){
    var done;
    products.getProduct('b').then(function(product){
      product.links.then(function(data){
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('product');
        expect(data[0].title).toBe('Accessories');
        expect(data[0].links.length).toBe(2);
        expect(data[0].links[0]).toEqual(testData.products.a);
        expect(data[0].links[1]).toEqual(testData.products.c);
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should group named links under name', function(){
    var done;
    products.getProduct('c').then(function(product){
      product.links.then(function(data){
        expect(data.length).toBe(2);
        expect(data[0].type).toBe('product');
        expect(data[0].title).toBe('Group A');
        expect(data[0].links.length).toBe(2);
        expect(data[0].links[0]).toEqual(testData.products.a);
        expect(data[0].links[1]).toEqual(testData.products.b);
        expect(data[1].type).toBe('product');
        expect(data[1].title).toBe('Group B');
        expect(data[1].links.length).toBe(2);
        expect(data[1].links[0]).toEqual(testData.products.d);
        expect(data[1].links[1]).toEqual(testData.products.e);
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should expand links to templates', function(){
    var done;
    products.getProduct('d').then(function(product){
      product.links.then(function(data){
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('template');
        expect(data[0].title).toBe('Template');
        expect(data[0].links.length).toBe(1);
        expect(data[0].links[0]).toEqual("template.html");
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should group links by type', function(){
    var done;
    products.getProduct('e').then(function(product){
      product.links.then(function(data){
        expect(data.length).toBe(2);
        expect(data[0].type).toBe('product');
        expect(data[0].title).toBe('Accessories');
        expect(data[0].links.length).toBe(1);
        expect(data[0].links[0]).toEqual(testData.products.a);
        expect(data[1].type).toBe('template');
        expect(data[1].title).toBe('Template');
        expect(data[1].links.length).toBe(1);
        expect(data[1].links[0]).toEqual('template.html');
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should expand external links to external urls with targets', function(){
    var done;
    products.getProduct('f').then(function(product){
      product.links.then(function(data){
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('link');
        expect(data[0].title).toBe('Links');
        expect(data[0].links.length).toBe(2);
        expect(data[0].links[0].href).toEqual('http://l1.html');
        expect(data[0].links[0].title).toEqual('l1');
        expect(data[0].links[0].target).toEqual('_blank');
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });

  it('should expand internal links with no targets', function(){
    var done;
    products.getProduct('f').then(function(product){
      product.links.then(function(data){
        expect(data.length).toBe(1);
        expect(data[0].type).toBe('link');
        expect(data[0].title).toBe('Links');
        expect(data[0].links.length).toBe(2);
        expect(data[0].links[1].href).toEqual('l2.html');
        expect(data[0].links[1].title).toEqual('l2');
        expect(data[0].links[1].target).toEqual('');
        done=true;
      });
    });
    $httpBackend.flush();
    waitsFor(function(){
      return done;
    });
  });


});
