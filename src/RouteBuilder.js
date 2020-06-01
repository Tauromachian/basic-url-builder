const AbstractRouteBuilder = require("./AbstractRouteBuilder");

class RouteBuilder extends AbstractRouteBuilder {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
    this.routes = new Map();
  }

  _setBaseUrl(url) {
    const oldBaseUrl = this.baseUrl;
    this.baseUrl = url;
    const newRoutes = this._calculateRoutes(oldBaseUrl, this.routes);
    this.routes = newRoutes;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  _addRoute(route, name) {
    this.routes.set(name, this._makeUrl(route));
    return 1;
  }

  addRoutes(routes) {
    for (const key in routes) {
      this.routes.set(key, routes[key]);
    }
    return 1;
  }

  getRoute(routeName) {
    return this.routes.get(routeName);
  }

  isRouteCreated(routeName) {
    return this.routes.has(routeName);
  }

  _calculateRoutes(oldBaseUrl, oldRoutes) {
    let routes = new Map();
    const keys = oldRoutes.keys();

    for (const key of keys) {
      const completeUrl = oldRoutes.get(key);
      const route = this._getRouteWithoutBaseUrl(completeUrl, oldBaseUrl);
      const newCompleteUrl = this._makeUrl(route);
      routes.set(key, newCompleteUrl);
    }
    return routes;
  }

  _getRouteWithoutBaseUrl(url, baseUrl) {
    return url.replace(baseUrl, "");
  }

  _makeUrl(url) {
    const newUrl = this.baseUrl + url;
    return newUrl;
  }
}

module.exports = RouteBuilder;
