angular.module('shoppingCart', [])


.factory('ShoppingCart', function() {

  var items={};

  var cart = {
    getItemCount:  function(item) {
      var count=0;
      angular.forEach(items,function(value,key){
        if (!item || key===item){
          count+=value;
        }
      });
      return count;
    },

    hasItems: function(item) {
      return cart.getItemCount(item)>0;
    },

    clear: function() {
      items={};
    },

    addItem: function(code,qty) {
      if (!items[code]){
        items[code]=0;
      }
      items[code]+=qty||1;
    },

    removeItem: function(code,qty) {
      if (items[code]){
        items[code]-=qty||1;
        if (items[code]<=0) {
          delete items[code];
        }
      }
    },

    forEach: function(cb){
      for (var i in items){
        cb({id:i,qty:items[i]});
      }
    }
  };

  return cart;

})

.directive('shoppingCart', function($location, ShoppingCart) {
  var href='';
  return {
    restrict:'E',
    replace:true,
    scope:{},
    template: function(tElement, tAttrs){
      // allow expression placeholder for user defined filters
      var expr = tElement.text().replace(/{{(.*)}}/,'$1');
      var parts = ['getItemCount(item)'].concat(expr.split('|').slice(1));
      expr = parts.join('|');
      return '<a ng-class="{\'cart-items\':!item,\'item-line\':item,\'cart-empty\':!getItemCount(item)}">{{'+expr+'}}</a>';
    },
    link: function(scope, element, attrs) {
      href = attrs.href || href;
      scope.item = attrs.item;
      scope.getItemCount=ShoppingCart.getItemCount;
      element.bind('click', function(event) {
        event.preventDefault();
        if (ShoppingCart.hasItems(scope.item)){
          if (href){
            $location.url(href);
          }
          scope.$emit('shoppingCart.checkout', status);
        }
      });
    }
  };
});
