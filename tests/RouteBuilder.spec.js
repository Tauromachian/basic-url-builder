const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const RouteBuilder = require("../src/RouteBuilder");

describe("RouteBuilder.js", function () {
  it("Should exist", function () {
    expect(RouteBuilder).to.exist;
  });

  describe("addRoute", function () {
    it("Should not insert correctly if no route is passed", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("", "someRouteName");
      expect(routeBuilder.routes.get("someRouteName")).to.be.undefined;
    });
    it("Should return 0 if no route is passed", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("", "someRouteName").should.equal(0);
    });
    it("Should not insert correctly if no name is passed", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("/someRoute", "");
      expect(routeBuilder.routes.get("someRouteName")).to.be.undefined;
    });
    it("Should return 0 if no name is passed", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("/someRoute", "").should.equal(0);
    });
    it("Should insert routes correctly", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("/someRoute", "someRouteName");
      routeBuilder.routes
        .get("someRouteName")
        .should.equal("http://testurl.com/someRoute");
      routeBuilder.addRoute("/someRoute2", "someOtherRouteName");
      routeBuilder.routes
        .get("someOtherRouteName")
        .should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("getRoute", function () {
    it("Should return the routes correctly", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("/someRoute", "someRouteName");
      routeBuilder
        .getRoute("someRouteName")
        .should.equal("http://testurl.com/someRoute");
      routeBuilder.addRoute("/someRoute2", "someOtherRouteName");
      routeBuilder
        .getRoute("someOtherRouteName")
        .should.equal("http://testurl.com/someRoute2");
    });
    it("Should return undefined", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("", "someRouteName");
      expect(routeBuilder.getRoute("someRouteName")).to.be.undefined;
    });
  });

  describe("isRouteCreated", function () {
    it("Should return true if the route has been created", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("/someRoute", "someRouteName");
      routeBuilder.isRouteCreated("someRouteName").should.equal(true);
      routeBuilder.addRoute("/someRoute", "someRouteName2");
      routeBuilder.isRouteCreated("someRouteName2").should.equal(true);
    });
    it("Should return false if the route hasn't been created", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.addRoute("/someRoute", "someRouteName");
      routeBuilder.isRouteCreated("someRouteNameError").should.equal(false);
    });
  });
});
