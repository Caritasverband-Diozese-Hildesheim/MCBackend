import express from "express";
import DMSController from "../controller/DMS/DMSController";
/* eslint-disable new-cap */
const router = express.Router();

/** <p>Controller to handle the spefizic DMS actions. Get all attachments and post new attachments. </p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module routes/VPERoutes
*/

router.get("/prototype/getMyDocuments", DMSController.getAllAtachment);
router.get("/prototype/AddDocuments", DMSController.postNewAttachment);

export default router;
