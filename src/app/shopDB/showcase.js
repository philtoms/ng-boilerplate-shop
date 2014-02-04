angular.module('ngbps.shopDB.showcase', [])

.factory('Showcase', function(ShopDB,Products,$q,$timeout) {

  var showcase = {highlights:[]};
  var promises = [];
  
  return ShopDB.showcase.then(function(data){

    showcase.interval = data.initialInterval || 10000;
    var tid = $timeout(function(){
      showcase.interval=data.interval || 20000;
      $timeout.cancel(tid);
    }, showcase.interval);

    angular.forEach(data.highlights,function(item){
      var highlight = angular.extend({btn:'More information'},item);
      if (highlight.link){
        promises.push(Products.getProduct(highlight.link).then(function(product){
          if (product){
            highlight.link='#/products/'+product.url;
          }
        }));
      }
      if (highlight.class && highlight.class.indexOf('showcase')<0){
        highlight.class +=' showcase';
      }
      else {
        highlight.class='showcase';
      }
      showcase.highlights.push(highlight);
    });

    return $q.all(promises).then(function(result){
      return showcase;
    });
  
  });

})

;

