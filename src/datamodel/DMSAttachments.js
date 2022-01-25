import * as yup from "yup";

/** <p> Datamodel to centralize app configuration</p>
* <p>[yup scheme]{@link https://www.npmjs.com/package/yup} to validate input</p>
* <p><strong>"Type" column explained: </p><p> data-type | enforced Rules </strong></p>
* @module datamodel/DMSAttachments
*/

/**
* @typedef {!Object} Attachments-List from the DMS
* @property {!number|"only positives"} start offset from where the results starts
* @property {!number|"only positives"} limit maximal sent of results
* @property {!number|"only positives"} size actual numbers of attachments
*/
const scheme = yup.object().shape({
  results: yup.array().required(),
  start: yup.number().required().integer(),
  limit: yup.number().required().integer(),
  size: yup.number().required().integer(),
});

export default scheme;
