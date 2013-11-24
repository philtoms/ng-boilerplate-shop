angular.module('ngbps.admin', [])


.service('AdminDB', ['Repository', function(Repository) {
  var dbPromise = Repository('admin').then(function(data){
    // make promise synchronous
    dbPromise = {then:function(cb){return cb(data)}};
    return data;
  });
  return dbPromise;
}]);

