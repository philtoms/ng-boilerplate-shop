angular.module('ngbps.shopDB')

.factory('Categories', function(ShopDB, $q) {
  
  // project raw categories onto shopDB contract
  var products = ShopDB.products;
  var categories = ShopDB.categories.select(function(c,key){
    c.id = key;
    c.title = c.title || key;
    return c;
  });
  
  function expandCategory(category){
    if (!category.expanded){
      var subs = [];
      var psubs = [];

      var deferredProducts = $q.defer();
      var deferredSubCategories = $q.defer();

      var subCategories = category.subCategories;
      var subProducts = category.products;

      category.subCategories = deferredSubCategories.promise;
      category.products = deferredProducts.promise;

      var processedLinks = 0;
      var expectedLinks=(subCategories && subCategories.length) +
                        (subProducts && subProducts.length);

      var deferredResponse = function (linkCount){
        if (linkCount === expectedLinks){
          deferredProducts.resolve(psubs);
          deferredSubCategories.resolve(subs);
        }
      };
      deferredResponse(0);
      
      angular.forEach(subCategories, function(sub){
        categories.any(sub).then( function (val){
          if (val){
            subs.push(val);
          }
          deferredResponse(++processedLinks);
        });
      });
      
      angular.forEach(subProducts, function(sub){
        products.any(sub).then( function (val){
          if (val){
            psubs.push(val);
          }
          deferredResponse(++processedLinks);
        });
      });
    }
    category.expanded=true;
    return category;
  }

  var query = {
    queryCategories: categories.where,
    getCategory: function(key, value) {
      return categories.any(key, value).then(function(category){
        if (category){
          expandCategory(category);
        }
        return category;
      });
    }
  };

  return angular.extend(categories,query);
});
