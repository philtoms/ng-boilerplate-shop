angular.module ('DISQUS', [])


.directive('disqus', ['$window', '$location', function($window, $location) {
  var loaded = {};
  return {
    restrict:'E',
    replace:true,
    template:"<div id='disqus_thread'></div>",
    scope: {
      shortName: '@',
      identifier: '@',
      title: '@',
      source: '@'
    },
    link:function(scope){
      var source = scope.source || 'embed';
      var shortname = scope.shortName;

      // page specific global variables
      /* * * CONFIGURATION VARIABLES: THIS CODE IS ONLY AN EXAMPLE * * */
      $window.disqus_identifier = scope.identifier;
      $window.disqus_title = scope.title;
      $window.disqus_url = $location.href+'/'+scope.identifier;

      if (!loaded[source+scope.identifier]){
        var dsq = $window.document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + shortname + '.disqus.com/'+source+'.js';
        dsq.id = "DISQUS";
        ($window.document.getElementsByTagName('head')[0] || $window.document.getElementsByTagName('body')[0]).appendChild(dsq);
        loaded[source+scope.identifier]=true;
      }
      else {
        $window.DISQUS.reset({
          reload: true,
          config: function () {
              this.page.identifier = scope.identifier;
              this.page.url = $window.disqus_url;
          }
        });
      }
    }
  };
}])


;

