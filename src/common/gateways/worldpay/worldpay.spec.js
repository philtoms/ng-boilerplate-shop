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

    it( 'should be encoded from item ids and quantities', function(){

      var items,encoded,decoded;

      items = [{id:'3',quantity:1}];
      encoded = gateway.encode(items);
      expect(encoded).toEqual('V-11');

      items = [{id:'A',quantity:999}];
      encoded = gateway.encode(items);
      expect(encoded).toEqual('2-3999');
    });

    it( 'should be decoded back to item ids and quantities', function(){

      var items,encoded,decoded;

      // single character id
      items = [{id:'3',quantity:1}];
      encoded = gateway.encode(items);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(items);

      // mixed character id
      items = [{id:'GG102/S4',quantity:1}];
      encoded = gateway.encode(items);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(items);

      // items
      items = [{id:'GG102/S4',quantity:1},{id:'GG102/S3',quantity:9},{id:'GG102/S2',quantity:9},{id:'GG102/S1',quantity:9}];
      encoded = gateway.encode(items);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(items);

      // double figure qty
      items = [{id:'GG102/S4',quantity:999},{id:'GG102/S3',quantity:999}];
      encoded = gateway.encode(items);
      decoded = gateway.decode(encoded);
      expect(decoded).toEqual(items);
    });

    it ( 'should reject illegal id formats', function(){
      expect(function(){
        gateway.encode([{id:'ABC!123'}]);
      }).toThrow("Item code error for 'ABC!123'' - invalid id character '!' at position 3");
    });

  });

});