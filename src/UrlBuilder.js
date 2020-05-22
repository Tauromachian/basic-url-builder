const RouteBuilder = require("./RouteBuilder");

class UrlBuilder {
  /**
   * Sets the base url of the UrlBuilder
   * @param {String} url Base url
   */
  static setBaseUrl(url, name = "def") {
    if (typeof url !== "string") {
      return 1;
    }

    if(!this.defaultBaseUrl){
      this.defaultBaseUrl = new RouteBuilder(url);
      this.routes = new Map();
      this.routes.set(name, this.defaultBaseUrl);
    }

    return 0;
  }

  static getUrlSet(name){
    return this.routes.get(name);
  }

  static getBaseUrl(name) {
    if (!name) {
      return this.defaultBaseUrl.getBaseUrl();
    }
    return this.routes.get(name).getBaseUrl();
  }

  static setDefaultUrl(name) {
    this.defaultBaseUrl = this.routes.get(name);
  }

  static addBaseUrl(url, name) {
    this.routes.set(name, new RouteBuilder(url));
  }

  /**
   * Creates the complete named route that can be later on used
   * @param {String} url Url of the route
   * @param {String} routeName Name Of the route
   */
  static addRoute(url, routeName) {
    this.defaultBaseUrl.addRoute(url, routeName);
  }

  /**
   * Gets the route using the name
   * @param {String} routeName Name of the route or the route itself if no name was provided at insert
   */
  static getRoute(routeName) {
    return this.defaultBaseUrl.getRoute(routeName);
  }

  /**
   * Checks if the route was created
   * @param {String} routeName Name of the route
   */
  static isRouteCreated(routeName) {
    return this.defaultBaseUrl.isRouteCreated(routeName);
  }
}

module.exports = UrlBuilder;
