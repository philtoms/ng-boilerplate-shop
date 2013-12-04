angular.module('ngbps.shopDB')

.factory('Categories', function(ShopDB, $q) {
  
  // project raw categories onto shopDB contract
  var products = ShopDB.products;
  var categories = ShopDB.categories.select(function(c,key){
    c.url = key;
    c.title = c.title || key;
    return c;
  });
  
  function expandCategory(category){
    if (angular.isUndefined(category.products)){
      var subs = [];
      var psubs = [];

      var deferredProducts = $q.defer();
      var deferredSubCategories = $q.defer();

      var subCategories = category.subCategories;

      category.subCategories = deferredSubCategories;
      category.products = deferredProducts;

      var expectedLinks=0;
      var deferredResponse = function (expected){
        if (!subCategories || expected===subCategories.length){
          deferredProducts.resolve(psubs);
          deferredSubCategories.resolve(subs);
        }
      };
      deferredResponse(0);
      
      angular.forEach(subCategories, function(sub){
        var sUrl = spliceRoute(key,sub);
        if (sub.indexOf('.html')>=0){
          products.any('url',sUrl).then( function pushP(val){
            psubs.push(val);
            deferredResponse(++expectedLinks);
          });
        }
        else {
          categories.any(sUrl).then( function pushC(val){
            subs.push(val);
            deferredResponse(++expectedLinks);
          });
        }
      });
    }
    return category;
  }

  var query = {
    queryCategories: categories.where,
    getCategory: function(key, value) {
      if (!value) {
        value=key;
        key='url';
      }
      return categories.any(key, value).then(function(category){
        if (category){
          category.url=key;
          expandCategory(category);
        }
        return category;
      });
    }
  };

  return angular.extend(categories,query);
});
