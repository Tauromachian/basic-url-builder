const chai = require("chai");
const expect = chai.expect;
chai.should();

const map = require("../src/UrlMapper");

describe("Url Mapper.js", function () {
  it("Should exist", function () {
    expect(map).to.exist;
  });

  let routes = map({
    baseUrls: {
      dev: "http://firsttesturl",
      prod: "http://secondtesturl",
    },
    routes: {
      service: "/service",
      products: "/products",
    },
  });

});
