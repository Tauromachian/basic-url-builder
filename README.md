#Basic Url Builder

The objective of this module is to provide a basic url builder tool, for a more easy managment of routes.

The filosofy of this module is define it once use it anywhere.

##How to import

CommonJS
```js
const UrlBuilder = require("basic-url-builder");
```

ES6 module syntax
```js
import UrlBuilder from "basic-url-builder";
```

Browser import the min.js file.
```js
<script type="text/javascript" src="basic-url-builder.min.js"> 
```

##How to use

UrlBuilder is a static class, that means you don't instantiate it but call the methods directly, it also means that no matter where you define the routes you can use them anywhere later.

Methods:

- setBaseUrl(url, name)
- addBaseUrl(url, name)
- setDefaultUrlList(name)
- getBaseUrl(name)
- addBaseUrl(url, name)
- getUrlSet(name)
- addRoute(url, routeName)
- getRoute(routeName)
- isRouteCreated(url)
- build(urlSet)

###Using the build method

Example: 

index.js
```js
const UrlBuilder = require("basic-url-builder");
const logRoute = require("./file");

UrlBuilder.build({
  baseUrls: {
    dev: "http://firsttesturl",
    prod: "http://secondtesturl",
  },
  routes: {
    service: "/service",
    products: "/products",
  },
});

UrlBuilder.setDefaultUrlList("dev");
logRoute();
console.log(UrlBuilder.getRoute("service"));
```

someFile.js
```js
const UrlBuilder = require("basic-url-builder");

function logRoute() {
  console.log(UrlBuilder.getRoute("service"));
}

module.exports = logRoute;
```

###Programmatically using UrlBuilder

Example: 

someFile1.js 
```js
const UrlBuilder = require('basic-url-builder');
const logRoute = require('./someFile2.js')

UrlBuilder.setBaseUrl('http://someUrl.com');

UrlBuilder.addRoute('/service', 'service');

logRoute();
console.log(UrlBuilder.getRoute('service'));
```

someFile2.js
```js
const UrlBuilder = require("basic-url-builder");

function logRoute() {
  console.log(UrlBuilder.getRoute("service"));
}

module.exports = logRoute;
```

Is posible to have more than one baseUrl. Each baseUrl defines a collection. The different collections are accesible either by using the name of the base Url or setting the default baseUrl.

Example:

```js
const UrlBuilder = require("./UrlBuilder");

UrlBuilder.setBaseUrl("http://test.url", "name1");
UrlBuilder.addBaseUrl("http://test1.url", "name2");

//This routes are inserted to the name1 baseUrl
UrlBuilder.addRoute("/someRoute/test", "routeName");
UrlBuilder.addRoute("/someRoute/test1", "routeName1");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");

//This routes are inserted to the name2 baseUrl
UrlBuilder.getUrlSet("name2").addRoute("/someRoute/test2", "routeName2");
UrlBuilder.getUrlSet("name2").addRoute("/someRoute/test2", "routeName2");
UrlBuilder.getUrlSet("name2").addRoute("/someRoute/test2", "routeName2");

//You can then get them by

UrlBuilder.getUrlSet("name2").getRoute("/someRoute/test2", "routeName2");
```

Example using the setDefaultUrlList method:
```js
const UrlBuilder = require("basic-url-builder");

UrlBuilder.setBaseUrl("http://test.url", "name1");
UrlBuilder.setBaseUrl("http://test.url", "name2");

//This routes are inserted to the name1 baseUrl
UrlBuilder.addRoute("/someRoute/test", "routeName");
UrlBuilder.addRoute("/someRoute/test1", "routeName1");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");

//This routes are inserted to the name2 baseUrl
UrlBuilder.setDefaultUrlList("name2");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");

//You can then get them by

UrlBuilder.getRoute("/someRoute/test2", "routeName2");
UrlBuilder.getUrlSet("name2").getRoute("/someRoute/test2", "routeName2");
```