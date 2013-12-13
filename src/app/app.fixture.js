/**
 * This module is used in development to mock $http calls
 */
angular.module( 'ngBoilerplateShop.dev', [ 'ngBoilerplateShop', 'ngMockE2E' ]);

/**
 * This is where you store `$httpBackend.when()` calls
 * to go with your app's `$http` calls.
 */
angular.module( 'ngBoilerplateShop' ).run( function ( $httpBackend ) {

  $httpBackend.when( 'GET', 'template.html' ).respond( '<div class="template">template</div>');

  $httpBackend.when( 'GET', 'assets/data/shop.json' ).respond( function () {
    return [200, {
      "admin":{
        "rates":{
          "freeShipping":200,
          "shipping":9.99,
          "taxRate":0.20,
          "taxSuffix":['exc. vat','inc. vat']
        }
      },
      "products":{
        "p1":{
          "title":"Product 1",
          "description":"<strong>The first product</strong>"
        },
        "p2":{
          "title":"Product 2",
          "imageUrl":"/img/p2.png",
          "text":"The 2nd product to be tested",
          "price":10,
          "features":[{"link":"popover","placement":"right","popover":"msg","text":"{{text}}"},"f2"]
        },
        "p3":{
          "title":"Product 3",
          "links":[
            "p2", // product links
            {"Template":"template.html"},
            {"Range":["p1","p2"]},
            {"HREFs":[{"link1":"link1.html"},{"link2":"link2.pdf"}]}
          ]
        }
      },
      "categories":{
        "c1":{
          "title":"Category 1",
          "products":["p1","p2","p3"]
        }
      }
    }];
  });

})

;