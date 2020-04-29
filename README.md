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

The routes can be named and this is recommended use.

Methods

- setBaseUrl(url)
- getBaseUrl()
- setRoute(url, routeName)
- getRoute(routeName)
- isRouteCreated(url)

Example:

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