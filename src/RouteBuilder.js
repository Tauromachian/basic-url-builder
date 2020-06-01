const AbstractRouteBuilder = require("./AbstractRouteBuilder");

class RouteBuilder extends AbstractRouteBuilder {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
    this.routes = new Map();
  }

  setBaseUrl(url) {
    if (!url) {
      return 0;
    }
    const oldBaseUrl = this.baseUrl;
    this.baseUrl = url;
    this._calculateRoutes(oldBaseUrl);
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  addRoute(route, name) {
    if (!route) {
      return 0;
    }
    if (!name) {
      return 0;
    }
    this.routes.set(name, this._makeUrl(route));
    return 1;
  }

  addRoutes(routes) {
    for (const key in routes) {
      if (Object.prototype.hasOwnProperty.call(routes, key)) {
        this.routes.set(key, routes[key]);
      }
    }
    return 1;
  }

  getRoute(routeName) {
    return this.routes.get(routeName);
  }

  isRouteCreated(routeName) {
    return this.routes.has(routeName);
  }

  _calculateRoutes(oldBaseUrl) {
    let routes = new Map();
    const keys = this.routes.keys();

    for (const key of keys) {
      const completeUrl = this.routes.get(key);
      const route = this._getRouteWithoutBaseUrl(completeUrl, oldBaseUrl);
      const newCompleteUrl = this._makeUrl(route);
      routes.set(key, newCompleteUrl);
    }
    this.routes = routes;
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
