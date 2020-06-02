let UrlBuilder = require("./UrlBuilder");

class UrlMapper {
  static map(urlSets) {
    this.currentBaseUrlName;

    if (urlSets instanceof Array) {
      this.arrangeArray(urlSets);
    } else {
      this.setOne(urlSets);
    }
  }

  static arrangeArray(urlSets) {
    for (let i = 0; i < urlSets.length; i++) {
      this.currentBaseUrlName = this.getFirstUrlName(urlSets[0]);  
      const set = urlSets[i];
      this.setBaseUrlsToUrlBuilder(set);
      this.setRoutes(set);
    }
  }

  static setOne(urlSet) {
    this.setBaseUrlsToUrlBuilder(urlSet);
    this.setRoutes(urlSet);
  }

  static setBaseUrlsToUrlBuilder(set) {
    const baseUrls = this.getBaseUrls(set);
    if (baseUrls instanceof Object) {
      const keys = Object.keys(baseUrls);
      let i = 0;
      for (const key of keys) {
        if (i === 0) {
          UrlBuilder.addBaseUrl(baseUrls[key], key);
          i++;
        } else {
          UrlBuilder.addUrlSetBrother(
            baseUrls[key],
            key,
            this.currentBaseUrlName
          );
        }
      }
    } else {
      return 1;
    }
  }

  static setRoutes(set) {
    const routes = this.getRoutes(set);
    const keys = Object.keys(routes);
    for (const key of keys) {
      UrlBuilder.addRoute(routes[key], key);
    }
  }

  static getFirstUrlName(set) {
    const keys = Object.keys(set.baseUrls);
    return keys[0];    
  }

  static getBaseUrls(set) {
    return set.baseUrls;
  }

  static getRoutes(set) {
    return set.routes;
  }
}

module.exports = UrlMapper;
