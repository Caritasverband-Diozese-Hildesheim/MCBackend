import * as yup from "yup";
import confluenceSite from "../../../modules/externalAPIs/confluenceSite";
import fs from "fs";
import FormData from "form-data";
import logger from "../../../modules/logger";


/**
* This controls the way we can get attachments from Confluence.
* @module routes/VSP/controller/mydocuments
**/

/**
* @function getMydocuments
* @description description
* @param {object} req request-object. All Headers and other information (like body within POST-Requests).
* @param {object} res respond-object. Object to handle send status and to send messages.
* @param {function} next calls the next function (if any and <strong>no information was yet to send to the users browser. Just for middleware-functions</strong>.
**/
const getMydocuments = (req, res, next) => {
  if (req.kauth !== undefined) {
    const schema = yup.number().required().positive().integer();
    schema.validate(req.kauth.grant.access_token.content.DMSSite)
        .then(() => {
          confluenceSite.getAttachments({id: req.kauth.grant.access_token.content.DMSSite})
              .then((result) => {
                res.local = {
                  externalAPIData: result.data,
                };
                next();
              });
        });
  } else {
    next();
  }
};

/**
* @function postMydocuments
* @description description
* @param {object} req request-object. All Headers and other information (like body within POST-Requests).
* @param {object} res respond-object. Object to handle send status and to send messages.
* @param {function} next calls the next function (if any and <strong>no information was yet to send to the users browser. Just for middleware-functions</strong>.
**/
const postMydocuments = (req, res, next) => {
  /* #swagger.security = [{
             "openId": []
         }] */

  /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                         fileName: {
                           type: "string",
                           format: "binary"
                         }
                        }
                  },
                }
            }
        }
      */


  const schema = yup.number().required().positive().integer();
  if (req.kauth !== undefined) {
    schema.validate(req.kauth.grant.access_token.content.DMSSite)
        .then(() => {
          const file = fs.createReadStream(req.file.path);
          const form = new FormData();
          form.append("minorEdit", "true");
          form.append("comment", "test file created");
          form.append("file", file, req.file.originalname);
          confluenceSite.postAttachments({id: req.kauth.grant.access_token.content.DMSSite, formData: form, formBoundaries: form._boundary})
              .then((result) => {
                if (result.statusCode == 200) {
                  fs.unlink(req.file.path, () => {
                    logger.info(`File ${req.file.path} deleted!`);
                  });
                  res.local.externalAPIData= result.data;

                  next();
                }
              });
        });
  } else {
    next();
  }
};


export default {
  getMydocuments: getMydocuments,
  postMydocuments: postMydocuments,
};
