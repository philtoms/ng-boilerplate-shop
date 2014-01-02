# \*\* Under Construction \*\*
# [ngBoilerplateShop](http://philtoms.github.com/ng-boilerplate-shop) [![Build Status](https://travis-ci.org/philtoms/ng-boilerplate-shop.png?branch=master)](https://travis-ci.org/philtoms/ng-boilerplate-shop)

An opinionated kickstarter for [AngularJS](http://angularjs.org) E-Commerce projects focusing on mobile-first UX experience. 

ngBoilerPlateShop ships with the following features and components:

- A shopping cart - of course
- Pluggable gateways (Worldpay and Paypal are supplied, stripe support in development)
- Comprehensive and instantaneous product search results
- Disqus commentary and discussion forum built in
- Newsletter support (defaults to mailchimp)
- Social media 'like' buttons
- Google analytics

`ngBoilerplateShop` is built on top of [ngBoilerplate](http://joshdmiller.github.com/ng-boilerplate), a basic framework for kick starting AngularJS projects. This means it supports and encourages AngularJS best-practices from the ground up. What *that* means is that the project is modular, and you can drop out or add in modules to meet your own requirements and the build will complain if you do it wrong, and purr when you get it right. 

***

## Quick Start

Install Node.js and then:

```
$ git clone git://github.com/philtoms/ng-boilerplate-shop your-shop
$ cd your-shop
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch
```

To see the initial website out of the box, open `file:///path/to/your-shop/build/index.html` in your browser.

***
## Overview

By default ngBoilerPlateShop operates completely client side. This has some interesting consequences:

- There are no server transactions that can be exploited - the website is secure up to the point of actual purchase transactions. XSS and XSRF type vulnerabilities are (really should be) handled by the payment gateway service. For example, the [Worldpay™](http://www.worldpay.com/products/index.php?page=ecom&c=) payment gateway accepts but does not require any customer information to be transmitted across the wire. 

- The website operates in session scope only. No cookies or client-side storage technologies are used. Customer interaction is completely anonymous outside of the hosted payment gateway. 

- The website is a stand-alone application. Once loaded it will continue to operate offline. The shop will be available for browsing (like early opening Sundays). The customer can complete their purchase when they come back online.

ngBoilerPlateShop kicks off with a fully initialized ngBoilerplate build environment so read these [docs](http://joshdmiller.github.com/ng-boilerplate) first. Then read about the major components of the application and the example scenarios that maybe match your needs. 

Lets get started! 

##Scenario 1
You want to brand the website but you are quite happy with the out of the box internal design and architecture. This is the easiest route, the sweet spot of ngBoilerPlate shop. 

###You can do quite a lot with CSS (and more with [LESS](http://lesscss.org/))
The website structure has a typically bootstrapped grid layout:
```
Header
  Content
    Left Bar
    Main
    Right Bar
Footer
```
You can control the flow, the column widths, the number of columns etc, by tweaking the CSS and the underlying markup. A complete and even radical site makeover can be achieved without interrupting application functionality. 

ngBoilerplateShop uses the LESS dynamic stylesheet language to facilitate the separation of styling from operational functionality.

##Scenario 2
You need to change the architecture of ngBoilerPlateShop. Your product catalogue is tied in to your server side operation. In fact you don’t have a product catalogue as ngBoilerPlateShop needs to see it, but you do already have an established service api (or you’re strongly inclined to write one). What to do?

Create a new ProductDB adaptor. Have this adaptor consume the repository service api and map the response onto Products and Categories. 
```
angular.module('Custom.productDB', [])

.factory('ProductDB', function(Repository) {
    
  var repository = new Repository('link/to/service/api');

  var productDB = {
    customProductData: repository.get('products'),
    categories: repository.get('categories')
  };

  return productDB;
});
```

##Scenario 3

You already have a perfectly good payment gateway sitting on your server. Or, perhaps more likely, you are using a commercial gateway that is not supported by ngBoilerplateShop. What to do?

Create and register a new Payment Gateway bridge. The design of the bridge component will depend on the requirements and capabilities of the target gateway. 

```
angular.module('Custom.Gatway', [])

.provider('CustomGatewayService',function(){

  this.configure = function(options) {
  };

  this.$get = function(/* dependencies */){
  };
})

// A directive may be required to host the payment gateway service - might be an IFrame
// can be in separate files - use module reference syntax:
//   angular.module('custom-Gatway')
//   .directive(....

.directive('customGateway', function(/* dependencies */) {
    return {
        template:'<iframe class='custom-gateway'></iframe>
    }
});
```

Register the new component service with the `ShoppingCart` during application configuration...
```
angular.module('app', [])

  .config(['ShoppingCartProvider', function(shoppingCart){
    shoppingCart
      .setGateway('Custom.Gateway');
  }])

```

... and, if required, use the new directive in your checkout page
```
<section class='checkout' ng-controller='checkoutCtrl'>
  ...
  <custom-gateway ng-show='!cart.gatewayClosed'></custom-gateway>
</section>
```
##Scenario 4

You want to introduce new functionality into your website shop. For example, you have a floor-tile business and you want to add a component that lets the customer map out their own tile requirements visually. This will be the killer feature that raises your website far above the competition. 

This ought to be off topic because it’s really all about AngularJS and complexity management. But this is the reason why ngBoilerPlateShop was created: To harness the power and awesomeness of Angular in the compelling, efficient environment of ngBoilerplate. Instructions?

Develop your feature component independenly of ngBoilerplateShop and drop it in to the `src/common` folder. No need to register the source with the `index.html`, ngBoilerPlate will ensure that the component is added to the deployment. All tests associated with the feature should be included side by side with the component source and will be run as part of the continuous build system.

```
/src
  /app
  /common
    /tileCalculator
       tileCalculator.js
       tileCalculator.spec.js
       tileCalculator.feature.js
       tileCalculator.scenario.js
```

#Architecture

Architectural needs vary. ngBoilerPlateShop is feature oriented, meaning that new feature level components can be added to the project or can replace existing ones simply by dropping them into the source tree and referencing them in app.js. 

ngBoilerPlateShop uses tried and tested patterns to keep features isolated. Override the following components to productionise your application:

- Repository (Proxy): acts as a proxy to your true data repository. The default implementation binds onto Json data. Override to link your app to your backend requirements.

- ProductDB (Adaptor): projects repository data onto ngBoilerplateShop products and product categories. Override to map your existing contracts onto these objects.

- Gateway (Bridge): allows your app and third-party payment gateways to vary independently. The default gateways provide client-side hosting for the WorldPay and Paypal gateway services. - 

#Roadmap
- ###Showcase application
ngBoilerplateShop generates a fully functional application but it ain't pretty. The showcase app will style the out-of-the-box features though CSS and so, at least, demonstrate the first scenario.

- ###SEO-friendly page generation
Already in prototype, static SEO page generation though the grunt build process will maintain this project's server independence by generating google hashtag compatible static pages directly into the bin folder.

- ###Add Stripe support
