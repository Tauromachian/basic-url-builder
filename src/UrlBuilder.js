const UrlList = require("./UrlList");
const map = require("./UrlMapper");

class UrlBuilder {
  /**
   * Sets the base url of the UrlBuilder
   * @param {String} url Base url
   */
  static setBaseUrl(url, name = "def") {
    if (typeof url !== "string") {
      return 1;
    }

    if (!this.defaultBaseUrl) {
      this.defaultBaseUrl = new UrlList();
      this.defaultBaseUrl.addBaseUrl(url, name);
      this.routes = new Map();
      this.routes.set(name, this.defaultBaseUrl);
    }

    return 0;
  }

  static build(urlSets) {
    this.routes = map(urlSets);
    this.defaultBaseUrl = this.routes.values().next().value;
  }

  static getUrlSet(name) {
    return this.routes.get(name).getRouteSet(name);
  }
  
  static setDefaultUrlList(name) {
    this.routes.get(name).setDefaultSet(name);
    this.defaultBaseUrl = this.routes.get(name);
  }
  
  static addBaseUrl(url, name) {
    let newUrlList = new UrlList();
    newUrlList.addBaseUrl(url, name);
    this.routes.set(name, newUrlList);
  }

  static getBaseUrl(name) {
    if (!name) {
      return this.defaultBaseUrl.getBaseUrl();
    }
    return this.routes.get(name).getBaseUrl();
  }

  static addUrlSetBrother(url, name, brotherName) {
    let brotherUrlList = this.routes.get(brotherName);
    brotherUrlList.addBaseUrl(url, name);
    this.routes.set(name, brotherUrlList);
  }

  /**
   * Creates the complete named route that can be later on used
   * @param {String} url Url of the route
   * @param {String} name Name Of the route
   */
  static addRoute(url, name) {
    this.defaultBaseUrl.addRoute(url, name);
  }

  /**
   * Gets the route using the name
   * @param {String} name Name of the route or the route itself if no name was provided at insert
   */
  static getRoute(name) {
    return this.defaultBaseUrl.getRoute(name);
  }

  /**
   * Checks if the route was created
   * @param {String} name Name of the route
   */
  static isRouteCreated(name) {
    return this.defaultBaseUrl.isRouteCreated(name);
  }
}

module.exports = UrlBuilder;
