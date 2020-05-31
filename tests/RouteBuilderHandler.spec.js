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
      routeBuilderHandler.isRouteCreated("someRouteNameError").should.equal(false);
    });
  });
});
