class RouteSet {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.routes = new Map();
  }

  /**
   * Sets a new base url
   * @param {String} url Base url to work with
   * @param {String} name Name of the url
   */
  setBaseUrl(url) {
    const oldBaseUrl = this.baseUrl;
    this.baseUrl = url;
    const newRoutes = this._calculateRoutes(oldBaseUrl, this.routes);
    this.routes = newRoutes;
  }

  /**
   * Returns the base url who's name is introduced
   * @param {String} name Name of the base url that needs to be returned
   */
  getBaseUrl() {
    return this.baseUrl;
  }

  /**
   * Creates the complete named route that can be later on used
   * @param {String} url Url of the route
   * @param {String} routeName Name Of the route
   */
  addRoute(route, name) {
    if(!route || !name) {
      return 0;
    }
    this.routes.set(name, this._makeUrl(route));
    return 1;
  }

  /**
   * Gets the route using the name
   * @param {String} routeName Name of the route or the route itself if no name was provided at insert
   */
  getRoute(routeName) {
    return this.routes.get(routeName);
  }

  /**
   * Checks if the route was created
   * @param {String} routeName Name of the route
   */
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

module.exports = RouteSet;
