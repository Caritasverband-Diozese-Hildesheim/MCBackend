import express from 'express';
import DMSController from '../controller/DMS/DMSController';
const Router = express.Router();

/** <p>Controller to handle the spefizic DMS actions. Get all attachments and post new attachments. </p>
* <p>If the scheme validation failes the program ends.</p>
* <p><strong>"Type" column explained: </p><p> data-type | default Value | name of the environment variable</strong></p>
* @module routes/VPERoutes
*/

Router.get('/prototype/getMyDocuments', DMSController.getAllAtachment);
Router.get('/prototype/AddDocuments', DMSController.postNewAttachment);

export default Router;