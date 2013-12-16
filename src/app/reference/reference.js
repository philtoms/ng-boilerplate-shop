angular.module( 'ngbps.reference', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'reference', {
    url: '/reference/*page',
    views: {
      "main": {
        controller: 'ReferenceCtrl',
        template: '<section class="reference" ng-include="page"></section>'
      }
    }
  });
})

.controller( 'ReferenceCtrl', function ReferenceController( $stateParams, $scope) {
  $scope.page='reference/'+$stateParams.page+'.tpl.html';
  $scope.app.title=$stateParams.page;
})


;

