angular.module('ngbps.productDB')

.factory('Products', function(ProductDB) {
  
  // project raw products and categories onto productDB contract
  var sequence=0;
  var products = ProductDB.products.select(function(p,key){
    p.sequence = ++sequence;
    p.code=key;
    return p;
  });
  
  var query = {
    queryProducts: products.where,
    getProduct: function(key,value) {
      if (!value){
        value=key;
        key='url';
      }
      return products.any(key,value).select(function(product,key) {
        // only convert once
        if (angular.isUndefined(product.range)){
          var links={};
          angular.forEach(product.links, function(link){
            var lkey='Accessories';
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
            angular.forEach(lvalues, function (lvalue){
              products.any('url',lvalue).then(function(plink){
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
              });
            });
          });
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
    }
  };

  return angular.extend(products,query);
});
