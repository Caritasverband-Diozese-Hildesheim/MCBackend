import apiUse from "./genericAPIUse";
import configuration from "../configuration";
import confluenceSiteScheme from "../../model/confluenceSite";


/** Module to handle creation, modification, files uploads and deletion of confluence sites
* @module modules/externalAPIs/confluenceSite
*/
export default {
  createSite: ({
    titleName = "Platzhalter-Titel",
    parentID = 0,
    spaceKey = "PROT",
    content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`} = {}) => {
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
            return apiUse.post(`${configuration.DMSUrl}/rest/api/content`,
                {"Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64")},
                postData);
          })
          .then((result) => {
            let message = {
              userNotification: result.data.message,
              apiPayload: result.data
            }
            if (result.statusCode==200){ 
              message = {
                userNotification: `Your site is created. URL: <a href="${result.data._links.base}${result.data._links.webui}">${result.data._links.base}${result.data._links.webui}</a>`, 
                apiPayload: {link: `${result.data._links.base}${result.data._links.webui}`}}
            }
            else {
              
            }
            resolve({statusCode: result.statusCode, data: message} );
          });
    });
  },
};
