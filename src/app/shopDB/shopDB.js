angular.module('ngbps.shopDB', [
  'ngbps.shopDB.admin',
  'ngbps.shopDB.categories',
  'ngbps.shopDB.products',
  'ngbps.shopDB.showcase'
])

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
