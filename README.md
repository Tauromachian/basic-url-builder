#Basic Url Builder

The objective of this module is to provide a basic url builder tool, for a more easy managment of routes.

The filosofy of this module is define it once use it anywhere.

##How to import

CommonJS
```
const UrlBuilder = require("basic-url-builder");
```

ES6 module syntax
```
import UrlBuilder from "basic-url-builder";
```

Browser import the min.js file.
```
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

Using the build method
```
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
```

Example, shows the use in different classes:

SomeClass1.js 
```
const UrlBuilder = require('basic-url-builder');
const SomeClass2 = require('SomeClass2.js')

UrlBuilder.setBaseUrl('http://someUrl.com');

UrlBuilder.setRoute('/service', 'service');

console.log(UrlBuilder.getRoute('service'));
```

SomeClass2.js
```
const UrlBuilder = require('basic-url-builder');

console.log(UrlBuilder.getRoute('service'));
```

Is posible to have more than one baseUrl. Each baseUrl defines a collection. The different collections are accesible either by using the name of the base Url or setting the default baseUrl.

Example:

```
const UrlBuilder = require("basic-url-builder");

UrlBuilder.setBaseUrl("http://test.url", "name1");
UrlBuilder.setBaseUrl("http://test.url", "name2");

//This routes are inserted to the name1 baseUrl
UrlBuilder.addRoute("/someRoute/test", "routeName");
UrlBuilder.addRoute("/someRoute/test1", "routeName1");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");

//This routes are inserted to the name2 baseUrl
UrlBuilder.urlSet("name2").addRoute("/someRoute/test2", "routeName2");
UrlBuilder.urlSet("name2").addRoute("/someRoute/test2", "routeName2");
UrlBuilder.urlSet("name2").addRoute("/someRoute/test2", "routeName2");

//You can then get them by

UrlBuilder.getRoute("/someRoute/test2", "routeName2");
UrlBuilder.urlSet("name2").getRoute("/someRoute/test2", "routeName2");
```

Example using the setDefaultUrl method:
```
const UrlBuilder = require("basic-url-builder");

UrlBuilder.setBaseUrl("http://test.url", "name1");
UrlBuilder.setBaseUrl("http://test.url", "name2");

//This routes are inserted to the name1 baseUrl
UrlBuilder.addRoute("/someRoute/test", "routeName");
UrlBuilder.addRoute("/someRoute/test1", "routeName1");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");

//This routes are inserted to the name2 baseUrl
UrlBuilder.setDefaultUrl("name2");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");
UrlBuilder.addRoute("/someRoute/test2", "routeName2");

//You can then get them by

UrlBuilder.getRoute("/someRoute/test2", "routeName2");
UrlBuilder.urlSet("name2").getRoute("/someRoute/test2", "routeName2");
```