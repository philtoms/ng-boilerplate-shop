/* 
  Repository Service
  Create snapshot of request db
*/
angular.module('ngbps.jsonRepository',['ngbps.jsonQuery'])

.factory('Repository', function($http, $q, Query) {
  var db={};
  return function(dataName) {
    
    var deferred = $q.defer();
    if (db[dataName]){
      setTimeout(function(){
        deferred.resolve(db[dataName]);
      });
    }
    else {
      //map database onto response when promise fulfilled
      var url = 'assets/data/'+dataName+'.json';
      $http.get(url).then(
        function(response) {
          db[dataName] = angular.fromJson(response.data);
          deferred.resolve(db[dataName]);
        },
        function(error) {
          deferred.reject('');
        });
    }

    return new Query(deferred.promise);

  };
});
