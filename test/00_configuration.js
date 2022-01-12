// During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import chai from "chai";
import configuration from "../src/modules/configuration";
import configScheme from "../src/model/configuration";
const should = chai.should();
// Our parent block
/*
  * Test the /GET route
  */
describe("Test Configuration with Environment Variables", () => {
  before((done) => {
    process.env.MC_SCHEME = "http";
    process.env.MC_HOST = "127.0.0.1";
    process.env.MC_PORT = 8080;
    process.env.MC_OIDC_URL = "http://example.com";
    process.env.MC_DMS_URL = "http://example.com";
    process.env.MC_DMS_EMAIL="user@example.com";
    process.env.MC_DMS_TOKEN="randomValueToFitWith20Chars";
    process.env.MC_OIDC_CLIENTID="a_name";
    process.env.MC_OIDC_TOKEN="randomValueToFitWith20Chars";
    process.env.MC_OIDC_URL="https://www.example.com";
    process.env.MC_OIDC_REALM="a_name";
    process.env.MC_EXT_URL="https://www.example.com";
    process.env.MC_OIDC_RDIURL_CB="https://www.example.com/callback";
    process.env.MC_OIDC_RDIURL_LO="https://www.example.com/logout/callback";
    if (should);
    done();
  });

  it("configuration scheme should be valid, if everything is as expected.", (done) => {
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
