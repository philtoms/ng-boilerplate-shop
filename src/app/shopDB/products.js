angular.module('ngbps.shopDB.products', [])

.factory('Products', function(ShopDB, $q) {
  
  // project raw products onto shopDB contract
  var products = ShopDB.products.select(function(val,key){
   val.id = key;
    if (!val.title){
      val.title = key;
    }
    if (!val.url){
      val.url=val.title.replace(/ /g,'-').toLowerCase();
    }
    return val;
  });
  
  function expandProduct(product, links, promises){

    angular.forEach(product.links, function(link){

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

      angular.forEach(lvalues, function (lvalue){
        promises.push(products.any(lvalue).then(function(plink){

          var ltype = plink? "product" : angular.isObject(lvalue) ? "link":"template";
          if (ltype==='link'){
            var lvo = {};
            for (var vk in lvalue){
              lvo.href = lvalue[vk];
              lvo.title=vk;
              lvo.target=lvo.href.indexOf('http:')<0? '':'_blank';
            }
            lvalue=lvo;
          }

          links[lkey].push(lvalue = plink || lvalue);

          // store the types on objects only
          if (ltype!='template'){
            lvalue.type=ltype;
          }

        }));
      });
    });
    product.expanded=true;
    return product;
  }

  var query = {
    queryProducts: products.where,
    getProduct: function(key,value) {
      return products.any(key,value).then(function(product){
        if (product && !product.expanded){

          var links = {};
          var promises = [];
          expandProduct(product,links,promises);

          return $q.all(promises).then(function(){
            product.links=[];
            angular.forEach(links,function(v,k){
              product.links.push({
                type:v[0].type||'template',
                title:k,
                links:v
              });
            });
            return product;
          });          
        }
        return product;
      });
    }
  };

  return angular.extend(products,query);
});
