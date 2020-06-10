const UrlList = require("../src/UrlList");


function map(urlSets) {
  const baseUrls = getBaseUrls(urlSets);
  let urlList = createUrlList(baseUrls);
  const routes = getRoutes(urlSets);
  let urlListWithRoutes = setRoutesInUrlList(urlList, routes);
  const urlMap = toMap(urlListWithRoutes);
  return urlMap;
}

function toMap(urlList) {
  let urlMap = new Map();
  const keys = urlList.getBaseUrlNames();

  for (const key of keys) {
    urlMap.set(key, urlList);
  }

  return urlMap;
}

function createUrlList(baseUrls) {
  const keys = Object.keys(baseUrls);
  let urlList = new UrlList();
  for (const key of keys) {
    urlList.addBaseUrl(baseUrls[key], key);
  }
  return urlList;
}

function setRoutesInUrlList(urlList, routes) {
  const keys = Object.keys(routes);
  for (const key of keys) {
    urlList.addRoute(routes[key], key);
  }
  return urlList;
}

function getBaseUrls(set) {
  return set.baseUrls;
}

function getRoutes(set) {
  return set.routes;
}

module.exports = map;
