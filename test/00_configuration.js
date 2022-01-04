// During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import chai from "chai";
import server from "../src/modules/app";
import configuration from "../src/modules/configuration";
import configScheme from "../src/model/configuration";
const should = chai.should();
const hostname = "localhost";
const port = 5000;

// Our parent block
/*
  * Test the /GET route
  */
describe("Test Configuration with Environment Variables", () => {
  before((done) => {
    server.listen(port, hostname);
    if (should);
    done();
  });

  it("configuration scheme should be valid, if everything is as expected.", (done) => {
    process.env.MC_SCHEME = "http://";
    process.env.MC_HOST = "127.0.0.1";
    process.env.MC_PORT = 8080;
    process.env.MC_OIDC_URL = "http://example.com";
    process.env.MC_DMS_URL = "http://example.com";
    configScheme.isValidSync(configuration.reset()).should.be.true;
    done();
  });

  it("configuration scheme shouldn't be valid, if port is set too low.", (done) => {
    process.env.MC_PORT = 80;
    configScheme.isValidSync(configuration.reset()).should.be.false;
    done();
  });

  it("configuration scheme shouldn't be valid, if port is set too high.", (done) => {
    process.env.MC_PORT = 99999999;
    configScheme.isValidSync(configuration.reset()).should.be.false;
    done();
  });

  it("configuration scheme shouldn't be valid, if hostname has too few characters.", (done) => {
    process.env.MC_HOST = "few";
    configScheme.isValidSync(configuration.reset()).should.be.false;
    done();
  });

  it("configuration scheme shouldn't be valid, if hostname has too many characters.", (done) => {
    process.env.MC_HOST = `dllvbimufcarepucfjxwakmfvomuklxuswpwjdxkmgslwdxwimmsuuwavjmicthneknpsdcmzbhgsg 
                           bibpmjbdlsxydnjxbxnwtsczlvfklxndutbjjwnrykjgklachqdkizoamuevrtuzrsaipetduwniok  
                           siwogzogksksjtvmvmrucqujnvicrunxyylvvkipsrjgqnjhmqqmotatizvjmaaevrepmbakpvgsoi  
                           cpmazlwbluqnecmixtscqvdsewxizvwmdzggjmavpwngebrklwigevfcaqwfojrjlc`;
    configScheme.isValidSync(configuration.reset()).should.be.false;
    done();
  });

  it("configuration scheme shouldn't be valid, if the OIDC URL is not a valid URL", (done) => {
    process.env.MC_OIDC_URL = "not.an.URL";
    configScheme.isValidSync(configuration.reset()).should.be.false;
    done();
  });

  it("configuration scheme shouldn't be valid, if the DMS URL is not a valid URL", (done) => {
    process.env.MC_DMS_URL = "not.an.URL";
    configScheme.isValidSync(configuration.reset()).should.be.false;
    done();
  });
});
