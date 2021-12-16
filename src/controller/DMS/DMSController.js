import apiUse from "../../modules/genericAPIUse";
import configuration from "../../modules/configuration";
import DMsAttachmentsScheme from "../../model/DMSAttachments";
import FormData from "form-data";
import fs from "fs";


/** <p>Controller to handle the spefizic DMS actions. Get all attachments and post new attachments. </p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module controller/DMS/DMSController
*/

export default {
  getAllAtachment: (req, res, next) => {
    apiUse.get("https://dicvhi.atlassian.net/wiki/rest/api/content/152403969/child/attachment",
        {
          "Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64"),
        },
        (statusCode, data) => {
          if (statusCode == 200) {
            DMsAttachmentsScheme.validate({results: data.results, start: data.start, limit: data.limit, size: data.size})
                .then((valid) => {
                  if (valid) {
                    res.status(200).send(JSON.stringify({results: data.results, start: data.start, limit: data.limit, size: data.size}));
                  }
                })
                .catch((err) => {
                  res.status(501).send(err.errors);
                });
          }
        });
  },
  postNewAttachment: (req, res, next) => {
    const file = fs.createReadStream("./sample.pdf");
    const form = new FormData();
    form.append("minorEdit", "true");
    form.append("comment", "test file created");
    form.append("file", file, "sample.pdf");


    apiUse.post("https://dicvhi.atlassian.net/wiki/rest/api/content/152403969/child/attachment",
        {
          "Authorization": "Basic " + Buffer.from(configuration.DMSUserEmail + ":" + configuration.DMSAPIToken).toString("base64"),
          "X-Atlassian-Token": "nocheck",
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
        form,
        (statusCode, data) => {
          if (statusCode == 200) {
            res.status(200).send(data);
          }
        });
  },
};
