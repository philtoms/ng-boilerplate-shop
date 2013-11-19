/*
 * This is an e2e test suite.
 */

describe( 'ng-boilerplate', function() {
  var url = '/base/build/index.html';
  describe( 'smoke test', function() {

    it( 'initial state', function () {
      // Trigger state change: Load page
      browser().navigateTo(url);

      // Check rendered HTML: Top heading is correct, and ng-view content has correct heading
      expect(element('div.masthead h3', 'top heading').text()).toContain('ng-boilerplate');
      expect(element('div[ui-view] h1', 'content heading').text()).toContain('Non-Trivial AngularJS Made Easy');

      // Check URL partial: /home
      expect(browser().window().hash()).toEqual('/home');
    });
  });
});