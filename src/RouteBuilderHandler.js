const AbstractRouteBuilder = require("./AbstractRouteBuilder");
const RouteBuilder = require("./RouteBuilder");

class RouteBuilderHandler extends AbstractRouteBuilder {
  constructor(routeSet, name) {
    super();
    this.defaultUrlSet = routeSet;
    this.routes = {
      [name]: routeSet,
    };
  }

  setBaseUrl(url, name) {
    if(!this.routes[name]){
      return 0;
    }

    this.routes[name].setBaseUrl(url);
    return 1;
  }

  addBaseUrl(url, name) {
    let routeBuilder = new RouteBuilder(this.defaultUrlSet.getBaseUrl());
    this.routes[name] = routeBuilder;
    routeBuilder.routes = new Map(this.defaultUrlSet.routes);
    routeBuilder.setBaseUrl(url);
  }

  getBaseUrl() {
    return this.defaultUrlSet.getBaseUrl();
  }

  addRoute(url, name) {
    const keys = Object.keys(this.routes);

    for (const key of keys) {
      this.routes[key].addRoute(url, name);
    }

    return 0;
  }

  getRoute(name) {
    return this.defaultUrlSet.getRoute(name);
  }

  isRouteCreated(name) {
    return this.defaultUrlSet.isRouteCreated(name);
  }

  _setDefaultUrlSet(name) {
    if (!name) {
      return 0;
    }

    if (!Object.keys(this.routes).includes(name)) {
      return 0;
    }

    this.defaultUrlSet = this.routes[name];
  }
}

module.exports = RouteBuilderHandler;
