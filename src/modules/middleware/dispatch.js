/**
* Last middleware layer that controlls the plausibility result and sends it to the client
* All data must be prepared as:
* res.local.datamodel.valid (was the plausibility check successfull), 
* res.local.datamodel.err (why the plausibility check failed) and 
* res.local.originalData (non transformed data)
* @module module/middleware/dispatch
**/
export default (outputType) => {
    return (req, res, next) => {
        let output = "";
        if (res.local === undefined || res.local.datamodel === undefined) {
            res.status(500).send("Internal Server Error;");
            return;
        }
        if (req.method === 'GET') {
            if (res.local.externalAPIData === undefined) {
                res.status(403).send("No data from external API;");
                return;
            }
           
        }
        if (req.method === 'POST') {
            if (res.local.userData === undefined) {
                res.status(403).send("No data in post request;");
                return;
            }
        }
        output = res.local.externalAPIData.apiPayload;
        if (outputType.toUpperCase() === "USER") output = res.local.externalAPIData.userNotification;
        if (res.local.datamodel.valid === true) res.status(200).send(output);
        if (res.local.datamodel.valid === false) res.status(403).send(
            `<pre>Data not valid. 
Errors: ${res.local.datamodel.err}
Original data: ${JSON.stringify(res.local.originalData)}</pre>`
        );
    }
}