angular.module('ngbps.shopDB', [])

.factory('Showcase', function(ShopDB,Admin,Products,$q,$timeout) {

  var showcase = {highlights:[]};
  var promises = [];
  
  return ShopDB.showcase.then(function(data){

    promises.push(Admin.then(function(admin){
      showcase.interval = admin.showcase? admin.showcase.initialInterval : 10;
      var tid = $timeout(function(){
        showcase.interval=admin.showcase? admin.showcase.interval : 20;
        $timeout.cancel(tid);
      }, showcase.interval);
    }));

    angular.forEach(data,function(item){
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

