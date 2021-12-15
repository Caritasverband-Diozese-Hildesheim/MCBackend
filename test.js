// During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
const should = chai.should();
import server from "../src/server";
const hostname = "localhost";
const port = 8080;

chai.use(chaiHttp);
// Our parent block
/*
  * Test the /GET route
  */
describe("Test", () => {
  before((done) => {
    server.listen(port, hostname);
    if (should);
    done();
  });
  describe("/GET /", () => {
    it("it should GET a Hello World", (done) => {
      chai.request("http://localhost:8080")
          .get("/")
          .end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.html;
            res.text.should.be.equal(
                "<html><body><h1>Hello, World!</h1></body></html>",
            );
            done();
          });
    });
  });
});
