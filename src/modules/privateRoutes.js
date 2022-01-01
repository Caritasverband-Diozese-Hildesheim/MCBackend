import session from "express-session";
import cookieParser from "cookie-parser";
import Keycloak from "keycloak-connect";
import passport from "passport";
import {Issuer, Strategy} from "openid-client";
import configuration from "./configuration";
import VPERoutes from "../routes/VSPRoutes";
import { custom } from 'openid-client';

 Issuer.defaultHttpOptions = {
  baseURL: "https://mcbackend.caritas-dicvhildesheim.de",
  timeout: 5000,
 };

/** <p>Module that reads configuration from environment or sets default values.</p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module modules/auth
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
 * @function setupAppforAuthentication
 * @description configures the Express-App to use authentification with keycloak
 * @param {ExpressApp} app  The App Object to configure for authentification
 */
export default (app) => {
  app.use(cookieParser());
  Issuer.discover(`${configuration.OIDCAuthUrl}/realms/${configuration.OIDCRealm}`)
      .then((criiptoIssuer) => {
        const client = new criiptoIssuer.Client({
          /* eslint-disable camelcase */
          client_id: configuration.OIDCClientId,
          client_secret: configuration.OIDCSecretToken,
          redirect_uris: ['https://mcbackend.caritas-dicvhildesheim.de/auth/callback'],
          post_logout_redirect_uris: ['https://mcbackend.caritas-dicvhildesheim.de/logout/callback'],
          token_endpoint_auth_method: "client_secret_post",
        });

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
          res.redirect(client.endSessionUrl());
        });


        // logout callback
        app.get("/logout/callback", (req, res) => {
          // clears the persisted user from the local storage
          req.logout();
          // redirects the user to a public route
          res.redirect("https://mcbackend.caritas-dicvhildesheim.de/");
        });
        // start authentication request
        app.get("/auth", (req, res, next) => {
          passport.authenticate("oidc")(req, res, next);
        });
        app.get("/login", (req, res, next) => {
          passport.authenticate("oidc")(req, res, next);
        });

        // authentication callback
        app.get("/auth/callback", (req, res, next) => {
          passport.authenticate("oidc", {
            successRedirect: "https://mcbackend.caritas-dicvhildesheim.de/me",
            failureRedirect: "https://mcbackend.caritas-dicvhildesheim.de/",
          })(req, res, next);
        });
        app.get("/me", keycloak.protect(), (req, res) => {
          res.status(200).send(JSON.stringify(req.user));
        });

        app.use("/VSP", keycloak.enforcer(["res_vsp:sc_view"]), VPERoutes);
      });
};


