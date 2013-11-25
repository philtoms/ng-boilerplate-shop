/* 
  Repository Service
  Create snapshot of request db
*/
angular.module('ngbps.jsonRepository',[])

.factory('Repository', function($http, $q) {
  var MAX_INT = 9007199254740992;
  var db={};
  var Query = function (promise) {

    this.get = function(prop){
      return new Query(promise.then(function(data){
        return data[prop];
      }));
    };

    this.where = function(key, value, skip, take){

      take=take || MAX_INT;
      skip=skip || 0;

      function testClause(data, dkey){
        if (take>0) {
          if (data[key] && data[key]===value) {
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
          if (!value && data[key]){
            return matched[key]=data[key];
          }
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
        var isArray=angular.isArray(data),
          projected = isArray? []:{};
        
        for(var key in data){
          var projection = select(data[key], key);
          if (isArray){
            projected.push(projection);
          }
          else {
            projected[key]=projection;
          }
        }
        return projected;
      }));
    };

    this.any = function(key,value) {
      return new Query(this.where(key,value,0,1).then(function(data){
        var value = null;
        if (data){
          if (angular.isObject(data)){
            for(var key in data){
              value=data[key];
            }
          }
          else {
            value = data[0];
          }
        }
        return value;
      }));
    };

    return angular.extend(this,promise);
  };

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
