const chai = require("chai");
const expect = chai.expect;
chai.should();

const RouteSet = require("../src/RouteSet");

describe("RouteSet.js", function () {
  it("Should exist", function () {
    expect(RouteSet).to.exist;
  });

  describe("addRoute", function () {
    it("Should not insert correctly if no route is passed", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("", "someRouteName");
      expect(routeSet.routes.get("someRouteName")).to.be.undefined;
    });
    it("Should return 0 if no route is passed", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("", "someRouteName").should.equal(0);
    });
    it("Should not insert correctly if no name is passed", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("/someRoute", "");
      expect(routeSet.routes.get("someRouteName")).to.be.undefined;
    });
    it("Should return 0 if no name is passed", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("/someRoute", "").should.equal(0);
    });
    it("Should insert routes correctly", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("/someRoute", "someRouteName");
      routeSet.routes
        .get("someRouteName")
        .should.equal("http://testurl.com/someRoute");
      routeSet.addRoute("/someRoute2", "someOtherRouteName");
      routeSet.routes
        .get("someOtherRouteName")
        .should.equal("http://testurl.com/someRoute2");
    });
  });

  describe("getRoute", function () {
    it("Should return the routes correctly", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("/someRoute", "someRouteName");
      routeSet
        .getRoute("someRouteName")
        .should.equal("http://testurl.com/someRoute");
      routeSet.addRoute("/someRoute2", "someOtherRouteName");
      routeSet
        .getRoute("someOtherRouteName")
        .should.equal("http://testurl.com/someRoute2");
    });
    it("Should return undefined", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("", "someRouteName");
      expect(routeSet.getRoute("someRouteName")).to.be.undefined;
    });
  });

  describe("isRouteCreated", function () {
    it("Should return true if the route has been created", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("/someRoute", "someRouteName");
      routeSet.isRouteCreated("someRouteName").should.equal(true);
      routeSet.addRoute("/someRoute", "someRouteName2");
      routeSet.isRouteCreated("someRouteName2").should.equal(true);
    });
    it("Should return false if the route hasn't been created", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("/someRoute", "someRouteName");
      routeSet.isRouteCreated("someRouteNameError").should.equal(false);
    });
  });

  describe("getBaseUrl", function () {
    it("Should return the base url", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.getBaseUrl().should.be.equal("http://testurl.com");
    });
  });

  describe("setBaseUrl", function () {
    it("Should insert correctly the base url", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.setBaseUrl("http://secondtesturl.com");
      routeSet.getBaseUrl().should.be.equal("http://secondtesturl.com");
    });
    it("Should insert correctly the base url", function () {
      let routeSet = new RouteSet("http://testurl.com");
      routeSet.addRoute("/someRoute", "someRouteName");
      routeSet.setBaseUrl("http://secondtesturl.com");
      routeSet
        .getRoute("someRouteName")
        .should.be.equal("http://secondtesturl.com/someRoute");
    });
  });
});
