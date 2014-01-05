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
  var suffix = $stateParams.page.indexOf('/')>=0? '.ltpl.html':'.tpl.html';
  $scope.page='reference/'+$stateParams.page+suffix;
  $scope.app.title=$stateParams.page;
})


;

