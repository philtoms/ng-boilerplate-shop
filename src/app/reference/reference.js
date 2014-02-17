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

.controller( 'ReferenceCtrl', function ReferenceController( $stateParams, $scope, $templateCache) {
  var pageUrl = 'reference/'+$stateParams.page+'.tpl.html';
  if (!$templateCache.get(pageUrl)) {
    pageUrl = 'reference/'+$stateParams.page+'.html';
  }
  $scope.page=pageUrl;
  $scope.app.title=$stateParams.page;
})


;

