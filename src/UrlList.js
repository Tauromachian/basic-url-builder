class UrlList {
  constructor() {
    this.routeSets = {};
    this.defaultSet = null;
  }

  setBaseUrl(url) {
    this.defaultSet.setBaseUrl(url);
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
