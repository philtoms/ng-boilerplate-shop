angular.module( 'ngbps.shoppingGateway',[])


.directive('cartItem', ['ShoppingCart', function(cart) {
  return {
    restrict:'EA',
    replace:true,
    templateUrl:'shoppingGateway/cartItem.tpl.html',
    link:function(scope){
      scope.cart=cart;
    }
  };
}]);

