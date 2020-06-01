class AbstractRouteBuilder {
  /**
   * Sets a new base url
   * @param {String} url Base url to work with
   * @param {String} name Name of the url
   */
  setBaseUrl(url, name) {}

  /**
   * Returns the base url who's name is introduced
   * @param {String} name Name of the base url that needs to be returned
   */
  getBaseUrl(name) {}

  /**
   * Creates the complete named route that can be later on used
   * @param {String} url Url of the route
   * @param {String} routeName Name Of the route
   */
  addRoute(route, name) {
    if (!route || !name) {
      return 0;
    }
    return this._addRoute(route, name);
  }

  _addRoute(route, name) {}

  /**
   * Gets the route using the name
   * @param {String} routeName Name of the route or the route itself if no name was provided at insert
   */
  getRoute(name) {}

  /**
   * Checks if the route was created
   * @param {String} routeName Name of the route
   */
  isRouteCreated(name) {}

  _setDefaultUrlSet(name) {}
}

module.exports = AbstractRouteBuilder;
