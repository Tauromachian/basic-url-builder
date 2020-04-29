class UrlBuilder {
  static setBaseUrl(url) {
    if(typeof url !== "string"){
      return 1;
    }

    this.baseUrl = url;
    this.routes = new Map();
    return 0;
  }

  static getBaseUrl() {
    return this.baseUrl;
  }

  static setRoute(url, routeName) {
    if (routeName) {
      this.routes.set(routeName, this._makeUrl(url));
      return 1;
    } else {
      this.routes.set(url, this._makeUrl(url));
      return 1;
    }
  }

  static getRoute(routeName) {
    return this.routes.get(routeName);
  }

  static isRouteCreated(routeName) {
    return this.routes.has(routeName);
  }

  static _makeUrl(url) {
    const newUrl = this.baseUrl + url;
    return newUrl;
  }
}

module.exports = UrlBuilder;