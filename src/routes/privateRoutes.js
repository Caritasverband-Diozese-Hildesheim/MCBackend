import session from "express-session";
import Keycloak from "keycloak-connect";
import configuration from "../modules/configuration";
import VPERoutes from "./VSP/router/mydocuments";
import confluenceSite from "../modules/externalAPIs/confluenceSite";

/** <p>Module that reads configuration from environment or sets default values.</p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module modules/privateRoutes
*/

const kcConfig = {
  "client-id": configuration.OIDCClientId,
  "auth-server-url": configuration.OIDCAuthUrl,
  "realm": configuration.OIDCRealm,
  "secret": configuration.OIDCSecretToken,
  "public-client": false,
};
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({store: memoryStore}, kcConfig);
/**
 * @function setupPrivateRoutes
 * @description Extra function so that swagger-autogen recognizes the routes
 * @param {ExpressApp} app  The App Object to configure for authentification
 */
const setupPrivateRoutes = (app) => {
  app.use(
      session({
        secret: "oidc:meincaritaskc.azurewebsites.net",
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      }),
  );

  app.use(keycloak.middleware());


  app.get("/me", keycloak.protect(), (req, res) => {
    // #swagger.ignore = true
    res.status(200).send(JSON.stringify(req.kauth.grant.access_token.content));
  });

  app.use("/VSP", keycloak.enforcer(["res_vsp:sc_view"]), VPERoutes);

  app.get("/flex", keycloak.enforcer(["res_vsp:sc_view"]), (req, res, next) => {
    // #swagger.ignore = true
    confluenceSite.readSite({id: "152403969"})
        .then((result) => {
          res.render("apiView", {data: result.data.userNotification, title: "apiView - Test"});
        });
  });
  app.get("/flex/plain", keycloak.enforcer(["res_vsp:sc_view"]), (req, res, next) => {
    /* #swagger.security = [{
            "openId": []
        }] */

    /* #swagger.responses[200] = {
            description: 'read sites as json.'
    } */
    confluenceSite.readSite({id: "152403969"})
        .then((result) => {
          res.status(result.statusCode).send(result.data.apiPayload);
        });
  });

  app.use((req, res, next) => {
    res.status(404).render("error", {error: 404});
  });
};

/**
 * @function setupAppforAuthentication
 * @description configures the Express-App to use authentification with keycloak
 * @param {ExpressApp} app  The App Object to configure for authentification
 */
export default (app) => {
        setupPrivateRoutes(app);    
};

