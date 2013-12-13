describe( 'worldpay gateway', function() {

  var gateway;

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('WorldPay'));

  describe( 'cart id', function(){

    beforeEach(inject(function(worldPayGateway){

      gateway = worldPayGateway;

    }));

    it( 'should be encoded from item list', function(){

      var list,encoded,decoded;

      list = [{id:'3',quantity:1}];
      encoded = gateway.encode(list);
      expect(encoded).toEqual('V-11');

      list = [{id:'A',quantity:999}];
      encoded = gateway.encode(list);
      expect(encoded).toEqual('2-3999');
    });

    it( 'should be equivalent item list', function(){

      var list,encoded,decoded;

      // single character id
      list = [{id:'3',quantity:1}];
      encoded = gateway.encode(list);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(list);

      // mixed character id
      list = [{id:'GG102/S4',quantity:1}];
      encoded = gateway.encode(list);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(list);

      // list
      list = [{id:'GG102/S4',quantity:1},{id:'GG102/S3',quantity:9},{id:'GG102/S2',quantity:9},{id:'GG102/S1',quantity:9}];
      encoded = gateway.encode(list);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(list);

      // double figure qty
      list = [{id:'GG102/S4',quantity:999},{id:'GG102/S3',quantity:999}];
      encoded = gateway.encode(list);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(list);
    });

    it ( 'should reject illegal id formats', function(){
      var thown;
      try{
        gateway.encode([{id:'ABC!123'}]);
      }
      catch (ex) {
          thrown=ex.message;
      }
      expect(thrown).toBe("Item code error for 'ABC!123'' - invalid id character '!' at position 3");
    });

  });

});