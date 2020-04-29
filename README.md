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

Example:
```
UrlBuilder.setBaseUrl('http://lol.com');

UrlBuilder.setRoute('/service', 'service');

console.log(UrlBuilder.getRoute('service'));
```