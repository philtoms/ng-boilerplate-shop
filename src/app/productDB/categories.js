angular.module('ngbps.productDB')

.factory('Categories', function(ProductDB) {
  
  // project raw products and categories onto productDB contract
  var products = ProductDB.products;
  var categories = ProductDB.categories.select(function(c,key){
    c.url = key;
    c.title = c.title || key;
    return c;
  });
  
  var query = {
    queryCategories: categories.where,
    getCategory: function(key) {
      var subs = [];
      var psubs = [];
      return categories.any(key).select(function(category){
          if (angular.isUndefined(category.products)){
            angular.forEach(category.subCategories, function(sub){
              var sUrl = spliceRoute(key,sub);
              if (sub.indexOf('.html')>=0){
                products.any('url',sUrl).then( function pushP(val){
                  psubs.push(val);
                });
              }
              else {
                categories.any(sUrl).then( function pushC(val){
                  subs.push(val);
                });
              }
            });
            category.url=key;
            category.subCategories=subs;
            category.products=psubs;
          }
          return category;
      });
    }
  };

  return angular.extend(categories,query);
});
