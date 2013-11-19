# An example of data fixtures written in CoffeeScript
angular.module( 'ngBoilerplate.about' ).run( ( $httpBackend ) ->
  $httpBackend.when( 'POST', '/login' ).respond( () ->
    [204, '', {}]
  )
)
