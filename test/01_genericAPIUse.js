// During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import chai from "chai";
import server from "../src/modules/app";
import apiUse from "../src/modules/externalAPIs/genericAPIUse";
import nock from "nock";
const should = chai.should();
const hostname = "localhost";
const port = 5500;
let app;
// Our parent block
/*
  * Test the /GET route
  */
describe("Test generic API use functions", () => {
  before((done) => {
    if (should);
    done();
  });
  describe("GET Method", () => {
    describe("call an API and see if it works.", () => {
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .get("/resource")
            .reply(200, "{status: \"ok\"}");
        done();
      });
      it("we expect status 200 and a JSON-Object", (done) => {
        apiUse.get("http://www.example.com/resource", {})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(200);
                result.data.should.be.equal("{status: \"ok\"}");
                done();
              } catch (err) {
                done(err);
              }
            });
      });
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .get("/resource")
            .reply(200, "{status: \"ok\"}");
        done();
      });
      it("Now we do exactly the same, except with the use-method instead with the get-method directly", (done) => {
        apiUse.use({method: "get", url: "http://www.example.com/resource", headers: {}})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(200);
                result.data.should.be.equal("{status: \"ok\"}");
                done();
              } catch (err) {
                done(err);
              }
            });
      })
    });
    describe("call an API and see what happens if we get an 404 error.", () => {
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .get("/resource")
            .reply(404, "resource not found");
        done();
      });
      it("we expect status 404, a 'resource not found' response", (done) => {
        apiUse.get("http://www.example.com/resource", {})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(404);
                result.data.should.be.equal("resource not found");
                done();
              } catch (err) {
                done(err);
              }
            });
      });
    });
    describe("call an API and see what happens if we get an 500 error.", () => {
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .get("/resource")
            .reply(500, "internal server error");
        done();
      });
      it("we expect status 500, a 'internal server error' response", (done) => {
        apiUse.get("http://www.example.com/resource", {})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(500);
                result.data.should.be.equal("internal server error");
                done();
              } catch (err) {
                done(err);
              }
            });
      });
    });
  }),
  describe("POST Method", () => {
    describe("call an API and see if it works.", () => {
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .post("/resource", {username: "test", password: "test"})
            .reply(200, "{status: \"ok\"}");
        done();
      });
      it("we expect status 200 and a JSON-Object", (done) => {
        apiUse.post("http://www.example.com/resource", {}, {username: "test", password: "test"})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(200);
                result.data.should.be.equal("{status: \"ok\"}");
                done();
              } catch (err) {
                done(err);
              }
            });
      });
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .post("/resource", {username: "test", password: "test"})
            .reply(200, "{status: \"ok\"}");
        done();
      });
      it("Now we do exactly the same, except with the use-method instead with the get-method directly", (done) => {
        apiUse.use({method: "post", url: "http://www.example.com/resource", headers: {}, body: {username: "test", password: "test"}})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(200);
                result.data.should.be.equal("{status: \"ok\"}");
                done();
              } catch (err) {
                done(err);
              }
            });
      });
    });
    describe("call an API and see what happens if we get an 404 error.", () => {
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .post("/resource", {username: "test", password: "test"})
            .reply(404, "resource not found");
        done();
      });
      it("we expect status 404, a 'resource not found' response", (done) => {
        apiUse.post("http://www.example.com/resource", {}, {username: "test", password: "test"})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(404);
                result.data.should.be.equal("resource not found");
                done();
              } catch (err) {
                done(err);
              }
            });
      });
    });
    describe("call an API and see what happens if we get an 500 error.", () => {
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock("http://www.example.com")
            .post("/resource", {username: "test", password: "test"})
            .reply(500, "internal server error");
        done();
      });
      it("we expect status 500, a 'internal server error' message and an info on the console from the logger", (done) => {
        apiUse.post("http://www.example.com/resource", {}, {username: "test", password: "test"})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(500);
                result.data.should.be.equal("internal server error");
                done();
              } catch (err) {
                done(err);
              }
            });
      });
    });
  });
});
