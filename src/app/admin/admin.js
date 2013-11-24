angular.module('ngbps.admin', [])

.service('AdminDB', function(Repository) {
  return new Repository('admin');
})

;

