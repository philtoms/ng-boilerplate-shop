angular.module( 'ngbps.shopGateway.checkout', [
  'ui.router'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'checkout', {
    url: '/checkout',
    views: {
      "main": {
        controller: 'CheckoutCtrl',
        templateUrl: 'shopGateway/checkout.tpl.html'
      }
    }
  });
})


.controller( 'CheckoutCtrl', function CheckoutController( $scope, $window, Checkout, ShoppingCart, Products, worldPayGateway) {
  
  $scope.cart = ShoppingCart;

  $scope.$watch(Checkout.getItemCount, function(count, lastCount){

    if (!count){
      $scope.continueShopping();
      return;
    }

    Checkout.runItems(function(itemId){
      return Products.getProduct(itemId).then(function(product){
        return {
          id:itemId,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price
        };
      });
    })
    .then(function(checkoutSlip){
      $scope.checkout=checkoutSlip;
    });
  });

  $scope.continueShopping = function(){
    $window.history.back();
  };

  $scope.payNow = function(){
    $scope.gatewayOpen=true;
    worldPayGateway.pay($scope.checkout);
  };
})

;
