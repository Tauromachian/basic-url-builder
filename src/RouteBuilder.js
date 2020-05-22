class RouteBuilder {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.routes = new Map();
  }

  /**
   * Creates the complete named route that can be later on used
   * @param {String} url Url of the route
   * @param {String} routeName Name Of the route
   */
  setRoute(url, routeName) {
    if (routeName) {
      this.routes.set(routeName, this._makeUrl(url));
      return 1;
    } else {
      this.routes.set(url, this._makeUrl(url));
      return 1;
    }
  }

  /**
   * Gets the route using the name
   * @param {String} routeName Name of the route or the route itself if no name was provided at insert
   */
  getRoute(routeName) {
    return this.routes.get(routeName);
  }

  _makeUrl(url) {
    const newUrl = this.baseUrl + url;
    return newUrl;
  }

  /**
   * Checks if the route was created
   * @param {String} routeName Name of the route
   */
  isRouteCreated(routeName) {
    return this.routes.has(routeName);
  }

  setBaseUrl(url){
    this.baseUrl = url;
  }

  getBaseUrl(){
    return this.baseUrl;
  }
}

module.exports = RouteBuilder;
