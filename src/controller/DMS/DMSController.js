import apiUse from "../../modules/externalAPIs/genericAPIUse";
import configuration from "../../modules/configuration";
import logger from "../../modules/logger";

/** <p>Controller to handle the spefizic DMS actions. Get all attachments and post new attachments. </p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module controller/DMS/DMSController
*/

export default {
  getAllAtachment: (req, res, next) => {
    /* #swagger.security = [{
            "openId": []
        }] */
    const schema = yup.number().required().positive().integer();
    schema.validate(req.kauth.grant.access_token.content.DMSSite)
        .then(() => {
          apiUse.get(`${configuration.DMSUrl}/rest/api/content/${req.kauth.grant.access_token.content.DMSSite}/child/attachment`,
              {
                "Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64"),
              },
              (statusCode, data) => {
                if (statusCode == 200) {
                  DMsAttachmentsScheme.validate({results: data.results, start: data.start, limit: data.limit, size: data.size})
                      .then((valid) => {
                        if (valid) {
                          // #swagger.responses[200] = { description: 'User registered successfully.' }
                          res.status(200).send(JSON.stringify({results: data.results, start: data.start, limit: data.limit, size: data.size}));
                        }
                      })
                      .catch((err) => {
                        res.status(501).send(err.errors);
                      });
                }
              });
        })
        .catch((err) => {
          // #swagger.responses[201] = { description: 'User registered successfully.' }
          res.status(501).send(err.errors);
        });
  },
  postNewAttachment: (req, res, next) => {
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
    schema.validate(req.kauth.grant.access_token.content.DMSSite)
        .then(() => {
          const file = fs.createReadStream(req.file.path);
          const form = new FormData();
          form.append("minorEdit", "true");
          form.append("comment", "test file created");
          form.append("file", file, req.file.originalname);
          apiUse.post(`${configuration.DMSUrl}/rest/api/content/${req.kauth.grant.access_token.content.DMSSite}/child/attachment`,
              {
                "Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64"),
                "X-Atlassian-Token": "nocheck",
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
              },
              form,
              (statusCode, data) => {
                if (statusCode == 200) {
                  fs.unlink(req.file.path, () => {
                    logger.info(`File ${req.file.path} deleted!`);
                  });
                  res.status(200).send(data);
                }
              });
        })
        .catch((err) => {
          res.status(501).send(err.errors);
        });
  },

};
