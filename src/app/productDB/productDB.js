angular.module('ngbps.productDB', [])

.factory('ProductDB', function(Repository) {
    
  var productDB = new Repository('products');

  // project raw products and categories onto productDB contract
  var sequence=0;
  var products = productDB.get('products').select(function(p,ikey){
    p.sequence = ++sequence;
    p.code=key;
  });

  var categories = productDB.get('categories').select(function(c,key){
    c.url = key;
    c.title = c.title || key;
  });

  function spliceRoute(key,value){
    while (value.indexOf('../')===0){
      value=value.substr(3);
      var parts = key.split('/');
      parts.splice(-1);
      key = parts.join('/');
    }
    return key? key+'/'+value:value;
  }

  return {
    getProduct: function(key,value) {
      if (!value){
        value=key;
        key='url';
      }
      return products.any(key,value).select(function(product,key) {
        // only convert once
        if (angular.isUndefined(product.range)){
          var links={};
          for (var i=0; i < product.links.length; i++) {
            var lkey='Accessories';
            var link = product.links[i];
            var lvalues=[link];
            // work out what kind of link this is. One of:
            //  
            //  'template' - a template || url
            //  'product' - a product from this db
            //  'list' - an array of:
            //    'products'
            //    'links' - kv objects
            // Also, the link can be in kv object form where
            //  k = link group
            //  v = one of the above 
            if (angular.isObject(link)){
              for (var k in link){
                lvalues=angular.isArray(link[k])? link[k]:[link[k]];
                lkey=k;
              }
            }
            if (!links[lkey]) {
              links[lkey]=[];
            }
            for (var lv in lvalues){ // lvalue must be homogeonous
              var lvalue = lvalues[lv];
              var plink = Repository.findAny(db.products,'url',lvalue);
              var ltype = plink? "product" : angular.isObject(lvalue) ? "link":"template";
              if (ltype==='link'){
                var lvo = {};
                for (var vk in lvalue){
                  lvo.href = lvalue[vk];
                  lvo.title=vk;
                }
                lvalue=lvo;
              }
              links[lkey].push(lvalue = plink || lvalue);
              // store the types on objects only
              if (ltype!='template'){
                lvalue.type=ltype;
              }
            }
          }
          product.links=[];
          product.range=null;
          angular.forEach(links,function(v,k){
            if (k==="Products"){
              product.range=v;
            } 
            else {
              product.links.push({
                type:v[0].type||'template',
                title:k,
                links:v
              });
            }
          });
        }
        return product;
      });
    },
    queryProducts: function(key,value, cb) {
      return dbPromise.then(function(db) {
        var products = key?
          Repository.find(db.products, key, value, cb)
          : db.products;
        return products;
      });
    },
    queryCategories: function(key,value, cb) {
      return dbPromise.then(function(db){
        return Repository.find(db.categories, key, value, cb);
      });
    },
    getCategory: function(key) {
      return dbPromise.then(function(db) {
        return Repository.findAny(db.categories,key, function(category) {
          if (angular.isUndefined(category.products)){
            var subs = [];
            var products = [];
            for (var i=0; i<category.subCategories.length;i++) {
              var sub = category.subCategories[i];
              var sUrl = spliceRoute(key,sub);
              if (sub.indexOf('.html')>=0){
                products.push(Repository.findAny(db.products,'url',sUrl));
              }
              else {
                sub = Repository.findAny(db.categories,sUrl);
                subs.push(sub);
              }
            }
            category.url=key;
            category.subCategories=subs;
            category.products=products;
          }
          return category;
        });
      });
    }
  };
});
