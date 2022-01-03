import * as yup from "yup";

/** <p>Datamodel to handle creation, read, modification and deletion of a page</p>
* <p>[yup scheme]{@link https://www.npmjs.com/package/yup} to validate input</p>
* <p><strong>"Type" column explained: </p><p> data-type | enforced Rules </strong></p>
* @module datamodel/confluenceSite
*/

/**
* @typedef {!Object} createContent from the DMS
* @property {!string|"min 4 Chars, max 60 Chars"} title the title for the page
* @property {!string|"Value has to be 'page'"} type only 'page' as this state
* @property {!string|"Value has to be 'current'"} status only 'current' as this state. Later drafts will be possible
* @property {array=|"Array of object"} ancestors just an array
* @property {object=|"anonymous"} ancestors.anonymous
* @property {string=|"Number as string"} ancestors.anonymous.id Identification of the parent site
* @property {!object|"required"} space Object that holds information about the space where the page should be created in
* @property {!string|"min 3 Chars, max 10 Chars"} space.key String that holds the space-key where the page should be created in
* @property {!object|"required"} body Object that holds the content for the body of the page
* @property {!object|"required"} body.wiki Object that holds the content for the body of the page <strong>only wiki mode accepted in this state</strong>
* @property {!string|"required"} body.wiki.value The actual content of the page.
* @property {!string|"Value has to be 'wiki'"} body.wiki.representation only 'page' as this state
*/
const createContentScheme = yup.object().shape({
  "title": yup.string().required().min(4).max(200),
  "type": yup.string().required().matches(/page/),
  "status": yup.string().required().matches(/current/),
  "ancestors": yup.array().of(yup.object().shape({
    "id": yup.string(),
  })),
  "space": yup.object().shape({
    "key": yup.string().required().min(3).max(10),
  }),
  "body": yup.object().shape({
    "wiki": yup.object().shape({
      "value": yup.string().required(),
      "representation": yup.string().required().matches(/wiki/),
    }),
  }),
});

export default {
  createContentScheme: createContentScheme,
};
