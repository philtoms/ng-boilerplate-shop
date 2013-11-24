/* 
  Repository Service
  Create snapshot of request db
*/
angular.module('ngbps.jsonRepository',[])

.factory('Repository', function($http, $q) {

  var Query = function (promise) {

    this.get = function(prop){
      return new Query(promise.then(function(data){
        return data[prop];
      }));
    };

    this.where = function(key, value){
      return new Query(promise.then(function(data){
        var matched = [];
        if (angular.isArray(data)){
          angular.forEach(data,function(prop){
            if(prop[key] && prop[key]===value){
              matched.push(prop);
            }
          });
        }
        else if (angular.isObject(data)){
        }
        else {
          matched.push(data);
        }
        return matched;
      }));
    };

    this.select = function(select){
      return new Query(promise.then(function(data){
        var projected=[];
        for(var x in data){
          projected.push(select(data[x]));
        }
        return projected;
      }));
    };

    return angular.extend(this,promise);
  };

  return function(dataName) {
    
    var deferred = $q.defer();
    //map database onto response when promise fulfilled
    var url = 'assets/data/'+dataName+'.json';
    $http.get(url).then(
      function(response) {
        db = angular.fromJson(response.data);
        deferred.resolve(db);
      },
      function(error) {
        deferred.reject('');
      });

    return new Query(deferred.promise);

  };
});
