angular.module( 'ngbps.information', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'information', {
    url: '/information/*page',
    views: {
      "main": {
        controller: 'InformationCtrl',
        template: '<section class="information" ng-include="page"></section>'
      }
    }
  });
})

.controller( 'InformationCtrl', function InformationController( $stateParams, $scope) {
  $scope.page='information/'+$stateParams.page+'.tpl.html';
  $scope.app.title=$stateParams.page;
})


;

