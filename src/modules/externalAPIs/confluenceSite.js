import apiUse from "./genericAPIUse";
import configuration from "../configuration";
import confluenceSiteScheme from "../../model/confluenceSite";


/** Module to handle creation, modification, files uploads and deletion of confluence sites
* @module modules/externalAPIs/confluenceSite
*/

const callApiFunction = (apiMethod, apiEndpoint, apiPostData) => {
  return new Promise((resolve, reject) => {
    apiUse.use({
      method: apiMethod,
      url: `${configuration.DMSUrl}${apiEndpoint}`,
      headers: { "Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64") },
      body: apiPostData
    })
    .then((result) => {
      resolve(result);
    });
  })
}


const createSiteFunction = ({
  titleName = "Platzhalter-Titel",
  parentID = 0,
  spaceKey = "PROT",
  content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
} = {}) => {
  let postData = {
    title: titleName,
    type: "page",
    status: "current",
    space: {
      key: spaceKey,
    },
    body: {
      wiki: {
        value: content,
        representation: "wiki",
      },
    },
  };

  if (!parentID == 0) {
    postData = {
      ...postData,
      ancestors: [{
        id: parentID,
      }],
    };
  }

  return new Promise((resolve, reject) => {
    confluenceSiteScheme.createContentScheme.validate(postData)
      .then(() => {
        return callApiFunction("post", "/rest/api/content", postData);
      })
      .then((result) => {
        let message = {
          userNotification: result.data.message,
          apiPayload: {link:"error", title: "error", ...result.data}
        }
        if (result.statusCode == 200) {
          message = {
            userNotification: `Your site is created. URL: <a href="${result.data._links.base}${result.data._links.webui}">${result.data._links.base}${result.data._links.webui}</a>`,
            apiPayload: { link: `${result.data._links.base}${result.data._links.webui}`, title: result.data.title }
          }
        }
        resolve({ statusCode: result.statusCode, data: message });
      })
  })
}


export default {
  createSite: createSiteFunction
};
