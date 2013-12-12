angular.module('shoppingCart')

.provider('shoppingCart.config', function() {

  var defaultGateway = {
    pay:function(items){
      $emit('checkout.payNow',items);
    }
  };
  
  var _config = {
    gateway:defaultGateway,
    gatewayProvider:null,
    freeShipping:0,
    shipping:0,
    tax:0, // ha
    taxSuffix:['exc. tax','inc. tax']
  };

  this.set = function(config) {
    _config = angular.extend(_config,config);
    return this;
  };

  this.$get = function($log) {
    return _config;
  };
});
