const AbstractRouteBuilder = require("./AbstractRouteBuilder");

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
    this.routes[name] = calculateRoutes();
    this.routes[name].setBaseUrl(url);
  }

  getBaseUrl(name) {
    return this.routes[name].name;
  }

  addRoute(url, name) {
    if (name) {
      this.routes.set(name, this._makeUrl(url));
      return 1;
    } else {
      this.routes.set(url, this._makeUrl(url));
      return 1;
    }
  }

  getRoute(name) {
    return this.defaultUrlSet.getRoute(name);
  }

  isRouteCreated(name) {
    return this.defaultUrlSet.isRouteCreated(name);
  }

}

module.exports = RouteBuilderHandler;
