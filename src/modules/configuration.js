/** <p>Module that reads configuration from environment or sets default values.</p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module modules/configuration
*/

/**
* @typedef {!Object} mcConfiguration
* @property {string=|"0.0.0.0"|MC_HOST} host IP-Address to start the server on
* @property {number=|5000|MC_PORT} port Port to start the server on
* @property {!string|"https://change.me"|MC_EXT_URL} externalUrl If the external URL differs the baseUrl, we need to define it.<strong> MUST be set with environment variable </strong>
* @property {!string|"https://change.me"|MC_DMS_URL} DMSUrl URL for DMS we want to work with. <strong> MUST be set with environment variable </strong>
* @property {!string|"user@change.me"|MC_DMS_EMAIL} DMSUserEmail Login Email for the DMS <strong> MUST be set with environment variable </strong>
* @property {!string|"00000000000000000000"|MC_DMS_TOKEN} DMSAPIToken API Token for the DMS
* @property {!string|"https://change.me"|MC_OIDC_URL} OIDCAuthUrl URL for DMS we want to work with. <strong> MUST be set with environment variable </strong>
* @property {!string|"ChangeMe"|MC_OIDC_REALM} OIDCRealm Server Realm-Name of the OID Server. <strong>MUST be set with environment variable</strong>
* @property {!string|"ChangeMe"|MC_OIDC_CLIENTID} OIDCCientId Client ID to identify with on the OIDC Server.<strong> MUST be set with environment variable </strong>
* @property {!string|"00000000000000000000"|MC_OIDC_TOKEN} OIDCSecretToken Secret Token to identify with on the OIDC Server.<strong> MUST be set with environment variable </strong>
* @property {!string|"https://change.me"|MC_OIDC_RDIURL_CB} OIDCRedirectUrlCallback URL for DMS we want to work with. <strong> MUST be set with environment variable </strong>
* @property {!string|"https://change.me"|MC_OIDC_RDIURL_LO} OIDCRedirectUrlLogout URL for DMS we want to work with. <strong> MUST be set with environment variable </strong>
* @property {function} reset re-reads the environment variables and gives a new object.
*/

/**
* @function setConfiguration
* @description function to reset the Environment Variables into the object. Important for tests.
* @return {object} Configuration object
*/
const setConfiguration = () => {
  const _scheme = process.env.MC_SCHEME || "http";
  const _host = process.env.MC_HOST || "0.0.0.0";
  const _port = process.env.MC_PORT || 5000;

  return {
    scheme: _scheme,
    host: _host,
    port: _port,
    externalUrl: process.env.MC_EXT_URL || `${_scheme}://${_host}:${_port}`,
    baseUrl: `${_scheme}://${_host}:${_port}`,
    DMSUrl: process.env.MC_DMS_URL || "https://change.me",
    DMSUserEmail: process.env.MC_DMS_EMAIL || "user@change.me",
    DMSAPIToken: process.env.MC_DMS_TOKEN || "00000000000000000000",
    OIDCAuthUrl: process.env.MC_OIDC_URL || "https://change.me",
    OIDCRealm: process.env.MC_OIDC_REALM || "ChangeMe",
    OIDCClientId: process.env.MC_OIDC_CLIENTID || "ChangeMe",
    OIDCSecretToken: process.env.MC_OIDC_TOKEN || "00000000000000000000",
    OIDCRedirectUrlCallback: process.env.MC_OIDC_RDIURL_CB || "https://change.me",
    OIDCRedirectUrlLogout: process.env.MC_OIDC_RDIURL_LO || "https://change.me",
  };
};

export default {...setConfiguration(), reset: setConfiguration};
