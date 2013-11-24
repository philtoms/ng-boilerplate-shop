describe( 'Admin', function() {

  var admin = {telNo:"0800 123 456"};

  beforeEach( function(){
    module( 'ngbps.admin', function($provide){
      $provide.factory('Repository', function(){
        return function(){
          return admin;
        };
      });
    });
  });


  it('should provide admin values as an object', inject (function(AdminDB){
    expect(AdminDB.telNo).toBe(admin.telNo);
  }));

});
