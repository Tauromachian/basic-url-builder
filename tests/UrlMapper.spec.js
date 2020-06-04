const chai = require("chai");
const expect = chai.expect;
chai.should();

const UrlMapper = require("../src/UrlMapper");
const UrlBuilder = require("../src/UrlBuilder");

describe("Url Mapper.js", function () {
  it("Should exist", function () {
    expect(UrlMapper).to.exist;
  });

  UrlMapper.map({
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
