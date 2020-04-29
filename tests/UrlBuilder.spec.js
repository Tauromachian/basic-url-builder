const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const UrlBuilder = require("../src/UrlBuilder");

describe("UrlBuilder.js", function () {
  it("Should exist", function () {
    expect(UrlBuilder).to.exist;
  });

  describe("setBaseUrl", function () {
    it("Should return 0 Ok code", function () {
      UrlBuilder.setBaseUrl("http://testurl.com").should.equal(0);
    });
    it("Should return 1 Error code", function () {
      UrlBuilder.setBaseUrl(1).should.equal(1);
    });
    it("Should instance url and routes correctly", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.baseUrl.should.equal("http://testurl.com");
      UrlBuilder.routes.should.be.a('map');
    });
  });

  describe("getBaseUrl", function () {
    it("Should return the base url correctly", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.getBaseUrl().should.equal("http://testurl.com");
    });
  });

  describe("setRoute", function () {
    it("Should insert routes correctly", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.setRoute("/someRoute", 'someRouteName');
      UrlBuilder.routes.get("someRouteName").should.equal("http://testurl.com/someRoute");
      UrlBuilder.setRoute("/someRoute2", 'someOtherRouteName');
      UrlBuilder.routes.get("someOtherRouteName").should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("getRoute", function () {
    it("Should return the routes correctly", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.setRoute("/someRoute", 'someRouteName');
      UrlBuilder.getRoute('someRouteName').should.equal("http://testurl.com/someRoute");
      UrlBuilder.setRoute("/someRoute2", 'someOtherRouteName');
      UrlBuilder.getRoute("someOtherRouteName").should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("isRouteCreated", function () {
    it("Should return true if the route has been created", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.setRoute("/someRoute", 'someRouteName');
      UrlBuilder.isRouteCreated("someRouteName").should.equal(true);
      UrlBuilder.setRoute("/someRoute", 'someRouteName2');
      UrlBuilder.isRouteCreated("someRouteName2").should.equal(true);
    });
    it("Should return false if the route hasn't been created", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.setRoute("/someRoute", 'someRouteName');
      UrlBuilder.isRouteCreated("someRouteNameError").should.equal(false);
    });
  });
});