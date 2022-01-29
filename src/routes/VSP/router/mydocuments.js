import express from "express";
import controller from "../controller/mydocuments";
import plausibilityCheck from "../../../modules/middleware/plausibilityCheck";
import dispatch from "../../../modules/middleware/dispatch";
import dataModelGetMyDocuments from "../../../datamodel/VSP/getMyDocuments";
import dataModelPostMyDocuments from "../../../datamodel/VSP/postMyDocuments";
import multer from "multer";
const upload = multer({dest: "uploads/", limits: {fileSize: 20971520}});
/* eslint-disable new-cap */
const router = express.Router();

/** <p>Controller to handle the spefizic DMS actions. Get all attachments and post new attachments. </p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module routes/VSP/router/mydocuments
*/

router.get("/prototype/MyDocuments", controller.getMydocuments, plausibilityCheck(dataModelGetMyDocuments), dispatch("API"));
router.post("/prototype/MyDocuments", upload.single("file" ), plausibilityCheck(dataModelPostMyDocuments), controller.postMydocuments, dispatch("API"));
export default router;
