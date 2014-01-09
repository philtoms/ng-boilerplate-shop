angular.module( 'ngbps.categories', [
  'ui.router'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'categories', {
    url: '/categories/:category',
    views: {
      "main": {
        controller: 'CategoryCtrl',
        templateUrl: 'categories/category.tpl.html'
      }
    }
  });
})


.controller( 'CategoriesCtrl', function CategoriesController( $scope, Categories ) {
  Categories.queryCategories('level', 1).then(function(categories){
    $scope.categories = categories;
  });
})

.controller( 'CategoryCtrl', function CategoryController( $stateParams, $scope, Categories ) {
  Categories.getCategory('url', $stateParams.category).then(function(category){
    $scope.category = category;
    $scope.app.title = category.title;
  });
})

;
