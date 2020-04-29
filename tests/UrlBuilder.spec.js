const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const UrlBuilder = require("./../UrlBuilder");

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
});