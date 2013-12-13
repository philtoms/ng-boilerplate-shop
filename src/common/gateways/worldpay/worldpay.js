(function(module){

var embedGateway = false;
var gatewayWrapper;

module
.provider('worldPayGateway', function(){

  var formTemplate =
   '<form id="checkoutForm" name="worldpay" action="{{action}}" method="POST">' + 
    '<input type="hidden" name="amount"  value="{{total}}">' +
    '<input type="hidden" name="instId"  value="{{instId}}">' +
    '<input type="hidden" name="cartId" value="{{cartId}}">' +
    '<input type="hidden" name="withDelivery" value="{{delivery}}">' +
    '<input type="hidden" name="country" value="{{country}}">' +
    '<input type="hidden" name="currency" value="{{currency}}">' +
    '<input type="hidden" name="accId1" value="{{accId1}}">' +
    '<input type="hidden" name="M_items" value="{{sessionId}}">' +
    '<input type="hidden" name="desc" value="{{desc}}">' +
  '</form>';

  /* worldpay header template
  <table class="header" cellspacing="0" cellpadding="0" style="background-color:#3B3C41">
    <tbody>
    <tr>
      <td><a href="http://dampexpert.com/v2"><img src="/i/243021/dxlogo.png" style="width:211px; height:46px; border:0px;margin: 25px 0 0 10px;" alt="Dampexpert logo"></a></td>
      <td class="headerlogo1" style="background-color:#3B3C41; height:81px;"><img src="/images/wp/magic.gif" alt=""></td>
    </tr>
    </tbody>
  </table>
  */

  var instId,
      accId1,
      country,
      currency;

  var action = 'https://secure-test.worldpay.com/wcc/purchase';
  //var action = 'https://secure.worldpay.com/wcc/purchase';

  this.configure = function(options) {
    embedGateway = options.embed;
    instId = options.instId;
    accId1 = options.accId1;
    country = options.country;
    currency = options.currency;
    return this;
  };

  this.$get = function($http, $interpolate, $log){

    var codeup1 = "/-ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.";
    var codeup2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcd";

    function encodeId(items) {
        var encodedList = [];
        angular.forEach(items,function(item){
          var encoded=[];
          var id=item.id.toString().toUpperCase();
          for(var i=0;i<id.length;i++){
            var code = codeup1.indexOf(id[i]);
            if (code<0) {throw new Error("Item code error for '"+id+"'' - invalid id character '"+id[i]+"' at position "+i+"");}
            if (code>9){
              code=codeup2[code];
            }
            encoded.push(code);
          }
          encoded.push('-');
          encoded.push(item.quantity.toString().length);
          encoded.push(item.quantity);
          encodedList.push(encoded);
        });

        var cartIdParts = [];
        for (var i=0; i<encodedList.length; i++){
          cartIdParts.push(encodedList[i].join(''));
        }
        return cartIdParts.join('');
    }

    function decodeId(idStr) {
      var codes=[];
      var parts=idStr.split('-');
      for (var i=0,j=1;j<parts.length;i++,j++){
        var code=[];
        for (var p in parts[i]){
          var id=parts[i][p];
          if ('0123456789'.indexOf(id)<0){
            id = codeup2.indexOf(id);
          }
          code.push(codeup1[id]);
        }
        var qlen = parseInt(parts[j][0],10);
        var qty = parseInt(parts[j].substr(1,qlen),10);
        codes.push({id:code.join(''),quantity:qty});
        parts[j] = [].slice.call(parts[j],qlen+1);
      }
      return codes;
    }

    return {
      pay:function(cart) {
        var formItems = angular.extend({
          action:action,
          instId:instId,
          cartId:encodeId(cart.items),
          accId1:accId1,
          country:country,
          currency:currency
        },cart);

        var form = $interpolate(formTemplate, true, false)(formItems);

        var gatewayBody = embedGateway?
          angular.element(gatewayWrapper.contentWindow.document.getElementsByTagName('body')[0])
          : angular.element(gatewayWrapper);

        gatewayBody.html(form);
        gatewayBody.find('form')[0].submit();
      },
      encode: function(items){
        return encodeId(items);
      },
      decode: function(cartId){
        return decodeId(cartId);
      }
    };
  };
})

.directive('worldpayGateway', function(){
  var template = embedGateway?
       '<iframe class="frame" height="800px" width="100%" frameborder="0" border="0" marginwidth="0" marginheight="0""></iframe>'
      : '<div style="display:hidden;"></div>';

  return {
    restrict: 'E',
    replace: true,
    template: template,
    link : function(scope, element) {
      gatewayWrapper = element[0];
    }
  };
})

;

})(angular.module('WorldPay', []));


