import session from "express-session";
import Keycloak from "keycloak-connect";
import passport from "passport";
import {Issuer, Strategy} from "openid-client";
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
 * @param {ExpressApp} client  The authentification-client
 */
const setupPrivateRoutes = (app, client) => {
  app.use(
      session({
        secret: "oidc:meincaritaskc.azurewebsites.net",
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      }),
  );

  app.use(keycloak.middleware());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
      "oidc",
      new Strategy({client}, (tokenSet, userinfo, done) => {
        return done(null, tokenSet.claims());
      }),
  );

  // handles serialization and deserialization of authenticated user
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  // start logout request
  app.get("/logout", (req, res) => {
    // #swagger.ignore = true
    res.redirect(client.endSessionUrl());
  });


  // logout callback
  app.get("/logout/callback", (req, res) => {
    // #swagger.ignore = true
    // clears the persisted user from the local storage
    req.logout();
    // redirects the user to a public route
    res.redirect("/");
  });
  // start authentication request
  app.get("/auth", (req, res, next) => {
    // #swagger.ignore = true
    passport.authenticate("oidc")(req, res, next);
  });
  app.get("/login", (req, res, next) => {
    // #swagger.ignore = true
    passport.authenticate("oidc")(req, res, next);
  });

  // authentication callback
  app.get("/auth/callback", (req, res, next) => {
    // #swagger.ignore = true
    passport.authenticate("oidc", {
      successRedirect: "/me",
      failureRedirect: "/",
    })(req, res, next);
  });
  app.get("/me", keycloak.protect(), (req, res) => {
    // #swagger.ignore = true
    res.status(200).send(JSON.stringify(req.user));
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
  Issuer.discover(`${configuration.OIDCAuthUrl}/realms/${configuration.OIDCRealm}`)
      .then((criiptoIssuer) => {
        const client = new criiptoIssuer.Client({
        /* eslint-disable camelcase */
          client_id: configuration.OIDCClientId,
          client_secret: configuration.OIDCSecretToken,
          redirect_uris: [configuration.OIDCRedirectUrlCallback],
          post_logout_redirect_uris: [configuration.OIDCRedirectUrlLogout],
          token_endpoint_auth_method: "client_secret_post",
        });
        setupPrivateRoutes(app, client);
      });
};

