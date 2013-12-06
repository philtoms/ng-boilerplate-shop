angular.module('ngbps.shopDB')

.factory('Categories', function(ShopDB, $q) {
  
  // project raw categories onto shopDB contract
  var products = ShopDB.products;
  var categories = ShopDB.categories.select(function(c,key){
    c.id = key;
    c.title = c.title || key;
    return c;
  });
  
  function expandCategory(category,subs,psubs,promises){

    angular.forEach(category.subCategories, function(sub){
      promises.push(categories.any(sub).then( function (val){
        if (val){
          subs.push(val);
        }
      }));
    });
    
    angular.forEach(category.products, function(sub){
      promises.push(products.any(sub).then( function (val){
        if (val){
          psubs.push(val);
        }
      }));
    });
    category.expanded=true;
    return category;
  }

  var query = {
    queryCategories: categories.where,
    getCategory: function(key, value) {
      return categories.any(key, value).then(function(category){
        if (category && !category.expanded){
          var subs = [];
          var psubs = [];
          var promises = [];
          expandCategory(category,subs,psubs,promises);

          return $q.all(promises).then(function(){
            category.subCategories=subs;
            category.products=psubs;
            return category;
          });          
        }
        return category;
      });
    }
  };

  return angular.extend(categories,query);
});
