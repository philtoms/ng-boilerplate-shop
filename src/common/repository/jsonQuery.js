/* 
  Repository Query Service
  chainable promise API for querying promised JSON data
    get: return a named property as a promise
    where: filter, skip and take promise data as array
    any: filter, skip and take first promise data as object
    select: return promise data as projection
*/
angular.module('jsonQuery',[])

.factory('Query', function($http, $q) {
  var MAX_INT = 9007199254740992;

  var Query = function (promise) {
    return angular.extend(this,promise);
  };

  Query.prototype.promise=null;
  Query.prototype.get = function(prop){
    return new Query(this.then(function(data){
      return data[prop];
    }));
  };

  Query.prototype.where = function(key, value, skip, take){

    take=take || MAX_INT;
    skip=skip || 0;

    return new Query(this.then(function(data){
      var matched=[];
      if (!value && data[key]){
        matched.push(data[key]);
      }
      else {
        if (!value){
          value=key;
          key='id';
        }
        angular.forEach(data,function(prop){
          if (take>0) {
            if (prop[key] && prop[key]===value) {
              if (--skip < 0) {
                take--;
                matched.push(prop);
              }
            }
          }
        });
      }
      return matched;
    }));
  };

  Query.prototype.any = function(key,value,skip) {
    return new Query(this.where(key,value,skip || 0,1).then(function(data){
      return data && data.length? data[0]:null;
    }));
  };

  Query.prototype.select = function(select){
    return new Query(this.then(function(data){
      var projected = [];
      angular.forEach(data, function(val,key){
        var projection = select(val, key);
        if (projection){
          projected.push(projection);
        }
      });
      return projected;
    }));
  };

  return Query;

});
