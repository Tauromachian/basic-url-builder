const chai = require("chai");
const expect = chai.expect;
chai.should();

const RouteBuilderHandler = require("../src/RouteBuilderHandler");
const RouteBuilder = require("../src/RouteBuilder");

describe("RouteBuilderHandler.js", function () {
  it("Should exist", function () {
    expect(RouteBuilderHandler).to.exist;
  });

  describe("addRoute", function () {
    it("Should insert routes correctly", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder, "dev");

      routeBuilderHandler.addRoute("/someRoute", "someRouteName");
      routeBuilderHandler.defaultUrlSet
        .getRoute("someRouteName")
        .should.equal("http://testurl.com/someRoute");
      routeBuilderHandler.addRoute("/someRoute2", "someOtherRouteName");
      routeBuilderHandler.defaultUrlSet
        .getRoute("someOtherRouteName")
        .should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("getRoute", function () {
    it("Should return the routes correctly", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder);
      routeBuilderHandler.addRoute("/someRoute", "someRouteName");
      routeBuilderHandler
        .getRoute("someRouteName")
        .should.equal("http://testurl.com/someRoute");
      routeBuilderHandler.addRoute("/someRoute2", "someOtherRouteName");
      routeBuilderHandler
        .getRoute("someOtherRouteName")
        .should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("isRouteCreated", function () {
    it("Should return true if the route has been created", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder);
      routeBuilderHandler.addRoute("/someRoute", "someRouteName");
      routeBuilderHandler.isRouteCreated("someRouteName").should.equal(true);
      routeBuilderHandler.addRoute("/someRoute", "someRouteName2");
      routeBuilderHandler.isRouteCreated("someRouteName2").should.equal(true);
    });
    it("Should return false if the route hasn't been created", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder);
      routeBuilderHandler.addRoute("/someRoute", "someRouteName");
      routeBuilderHandler
        .isRouteCreated("someRouteNameError")
        .should.equal(false);
    });
  });

  describe("getBaseUrl", function () {
    it("Should return the defaultUrlSet base url", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder, "dev");

      routeBuilderHandler.getBaseUrl().should.equal("http://testurl.com");
    });
  });

  describe("setBaseUrl", function () {
    it("Should replace the old baseUrl with the new succesfully", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder, "dev");

      routeBuilderHandler.setBaseUrl("http://someothertesturl.com", "dev");
      routeBuilderHandler
        .getBaseUrl()
        .should.equal("http://someothertesturl.com");
    });
  });

  describe("addBaseUrl", function () {
    it("Should add correctly the new base url", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder, "dev");

      routeBuilderHandler.addBaseUrl("http://someothertesturl.com", "prod");

      routeBuilderHandler.defaultUrlSet = routeBuilderHandler.routes["prod"];

      routeBuilderHandler
        .getBaseUrl()
        .should.equal("http://someothertesturl.com");
    });
  });

  describe("setDefaultUrlSet", function () {
    it("Should change the default url set correctlly", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      let routeBuilderHandler = new RouteBuilderHandler(routeBuilder, "dev");

      routeBuilderHandler.addBaseUrl("http://someothertesturl.com", "prod");

      routeBuilderHandler.setDefaultUrlSet("prod");

      routeBuilderHandler
        .getBaseUrl()
        .should.equal("http://someothertesturl.com");
    });
  });

});
