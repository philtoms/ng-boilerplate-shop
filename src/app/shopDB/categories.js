angular.module('ngbps.shopDB.categories', [])

.factory('Categories', function(ShopDB, Products, $q) {
  
  var products = Products;
  var categories = ShopDB.categories.select(function(val,key){
    val.id = key;
    if (!val.title){
      val.title = key;
    }
    if (!val.url){
      val.url=val.title.replace(/ /g,'-').toLowerCase();
    }
    return val;
  });
  
  function expandCategory(category){

    var subs = [];
    var psubs = [];
    var promises = [];

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
          if (!val.url){
            val.url=val.title.replace(/ /g,'-').toLowerCase();
          }
          psubs.push(val);
        }
      }));
    });
    category.expanded=true;

    return $q.all(promises).then(function(){
      category.subCategories=subs;
      category.products=psubs;
      return category;
    });          
  }

  var query = {
    queryCategories: categories.where,
    getCategory: function(key, value) {
      return categories.any(key, value).then(function(category){
        if (category && !category.expanded){
          return expandCategory(category);
        }
        return category;
      });
    },
    getProductByCategory: function(categoryUrl, productUrl) {
      
      productUrl = productUrl.toLowerCase();
      categoryUrl = categoryUrl.toLowerCase();

      return this.getCategory('url',categoryUrl).then(function(category){
        if (category){
          for (var p in category.products) {
            var product = category.products[p];
            if (product.url===productUrl){
              return Products.getProduct('url',productUrl);
            }
          }
        }
        return null;
      });
    }
  };

  return angular.extend(categories,query);
});
