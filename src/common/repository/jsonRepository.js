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

    this.where = function(key, value, skip, take){

      take=take || 1;
      skip=skip || 0;

      function testClause(data, dkey){
        if (take>0) {
          if ((key==='id' && dkey===value &!data[key]) || (data[key] && data[key]===value)) {
            if (--skip < 0) {
              take--;
              return true;
            }
          }
        }
        return false;
      }

      return new Query(promise.then(function(data){
        var matched;
        if (angular.isArray(data)){
          matched = [];
          angular.forEach(data,function(prop){
            if (testClause(prop)) {
              matched.push(prop);
            }
          });
        }
        else {
          matched = {};
          angular.forEach(data,function(prop,pkey){
            if (testClause(prop,pkey)) {
              matched[pkey] = prop;
            }
          });
        }
        return matched;
      }));
    };

    this.select = function(select){
      return new Query(promise.then(function(data){
        var projected=[];
        for(var key in data){
          projected.push(select(data[key], key));
        }
        return projected;
      }));
    };

    this.any = function(key,value) {
      return new Query(this.where(key,value,0,1).then(function(data){
        return data? angular.isArray(data)? data[0]:data:null;
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
