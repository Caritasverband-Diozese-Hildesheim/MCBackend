import * as yup from 'yup';
import logger from '../modules/logger'
import configScheme from '../model/configuration'

/**<p>Module that reads configuration from environment or sets default values.</p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module modules/configuration
*/

/**
* @typedef {!Object} mcConfiguration
* @property {string=|"0.0.0.0"|MC_HOST} host IP-Address to start the server on
* @property {number=|8080|MC_PORT} port Port to start the server on
* @property {!string|""|MC_OIDC_URL} openIdConnectUrl URL for the OIDC Realm. <strong> MUST be set with environment variable </strong>
*/
const mcConfiguration = {
  host: process.env.MC_HOST || "0.0.0.0",
  port: process.env.MC_PORT || 900,
  openIdConnectUrl : process.env.MC_OIDC_URL || "",
};
/**
* also exports [yup scheme]{@link https://www.npmjs.com/package/yup} to validate input
*/

if (!configScheme.isValidSync(mcConfiguration))
{
    configScheme.validate(mcConfiguration).catch(function (err) {
    logger.log({
      level: 'error',
      message: 'App Configuration failure:\r\n' + err.errors + "\r\nExiting.\r\n"
    })
    process.exit(1);  
  });
  
}

export default mcConfiguration;