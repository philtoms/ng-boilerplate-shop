angular.module('ngBoilerplateShop.admin', [])


.filter('admin', function() {

  var adminText = {
    enquiries:'enquiries@dampexpert.com',
    salesphone:'0800 169 1106'
  };

  return function(input) {
    return adminText[input];
  };
});
