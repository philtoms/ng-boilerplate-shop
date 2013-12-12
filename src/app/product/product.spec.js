describe( 'product section', function() {
  beforeEach( module( 'ngbps.product' ) );

  describe('feature-link directive', function(){

    var markup = "<ul><li class='feature-link' ng-repeat='feature in features'></li></ul>";
    var scope,$element;

    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      $element = $compile(markup)(scope);
    }));

    it('should append simple text features', function(){
      scope.features=["XXX"];
      scope.$digest();
      expect($element.text()).toBe('XXX');
    });

    it('should append popover element', function(){
      scope.features=[{link:'popover',popover:"XXX",text:"{{YYY}}"}];
      scope.$digest();
      expect($element.find('li').html()).toBe('<span class="ng-scope"><a popover-placement="top" popover="XXX">YYY</a></span>');
    });

  });
});

