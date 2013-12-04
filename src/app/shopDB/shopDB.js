angular.module('ngbps.shopDB', [])

.factory('ShopDB', function(Repository) {
    
  var repository = new Repository('shop');


  function spliceRoute(key,value){
    while (value.indexOf('../')===0){
      value=value.substr(3);
      var parts = key.split('/');
      parts.splice(-1);
      key = parts.join('/');
    }
    return key? key+'/'+value:value;
  }

  var shopDB = {
    admin: repository.get('admin'),
    products: repository.get('products'),
    categories: repository.get('categories'),
    showcase: repository.get('showcase')
  };

  return shopDB;
});
