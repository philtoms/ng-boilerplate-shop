describe ( 'utilities.services', function(){

  beforeEach(module('utilities'));

  describe('safeApply',function(){

    var safeApply,scope,$rootScope,$element;
    var markup='<div>{{test}}</div>';

    function testFN(){
      scope.test="YYY";
    }

    beforeEach(inject(function(_$rootScope_, _safeApply_, $compile){
      $rootScope = _$rootScope_;
      safeApply  = _safeApply_;

      scope = $rootScope.$new();
      scope.test="XXX";
      $element = $compile(markup)(scope);
      scope.$apply();
    }));

    it('should evaluate fn in current apply phase',function(){
      expect($element.text()).toContain('XXX');
      $rootScope.$$phase='$apply';
      safeApply(scope,testFN);
      expect(scope.test).toBe('YYY');
      expect($element.text()).toContain('XXX');
    });

    it('should evaluate fn in current digest phase',function(){
      expect($element.text()).toContain('XXX');
      $rootScope.$$phase='$digest';
      safeApply(scope,testFN);
      expect(scope.test).toBe('YYY');
      expect($element.text()).toContain('XXX');
    });

    it('should evaluate fn in new apply phase',function(){
      expect($element.text()).toContain('XXX');
      safeApply(scope,testFN);
      expect(scope.test).toBe('YYY');
      expect($element.text()).toContain('YYY');
    });

    it('should process scope in new apply phase',function(){
      expect($element.text()).toContain('XXX');
      testFN();
      safeApply(scope);
      expect(scope.test).toBe('YYY');
      expect($element.text()).toContain('YYY');
    });

  });

});
