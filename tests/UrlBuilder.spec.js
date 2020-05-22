const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const UrlBuilder = require("../src/UrlBuilder");
const RouteBuilder = require("../src/RouteBuilder");

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
      UrlBuilder.defaultBaseUrl.should.be.a("object");
      UrlBuilder.routes.should.be.a("map");
    });
    it("Should insert the url with the name correctly", function() {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.routes.get("def").getBaseUrl().should.equal("http://testurl.com");
    });
  });

  describe("getBaseUrl", function () {
    it("Should return the base url correctly", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.getBaseUrl().should.equal("http://testurl.com");
    });
  });

  describe("getRoute", function () {
    it("Should return the routes correctly", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.defaultBaseUrl.addRoute("/someRoute", "someRouteName");
      UrlBuilder.getRoute("someRouteName").should.equal(
        "http://testurl.com/someRoute"
      );
      UrlBuilder.defaultBaseUrl.addRoute("/someRoute2", "someOtherRouteName");
      UrlBuilder.getRoute("someOtherRouteName").should.equal(
        "http://testurl.com/someRoute2"
      );
    });
  });

  describe("addRoute", function () {
    it("Should insert routes correctly", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.addRoute("/someRoute", "someRouteName");
      UrlBuilder.getRoute("someRouteName").should.equal(
        "http://testurl.com/someRoute"
      );
      UrlBuilder.addRoute("/someRoute2", "someOtherRouteName");
      UrlBuilder.getRoute("someOtherRouteName").should.equal(
        "http://testurl.com/someRoute2"
        );
    });
  });


  describe("isRouteCreated", function () {
    it("Should return true if the route has been created", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.addRoute("/someRoute", "someRouteName");
      UrlBuilder.isRouteCreated("someRouteName").should.equal(true);
      UrlBuilder.addRoute("/someRoute", "someRouteName2");
      UrlBuilder.isRouteCreated("someRouteName2").should.equal(true);
    });
    it("Should return false if the route hasn't been created", function () {
      UrlBuilder.setBaseUrl("http://testurl.com");
      UrlBuilder.addRoute("/someRoute", "someRouteName");
      UrlBuilder.isRouteCreated("someRouteNameError").should.equal(false);
    });
  });
});
