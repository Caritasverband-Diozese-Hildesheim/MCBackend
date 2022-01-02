import * as yup from "yup";

/** <p> Datamodel to centralize app configuration</p>
* <p>[yup scheme]{@link https://www.npmjs.com/package/yup} to validate input</p>
* <p><strong>"Type" column explained: </p><p> data-type | enforced Rules </strong></p>
* @module datamodel/configuration
*/

/**
* @typedef {!Object} Configuration
* @property {string=|"http:// or https://"} scheme is it secure HTTP or not.
* @property {string=|"IP-Adress or 'localhost'"} host IP-Address or "localhost" to start the server on
* @property {number=|"only positives from 1024 til 65534"} port Port to start the server on
* @property {!string|"has to be an URL"} externalUrl If the external URL differs the baseUrl, we need to define it.<strong> MUST be set with environment variable </strong>
* @property {!string|"has to be an URL"} baseUrl Root URL of the app. <strong>Automatically generated from scheme, host, port</strong>
* @property {!string|"has to be an URL"} DMSUrl URL for DMS we want to work with.<strong> MUST be set with environment variable</strong>
* @property {!string|"EMail"} DMSUserEmail Login Email for the DMS <strong> MUST be set with environment variable </strong>
* @property {!string|"min 20 Chars, max 60 Chars"} DMSAPIToken API Token for the DMS. <strong>MUST be set with environment variable</strong>
* @property {!string|"has to be an URL"} OIDCAuthUrl Root URL of the OID Server. <strong>MUST be set with environment variable</strong>
* @property {!string|"min 4 Chars, max 60 Chars"} OIDCRealm Server Realm-Name of the OID Server. <strong>MUST be set with environment variable</strong>
* @property {!string|"min 4 Chars, max 60 Chars"} OIDCCientId Client ID to identify with on the OIDC Server.<strong> MUST be set with environment variable </strong>
* @property {!string|"min 20 Chars, max 60 Chars"} OIDCSecretToken Secret Token to identify with on the OIDC Server.<strong> MUST be set with environment variable </strong>
* @property {!string|"has to be an URL"} OIDCRedirectUrlCallback URL to be redirected for the OIDC Callback <strong> MUST be set with environment variable </strong>
* @property {!string|"has to be an URL"} OIDCRedirectUrlLogout URL to be redirected after logout <strong> MUST be set with environment variable </strong>
*/
const scheme = yup.object().shape({
  scheme: yup.string().required().matches(/(https?:\/\/)/, { excludeEmptyString: true }),
  host: yup.string().required().matches(
    /((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost)/,
    { excludeEmptyString: true }),
  port: yup.number().required().positive().integer().min(1024).max(65534),
  externalUrl: yup.string().required().matches(
    /https?:\/\/((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost:?[0-9]{0,5})/,
    { excludeEmptyString: true }),
  baseUrl: yup.string().required().matches(
    /https?:\/\/((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost:?[0-9]{0,5})/,
    { excludeEmptyString: true }),
  DMSUrl: yup.string().url().required(),
  DMSUserEmail: yup.string().email().required(),
  DMSAPIToken: yup.string().required().min(20).max(60),
  OIDCAuthUrl: yup.string().url().required(),
  OIDCRealm: yup.string().required().min(4).max(60),
  OIDCClientId: yup.string().required().min(4).max(60),
  OIDCSecretToken: yup.string().required().min(20).max(60),
  OIDCRedirectUrlCallback: yup.string().required().matches(
    /https?:\/\/((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost:?[0-9]{0,5})/,
    { excludeEmptyString: true }),
  OIDCRedirectUrlLogout: yup.string().required().matches(
    /https?:\/\/((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|localhost:?[0-9]{0,5})/,
    { excludeEmptyString: true }),
});

export default scheme;
