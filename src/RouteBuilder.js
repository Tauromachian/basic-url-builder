const AbstractRouteBuilder = require("./AbstractRouteBuilder");

class RouteBuilder extends AbstractRouteBuilder {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
    this.routes = new Map();
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  addRoute(route, name) {
    if(!route){
      return 0;
    }
    if(!name){
      return 0;
    }
    if (name) {
      this.routes.set(name, this._makeUrl(route));
      return 1;
    } else {
      this.routes.set(route, this._makeUrl(route));
      return 1;
    }
  }

  getRoute(routeName) {
    return this.routes.get(routeName);
  }

  isRouteCreated(routeName) {
    return this.routes.has(routeName);
  }

  _makeUrl(url) {
    const newUrl = this.baseUrl + url;
    return newUrl;
  }
}

module.exports = RouteBuilder;
