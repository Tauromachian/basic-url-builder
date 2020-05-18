class UrlBuilder {

  /**
   * Sets the base url of the UrlBuilder
   * @param {String} url Base url
   */
  static setBaseUrl(url, name="def") {
    if(typeof url !== "string"){
      return 1;
    }

    this.defaultBaseUrl = url;
    this.baseUrls = new Map();
    this.baseUrls.set(this.defaultBaseUrl, name)
    this.routes = new Map();
    return 0;
  }

  static getBaseUrl(name) {
    if(!name){
      return this.defaultBaseUrl;
    }
    return this.baseUrls.get(name);
  }

  static addBaseUrl(url, name) {
    this.baseUrls.set(url, name);
  }
  
  /**
   * Creates the complete named route that can be later on used
   * @param {String} url Url of the route
   * @param {String} routeName Name Of the route
   */
  static setRoute(url, routeName) {
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
  static getRoute(routeName) {
    return this.routes.get(routeName);
  }

  /**
   * Checks if the route was created
   * @param {String} routeName Name of the route
   */
  static isRouteCreated(routeName) {
    return this.routes.has(routeName);
  }

  static _makeUrl(url) {
    const newUrl = this.defaultBaseUrl + url;
    return newUrl;
  }
}

module.exports = UrlBuilder;