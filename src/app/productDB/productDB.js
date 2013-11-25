angular.module('ngbps.productDB', [])

.factory('ProductDB', function(Repository) {
    
  var repository = new Repository('products');


  function spliceRoute(key,value){
    while (value.indexOf('../')===0){
      value=value.substr(3);
      var parts = key.split('/');
      parts.splice(-1);
      key = parts.join('/');
    }
    return key? key+'/'+value:value;
  }

  var productDB = {
    products: repository.get('products'),
    categories: repository.get('categories')
  };

  return productDB;
});
