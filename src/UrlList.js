const RouteSet = require("./RouteSet");

class UrlList {
  constructor() {
    this.routeSets = {};
    this.defaultSet = null;
  }

  addBaseUrl(url, name) {
    if(!this.defaultSet) {
      this.defaultSet = new RouteSet(url);
      this.routeSets[name] = this.defaultSet;
    }else {
      let newRouteSet = new RouteSet(this.defaultSet.getBaseUrl());
      newRouteSet.routes = this.defaultSet.routes;
      newRouteSet.setBaseUrl(url);
      this.routeSets[name] = newRouteSet;
    }
  }

  getBaseUrl() {
    return this.defaultSet.getBaseUrl();
  }

  addRoute(route, name) {
    const keys = Object.keys(this.routeSets);
    
    for (const key of keys) {
      this.routeSets[key].addRoute(route, name);
    }

    return 1;
  }

  getRoute(name) {
    return this.defaultSet.getRoute(name);
  }

  isRouteCreated(name) {
    return this.defaultSet.isRouteCreated(name);
  }

  setDefaultSet(name) {
    if (!Object.prototype.hasOwnProperty.call(this.routeSets, name)) {
      return 0;
    }
    this.defaultSet = this.routeSets[name];
  }
}

module.exports = UrlList;
