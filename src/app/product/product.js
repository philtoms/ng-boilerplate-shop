angular.module( 'ngbps.product', [
  'ui.router'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'product', {
    url: '/product',
    views: {
      "main": {
        controller: 'ProductCtrl',
        templateUrl: 'product/product.tpl.html'
      }
    }
  });
})


.controller( 'ProductCtrl', function ProductController( $scope, Products ) {
  $scope.product = Products.any();
})


.directive('featureLink', ['$compile', function($compile){
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      var expression = attrs.ngRepeat,
          match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
          feature = scope[match[1]];

      // text feature:"string"
      // link feature:{link:"popover",placement:"right",popover:"msg",text:"text"}
      // link feature:{link:"tooltip",placement:"above",tooltip:"msg",text:"text"}
      if (angular.isObject(feature)) {
        var featureLink, linkText = feature.text.match(/{{(.+)}}/)[1]; 
        var placement = feature.placement || 'top';
        if (feature.link=='popover'){
          featureLink = '<a popover-placement="'+placement+'" popover="'+feature.popover+'">'+linkText+'</a>';
        }
        if (feature.link=='tooltip'){
          featureLink = '<a tooltip-placement="'+placement+'" tooltip="'+feature.tooltip+'" tooltip-trigger="click">'+linkText+'</a>';
        }
        feature = angular.element('<span>'+feature.text.replace(/{{.+}}/,featureLink)+'</span>');
        $compile(feature)(scope);
      }
      element.append(feature);
    }
  };
}])

;
