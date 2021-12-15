import * as yup from "yup";

/** <p> Datamodel to centralize app configuration</p>
* <p>[yup scheme]{@link https://www.npmjs.com/package/yup} to validate input</p>
* <p><strong>"Type" column explained: </p><p> data-type | enforced Rules </strong></p>
* @module datamodel/configuration
*/

/**
* @typedef {!Object} Configuration
* @property {string=|"min 4 Chars, max 256 Chars"} host IP-Address to start the server on
* @property {number=|"only positives from 1024 til 65534"} port Port to start the server on
* @property {!string|"has to be URL"} openIdConnectUrl URL for the OIDC Realm. <strong> MUST be set with environment variable </strong>
* @property {!string|"has to be URL"} DMSUrl URL for DMS we want to work with. <strong> MUST be set with environment variable </strong>
* @property {!string|"EMail"} DMSUserEmail Login Email for the DMS <strong> MUST be set with environment variable </strong>
* @property {!string|"min 4 Chars, max 256 Chars"} DMSAPIToken API Token for the DMS
*/
const scheme = yup.object().shape({
  host: yup.string().required().min(4).max(256),
  port: yup.number().required().positive().integer().min(1024).max(65534),
  openIdConnectUrl: yup.string().url().required(),
  DMSUrl: yup.string().url().required(),
  DMSUserEmail: yup.string().email().required(),
  DMSAPIToken: yup.string().required().min(20).max(256),
});

export default scheme;
