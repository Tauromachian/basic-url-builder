const AbstractRouteBuilder = require("./AbstractRouteBuilder");
const RouteBuilder = require("./RouteBuilder");

class RouteBuilderHandler extends AbstractRouteBuilder {
  constructor(routeSet, name) {
    super();
    this.defaultUrlSet = routeSet;
    this.routes = {
      [name]: routeSet
    };
  }

  setBaseUrl(url, name) {
    if(this.routes[name]){
      this.defaultUrlSet = this.routes[name];
      this.routes[name].setBaseUrl(url);
    }

    let routeBuilder = new RouteBuilder(url);
    this.routes[name] = routeBuilder;
    this.routeBuilder.addRoutes(this._calculateRoutes());

  }

  getBaseUrl(name) {
    return this.routes[name].name;
  }

  addRoute(url, name) {
    this.defaultUrlSet.addRoute(url, name);
    return 1;
  }

  getRoute(name) {
    return this.defaultUrlSet.getRoute(name);
  }

  isRouteCreated(name) {
    return this.defaultUrlSet.isRouteCreated(name);
  }

  _makeUrl(url, baseUrl) {
    const newUrl = baseUrl + url;
    return newUrl;
  }

  _calculateRoutes(url) {
    let routes = {};
    for (const key in this.routes) {
      if (this.routes.hasOwnProperty(key)) {
        const routeBuilder = this.routes[key];
        const baseUrl = routeBuilder.getBaseUrl();
        const routeMap = routeBuilder.routes;
        const keys = routeMap.keys();
        for (const key of keys) {
           const route = this._getRouteWithoutBaseUrl(routeMap.get(key), baseUrl);
           routes[key] = this._makeUrl(route, baseUrl);
        }
      }
    }
  }

  _getRouteWithoutBaseUrl(url, baseUrl) {
    return url.replace(baseUrl, "");
  }

}

module.exports = RouteBuilderHandler;
