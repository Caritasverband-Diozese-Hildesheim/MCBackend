/** Required middleware layer to check if the data is plausibel against the defined datamodel
* @module module/middleware/plausibilityCheck
*/


export default (dataModel) => {
  return (req, res, next) => {
    if (req.method === "GET") {
      if (res.local === undefined) {
        next();
        return;
      }
      if (res.local.externalAPIData === undefined) {
        next();
        return;
      }
    }

    res.local = {
      datamodel: {
        valid: true,
        err: {},
      },
    };
    if (req.method === "POST") {
      res.local.userData = req.body;
      dataModel.validate(res.local.userData, {abortEarly: false})
          .then(() => {
            next();
          })
          .catch((err) => {
            res.local.datamodel.valid = false;
            res.local.datamodel.err = err.errors.join("\r\n");
            next();
          });
    } else if (req.method === "GET") {
      dataModel.validate(res.local.externalAPIData, {abortEarly: false})
          .then(() => {
            next();
          })
          .catch((err) => {
            res.local.datamodel.valid = false;
            res.local.datamodel.err = err.errors.join("\r\n");
            next();
          });
    } else {
      next();
    }
  };
};
