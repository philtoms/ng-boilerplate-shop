angular.module( 'ngbps.shopGateway',[])


.directive('cartItem', ['ShoppingCart', function(cart) {
  return {
    restrict:'EA',
    replace:true,
    templateUrl:'shopGateway/cartItem.tpl.html',
    link:function(scope){
      scope.cart=cart;
    }
  };
}]);

