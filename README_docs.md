# MCBackend #

This is the middleware for Mein Caritas.

it does

- sanity check from external APIs
- sanity correction from external APIs
- sends always consistent a data-modell
- simplify external API
- Authentication and authentification over [keycloak](https://www.keycloak.org)

## Installation ##

See [Installation](tutorial-installation.html)

## Structure ##

The structure is based on [Model-View-Controller](ttps://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

## Entrypoint ##

We also use [index.js](/code-docs/module-index.html) as entrypoint.

## Model ##

Our datamodels protect themself from false data and you always can check if the input is correct. Every datamodel exports itself as a [YUP-scheme](https://www.npmjs.com/package/yup). So we can guarantee, that the data always is correct before sending is out to user or external API.

- [configuration](module-datamodel_configuration.html)
- [confluenceSite](module-datamodel_confluenceSite.html)
- [DMSAttachments](module-datamodel_DMSAttachments.html)

## View ##

The views are just [ejs-templates](https://ejs.co/). Those are just HTML-Template where data can be substituted.

- [apiView](views/apiView.ejs) - defines a human-readable view of data. For presentation only
- [error](views/error.ejs) - default View for every error (404, 401, etc).
- [index](views/index.ejs) - Welcome site if it happens that someone landet here with a browser. Always be nice.

## Controller ##

Everytime you use a URL (a route) a controller decides what to do.
The controllers are relying on modules and he calls them. We want to keep the controllers simple. So, all the heavy lifting comes from modules.

- [DMSController](/code-docs/module-controller_DMS_DMSController.html)

## Modules ##

The modules always exports complete javscript objects in ECMAScript 2015 or short ES6 ([Overview over ES6](https://www.w3schools.com/js/js_es6.asp)), ([technical description of ES6](https://262.ecma-international.org/6.0/))

### general modules ###

Modules for internal use

- [app](/code-docs/modules_app.js.html): initializes the application as [expressjs](https://expressjs.com/de/) application and configures all middleware
- [configuration](/code-docs/modules_configuration.js.html): pusht values from the evironment variables into the datamodel. **Use that to get the app configuration**
- [cors](/code-docs/modules_cors.js.html): this module handle the configuration for [CORS](https://developer.mozilla.org/de/docs/Web/HTTP/CORS). Meaning the definition who is allowed to connect to us
- [logger](/code-docs/modules_logger.js.html): Global Initialization for automated and colorful console-logging.
- [swagger](/code-docs/modules_swagger.js.html): Automation for API-documentation.
- [privateRoutes](/code-docs/modules_privateRoutes.js.html): sets up the URLs that are not public. To use them, you must be authenticated.
- [Routes](/code-docs/modules_routes.js.html): sets up all public routes. for detail, see under "Public routes".

### modules for external APIs ###

Logical order for modules specificly to handle external APIs.

- [genericAPIUse](/code-docs/modules_externalAPIs_genericAPIUse.js.html): Used for every API-Call. **It doesn't generate errors, it just log them**
- [confluenceSite](/code-docs/model_confluenceSite.js.html)

### modules as middleware for express ###

Middleware-Modules are called on every request, no matter the path.

- [promClient](public/code-docs/modules_promClient.js.html): creates measurements for prometheus and exports them

## Routes ##

### Public routes ###

Public routes are URLs available for everyone (with authentication) and defined in the module [routes.js](public/code-docs/module-modules_routes.html).
Those URL are:

- [/](/): Welcome / Landing-Page
- [/api-docs](/api-docs): swagger-documentation of all our APIs
- [/code-docs](/code-docs): code-documentation. You are here.
- [/metrics](/metrics): exports measurements for our prometheus

### Private routes ###

Private routes are URL protected by a authentication mechanism. All our private routes are APIs. So they are documented in [swagger](/api-docs).
