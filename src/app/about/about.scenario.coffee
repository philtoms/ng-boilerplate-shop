# An example of an E2E test written in CoffeeScript
describe( 'ng-boilerplate /about', () ->
  url = '/base/build/index.html#/about'
  describe( 'smoke test', () ->

    it( 'initial state', () ->
      # Trigger state change: Load page
      browser().navigateTo(url)

      # Check rendered HTML:
      # ui-view content has correct heading
      expect(element('div[ui-view="main"] h1', 'content heading').text()).
      toContain('The Elevator Pitch')

      # Check URL partial: /home
      expect(browser().window().hash()).toEqual('/about')
    )
  )
)
