angular.module('ngbps.shopDB', [])

.factory('ShopDB', function(Repository) {
    
  var repository = new Repository('shop');

  var shopDB = {
    admin: repository.get('admin'),
    products: repository.get('products'),
    categories: repository.get('categories'),
    showcase: repository.get('showcase')
  };

  return shopDB;
});
