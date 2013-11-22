/*
 * This is an e2e test suite.
 */
describe( 'ng-boilerplate-shop', function() {
  var url = '/base/build/index.html';
  describe( 'smoke test', function() {

    it( 'initial state', function () {
      // Trigger state change: Load page
      browser().navigateTo(url);

      // Check Title, rendered HTML and templates have all loaded
      expect(element('title').text()).toContain('ng-boilerplate-shop');
      expect(element('aside.left-bar').text()).not().toEqual('');
      expect(element('aside.right-bar').text()).not().toEqual('');
      expect(element('footer').text()).not().toEqual('');

    });
  });
});