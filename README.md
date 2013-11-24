# ** Under Construction ***
# [ngBoilerplateShop](http://philtoms.github.com/ng-boilerplate-shop) [![Build Status](https://travis-ci.org/philtoms/ng-boilerplate-shop.png?branch=master)](https://travis-ci.org/philtoms/ng-boilerplate-shop)

An opinionated kickstarter for [AngularJS](http://angularjs.org) E-Commerce projects. 

`ngBoilerplateShop` is built on top of [ngBoilerplate](http://joshdmiller.github.com/ng-boilerplate), a basic framework for kick starting AngularJS projects. 
This means it supports and encourages AngularJS best-practices from the ground up.

ngBoilerPlateShop ships with the following features and components:

- A shopping cart - of course
- Pluggable gateways (Worldpay and Paypal are supplied)
- Comprehensive and instantaneous product search results
- Disqus commentary and discussion forum built in
- Social media 'like' buttons
- Google analytics

***

## Quick Start

Install Node.js and then:

```sh
$ git clone git://github.com/philtoms/ng-boilerplate-shop
$ cd ng-boilerplate-shop
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch
```

To see the initial website out of the box, open `file:///path/to/ng-boilerplate-shop/build/index.html` in your browser.

## Overview
By default ngBoilerPlateShop operates completely client side. This has some interesting consequences:
- There are no server transactions that can be exploited - the website is secure, domain-wise. Of course, appropriate gateway interfacing is still required, but generally, XSS and XSRF type vulnerabilities are handled off-site.

- The website is a stand-alone application. Once loaded it will continue to operate offline. The shop will be available for browsing (like early opening Sundays). The customer can complete their purchase when they go back online.
Building on the practices and principles laid down by ngBoilerplate.

An E-Commerce site should be unique. It should have its own style, its own feel, in E-Commerce terms its own branding. ngBoilerPlateShop builds on ngBoilerPlate and ngBoilerPlate is built on AngularJS best practices so we have a solid basis for refactoring. 

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

ngBoilerplateShop uses the LESS dynamic stylesheet language to separate styling from operational functionality.

###You can do even more with AngularJS
The following 
Header - 
Left Bar - The left bar

##Scenario 2
You need to change the architecture of ngBoilerPlateShop. Your product catalogue is tied in to your server side operation. In fact you don’t have a product catalogue as ngBoilerPlateShop needs to see it, but you do already have an established service api (or you’re strongly inclined to write one). What to do?

Create a new ProductDB adaptor. Have this adaptor consume the service api and map the response onto Products and Categories. 

##Scenario 3
You already have a perfectly good payment gateway sitting on your server. Or, perhaps more likely, you are using a commercial gateway that is not supported by ngBoilerplateShop. What to do?

Create and register a new Payment Gateway bridge. The design of the bridge component will depend on the requirements and capabilities of the target gateway. 

##Scenario 4
You want to introduce new functionality into your website shop. For example, you have a floor-tile business and you want to add a component that lets the customer map out their own tile requirements visually. This will be the killer feature that raises your website far above the competition. 

This ought to be off topic because it’s really all about AngularJS and complexity management. But this is the reason why ngBoilerPlateShop was created: To harness the power and awesomeness of Angular in the compelling, efficient environment of ngBoilerplate.

#Architecture
Architectural needs vary. ngBoilerPlateShop is feature oriented, meaning that new feature level components can be added to the project or can replace existing ones simply by dropping them into the source tree. 

ngBoilerPlateShop uses tried and tested patterns to keep features isolated. Override the following components to productionise your application:

- Repository (Proxy): acts as a proxy to your true data repository. Override to link your app to your backend requirements.

- ProductDB (Adaptor): adapts repository data into ngBoilerplateShop products and product categories. Override to map your existing contracts onto these objects.

- Gateway (Bridge) - allows your app and third-party gateways to vary independently. 
 
