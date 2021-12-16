/** <p>Module that reads configuration from environment or sets default values.</p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module modules/configuration
*/

/**
* @typedef {!Object} mcConfiguration
* @property {string=|"0.0.0.0"|MC_HOST} host IP-Address to start the server on
* @property {number=|8080|MC_PORT} port Port to start the server on
* @property {!string|"https://change.me"|MC_OIDC_URL} openIdConnectUrl URL for the OIDC Realm. <strong> MUST be set with environment variable </strong>
* @property {!string|"https://change.me"|MC_DMS_URL} DMSUrl URL for DMS we want to work with. <strong> MUST be set with environment variable </strong>
* @property {!string|"user@change.me"|MC_DMS_EMAIL} DMSUserEmail Login Email for the DMS <strong> MUST be set with environment variable </strong>
* @property {!string|"00000000000000000000"|MC_DMS_TOKEN} DMSAPIToken API Token for the DMS
* @property {function} reset re-reads the environment variables and gives a new object.
*/

/**
* @function setConfiguration
* @description function to reset the Environment Variables into the object. Important for tests.
* @return {object} Configuration object
*/
const setConfiguration = () => {
  const _scheme = process.env.MC_SCHEME || "http://";
  const _host = process.env.MC_HOST || "localhost";
  const _port = process.env.MC_PORT || 8080;
  return {
    scheme: _scheme,
    host: _host,
    port: _port,
    baseUrl: `${_scheme}${_host}:${_port}`,
    openIdConnectUrl: process.env.MC_OIDC_URL || "https://change.me",
    DMSUrl: process.env.MC_DMS_URL || "https://change.me",
    DMSUserEmail: process.env.MC_DMS_EMAIL || "user@change.me",
    DMSAPIToken: process.env.MC_DMS_TOKEN || "00000000000000000000",
    KCUrl: process.env.MC_KC_URL || "https://change.me",
    KCClientId: process.env.MC_KC_CLIENTID || "ChangeMe",
    KCSecretToken: process.env.MC_KC_TOKEN || "00000000000000000000",
  };
};

export default {...setConfiguration(), reset: setConfiguration};
