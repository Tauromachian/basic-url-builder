const AbstractRouteBuilder = require("./AbstractRouteBuilder");

class RouteBuilder extends AbstractRouteBuilder {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.routes = new Map();
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  addRoute(url, routeName) {
    if (routeName) {
      this.routes.set(routeName, this._makeUrl(url));
      return 1;
    } else {
      this.routes.set(url, this._makeUrl(url));
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
