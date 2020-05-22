const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const RouteBuilder = require("../src/RouteBuilder");

describe("RouteBuilder.js", function () {
  it("Should exist", function () {
    expect(RouteBuilder).to.exist;
  });
  
  describe("setRoute", function () {
    it("Should insert routes correctly", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.setRoute("/someRoute", 'someRouteName');
      routeBuilder.routes.get("someRouteName").should.equal("http://testurl.com/someRoute");
      routeBuilder.setRoute("/someRoute2", 'someOtherRouteName');
      routeBuilder.routes.get("someOtherRouteName").should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("getRoute", function () {
    it("Should return the routes correctly", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.setRoute("/someRoute", 'someRouteName');
      routeBuilder.getRoute('someRouteName').should.equal("http://testurl.com/someRoute");
      routeBuilder.setRoute("/someRoute2", 'someOtherRouteName');
      routeBuilder.getRoute("someOtherRouteName").should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("isRouteCreated", function () {
    it("Should return true if the route has been created", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.setRoute("/someRoute", 'someRouteName');
      routeBuilder.isRouteCreated("someRouteName").should.equal(true);
      routeBuilder.setRoute("/someRoute", 'someRouteName2');
      routeBuilder.isRouteCreated("someRouteName2").should.equal(true);
    });
    it("Should return false if the route hasn't been created", function () {
      let routeBuilder = new RouteBuilder("http://testurl.com");
      routeBuilder.setRoute("/someRoute", 'someRouteName');
      routeBuilder.isRouteCreated("someRouteNameError").should.equal(false);
    });
  });
});