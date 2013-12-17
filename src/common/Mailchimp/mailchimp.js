angular.module('Mailchimp', [])

.directive('mailchimp', [function() {
  return {
    restrict:'E',
    replace:true,
    templateUrl:'Mailchimp/mailchimp.tpl.html'
  };
}])

;

