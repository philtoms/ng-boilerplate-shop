angular.module('ngbps.shopDB')

.factory('Products', function(ShopDB, $q) {
  
  // project raw products onto shopDB contract
  var products = ShopDB.products.select(function(p,key){
    p.code=key;
    return p;
  });
  
  function expandProduct(product){
    // only convert once
    if (angular.isUndefined(product.links.then)){

      var deferredLinks = $q.defer();
      var deferredResponse = $q.defer();

      var linkArray = product.links;
      product.links=deferredLinks.promise;

      deferredResponse.promise.then(function(data){
        var plinks=[];
        angular.forEach(data,function(v,k){
          plinks.push({
            type:v[0].type||'template',
            title:k,
            links:v
          });
        });
        deferredLinks.resolve(plinks);
      });
      
      var links={};
      if (linkArray.length==0){
        deferredResponse.resolve(links);
      }

      angular.forEach(linkArray, function(link){

        var lkey='Accessories';
        var lvalues=[link];

        // work out what kind of link this is. One of:
        //  
        //  'template' - object {name: template || url}
        //  'product' - string (product url)
        //  'link' - object {name: [link...]}
        //
        // also, the link can be in kv object form where
        //  k = link group name
        //  v = one of the above, or
        //      an array of one of the above
        //
        if (angular.isObject(link)){
          for (var k in link){
            lvalues=angular.isArray(link[k])? link[k]:[link[k]];
            lkey=k;
          }
        }

        if (!links[lkey]) {
          links[lkey]=[];
        }

        var expectedLinks=0;
        angular.forEach(lvalues, function (lvalue){
          products.any('code',lvalue).then(function(plink){
            expectedLinks++;
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
            if (expectedLinks===lvalues.length) {
              deferredResponse.resolve(links);
            }
          });
        });
      });
    }
    return product;
  }

  var query = {
    queryProducts: products.where,
    getProduct: function(key,value) {
      if (!value){
        value=key;
        key='url';
      }
      return products.any(key,value).then(expandProduct);
    }
  };

  return angular.extend(products,query);
});
