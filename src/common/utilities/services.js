angular.module('utilities.services',[])

.factory('safeApply', ['$rootScope', function($rootScope) {
  return function($scope, fn) {
    var root = $scope && $scope.$root || $rootScope;
    var scope = $scope || $rootScope;
    var phase = root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if (fn) {
        scope.$eval(fn);
      }
    } else {
      if (fn) {
        scope.$apply(fn);
      } else {
        scope.$apply();
      }
    }
  };
}]);
