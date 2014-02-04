angular.module( 'ngbps.shopGateway.cartItem', [])

.filter('itemCheckmark', function() {
  return function(input) {
    return input ? '\u2713' + input: '';
  };
})


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

