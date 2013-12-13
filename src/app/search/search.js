angular.module('ngbps.search',[
  'utilities',
  'ui.router'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'search', {
    url: '/search/results',
    views: {
      "search": {
        controller: 'SearchCtrl',
        templateUrl: 'search/search.tpl.html'
      }
    }
  });
})

.controller( 'SearchCtrl', function SearchController( $scope, Search ) {
  $scope.search=Search;
})

.provider('Search', function(){

  this.displaced=true; // default - displaced results do not appear in typeahead dropdown
  this.minimumQueryLength = 3; 

  config = this;

  this.$get = function(Products, Admin, $http, $timeout, safeApply){

    function contains(item, prop, test){
      if (item[prop] && test.length>=config.minimumQueryLength) {
        var text = item[prop].toLowerCase();
        var idx = text.indexOf(test);
        var result = idx>=0 && (idx===0 || text[idx-1]===' ');
        return result;
      }
      return false;
    }

    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    function highlight(matchItem, query) {
      return query && matchItem? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    }

    function reset (forceReset) {
      $timeout(function() {
        if (!gse_selected || forceReset) {
          service.selected='';
          service.query='';
          service.results = [];
          gse_selected=false;
        }
      },250);
    }

    function filter(input) {
      var test = input.toLowerCase();
      var props=['title','text'];
      service.query = input;
      service.results=[];
      Products.select(function(item){
        for (var p=0; p<props.length; p++){
          if (contains(item,props[p], test)){
            service.results.push(item);
            break;
          }
        }
      });
      return config.displaced? []:service.results;
    }

    var
      gse_selected=false;

    function gseSearch(){
      gse_selected=true;
      Admin.then(function(admin){
        var url = 'https://www.googleapis.com/customsearch/v1?key='+admin.search.gseApiKey+'&cx='+admin.search.gseCx+'&callback=JSON_CALLBACK&q='+service.query;
        $http.jsonp(url).then(function(response){
          if (response.data.items){
            var gseResults=[];
            for (var i = 0; i < (response.data.items).length; i++) {
              var item = response.data.items[i];
              // in production code, item.htmlTitle should have the HTML entities escaped.
              gseResults.push({
                href:item.link,
                title:item.htmlTitle,
                text:item.htmlSnippet
              });
            }
            service.results = gseResults.concat(service.results);
            safeApply();
          }
        });
      });
    }

    var service = {
      selected: '',
      results: [],
      reset:reset,
      filter: filter,
      more: gseSearch
    };

    return service;
  };
 
});
