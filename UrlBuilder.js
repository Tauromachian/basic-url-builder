class UrlBuilder {
  static setBaseUrl(url) {
    if (!this.instance) {
      this.instance = this;
      this.baseUrl = url;
      this.routes = new Map();
    }

    return this.instance;
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