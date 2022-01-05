// During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import chai from "chai";
import configuration from "../src/modules/configuration";
import nock from "nock";
import confluenceSite from "../src/modules/externalAPIs/confluenceSite";
// import logger from "../src/modules/logger";
const should = chai.should();

// Our parent block
/*
 * Test the /GET route
 */
describe("Test handling of confluence sites", () => {
  before((done) => {
    if (should);
    done();
  });
  describe("First we create a Site.", () => {
    before((done) => {
      /* eslint-disable no-unused-vars */
      const scope = nock(configuration.DMSUrl)
          .post("/rest/api/content")
          .reply(200, JSON.parse(`{
    "id": "153419777",
    "type": "page",
    "status": "current",
    "title": "Platzhalter-Titel",
    "space": {
        "id": 152141831,
        "key": "PROT",
        "name": "prototype",
        "type": "global",
        "status": "current",
        "_expandable": {
            "settings": "/rest/api/space/PROT/settings",
            "metadata": "",
            "operations": "",
            "lookAndFeel": "/rest/api/settings/lookandfeel?spaceKey=PROT",
            "identifiers": "",
            "permissions": "",
            "icon": "",
            "description": "",
            "theme": "/rest/api/space/PROT/theme",
            "history": "",
            "homepage": "/rest/api/content/152141923"
        },
        "_links": {
            "webui": "/spaces/PROT",
            "self": "${configuration.DMSUrl}/rest/api/space/PROT"
        }
    },
    "history": {
        "latest": true,
        "createdBy": {
            "type": "known",
            "accountId": "5d4013387c8ce90da7ce18b9",
            "accountType": "atlassian",
            "email": "bjoern.meier@gmail.com",
            "publicName": "Björn Meier",
            "timeZone": "UTC",
            "profilePicture": {
                "path": "/wiki/aa-avatar/5d4013387c8ce90da7ce18b9",
                "width": 48,
                "height": 48,
                "isDefault": false
            },
            "displayName": "Björn Meier",
            "isExternalCollaborator": false,
            "_expandable": {
                "operations": "",
                "personalSpace": ""
            },
            "_links": {
                "self": "${configuration.DMSUrl}/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
            }
        },
        "createdDate": "2022-01-03T12:45:16.192Z",
        "_expandable": {
            "lastUpdated": "",
            "previousVersion": "",
            "contributors": "",
            "nextVersion": ""
        },
        "_links": {
            "self": "${configuration.DMSUrl}/wiki/rest/api/content/153419777/history"
        }
    },
    "version": {
        "by": {
            "type": "known",
            "accountId": "5d4013387c8ce90da7ce18b9",
            "accountType": "atlassian",
            "email": "bjoern.meier@gmail.com",
            "publicName": "Björn Meier",
            "timeZone": "UTC",
            "profilePicture": {
                "path": "/wiki/aa-avatar/5d4013387c8ce90da7ce18b9",
                "width": 48,
                "height": 48,
                "isDefault": false
            },
            "displayName": "Björn Meier",
            "isExternalCollaborator": false,
            "_expandable": {
                "operations": "",
                "personalSpace": ""
            },
            "_links": {
                "self": "${configuration.DMSUrl}/wiki/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
            }
        },
        "when": "2022-01-03T12:45:16.192Z",
        "friendlyWhen": "vor Kurzem",
        "message": "",
        "number": 1,
        "minorEdit": false,
        "confRev": "confluence$content$153419777.2",
        "contentTypeModified": false,
        "_expandable": {
            "collaborators": "",
            "content": "/rest/api/content/153419777"
        },
        "_links": {
            "self": "${configuration.DMSUrl}/wiki/rest/api/content/153419777/version/1"
        }
    },
    "ancestors": [
        {
            "id": "152141923",
            "type": "page",
            "status": "current",
            "title": "prototype Home",
            "macroRenderedOutput": {},
            "extensions": {
                "position": 721
            },
            "_expandable": {
                "container": "/rest/api/space/PROT",
                "metadata": "",
                "restrictions": "/rest/api/content/152141923/restriction/byOperation",
                "history": "/rest/api/content/152141923/history",
                "body": "",
                "version": "",
                "descendants": "/rest/api/content/152141923/descendant",
                "space": "/rest/api/space/PROT",
                "childTypes": "",
                "operations": "",
                "schedulePublishDate": "",
                "children": "/rest/api/content/152141923/child",
                "ancestors": ""
            },
            "_links": {
                "self": "${configuration.DMSUrl}/wiki/rest/api/content/152141923",
                "tinyui": "/x/Y4ARCQ",
                "editui": "/pages/resumedraft.action?draftId=152141923",
                "webui": "/spaces/PROT/overview"
            }
        }
    ],
    "container": {
        "id": 152141831,
        "key": "PROT",
        "name": "prototype",
        "type": "global",
        "status": "current",
        "history": {
            "createdBy": {
                "type": "known",
                "accountId": "5d4013387c8ce90da7ce18b9",
                "accountType": "atlassian",
                "email": "bjoern.meier@gmail.com",
                "publicName": "Björn Meier",
                "timeZone": "UTC",
                "profilePicture": {
                    "path": "/wiki/aa-avatar/5d4013387c8ce90da7ce18b9",
                    "width": 48,
                    "height": 48,
                    "isDefault": false
                },
                "displayName": "Björn Meier",
                "isExternalCollaborator": false,
                "_expandable": {
                    "operations": "",
                    "personalSpace": ""
                },
                "_links": {
                    "self": "${configuration.DMSUrl}/wiki/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
                }
            },
            "createdDate": "2021-12-15T17:20:50.560Z"
        },
        "_expandable": {
            "settings": "/rest/api/space/PROT/settings",
            "metadata": "",
            "operations": "",
            "lookAndFeel": "/rest/api/settings/lookandfeel?spaceKey=PROT",
            "identifiers": "",
            "permissions": "",
            "icon": "",
            "description": "",
            "theme": "/rest/api/space/PROT/theme",
            "homepage": "/rest/api/content/152141923"
        },
        "_links": {
            "webui": "/spaces/PROT",
            "self": "${configuration.DMSUrl}/wiki/rest/api/space/PROT"
        }
    },
    "macroRenderedOutput": {},
    "body": {
        "storage": {
            "value": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>",
            "representation": "storage",
            "embeddedContent": [],
            "_expandable": {
                "content": "/rest/api/content/153419777"
            }
        },
        "_expandable": {
            "editor": "",
            "atlas_doc_format": "",
            "view": "",
            "export_view": "",
            "styled_view": "",
            "dynamic": "",
            "editor2": "",
            "anonymous_export_view": ""
        }
    },
    "extensions": {
        "position": 461303248
    },
    "_expandable": {
        "childTypes": "",
        "metadata": "",
        "operations": "",
        "schedulePublishDate": "",
        "children": "/rest/api/content/153419777/child",
        "restrictions": "/rest/api/content/153419777/restriction/byOperation",
        "descendants": "/rest/api/content/153419777/descendant"
    },
    "_links": {
        "editui": "/pages/resumedraft.action?draftId=153419777",
        "webui": "/spaces/PROT/pages/153419777/Platzhalter-Titel",
        "context": "/wiki",
        "self": "${configuration.DMSUrl}/wiki/rest/api/content/153419777",
        "tinyui": "/x/AQAlCQ",
        "collection": "/rest/api/content",
        "base": "${configuration.DMSUrl}/wiki"
    }
}`));
      done();
    });
    it(`we expecting a status-code 200 a response that says title is 'Platzhalter-Titel' and our link for the new page 
    is ${configuration.DMSUrl}/spaces/PROT/pages/153419777/Platzhalter-Titel`, (done) => {
      confluenceSite.createSite()
          .then((result) => {
            try {
              result.statusCode.should.be.equal(200);
              result.data.apiPayload.title.should.be.equal("Platzhalter-Titel");
              result.data.apiPayload.link.should.be.equal(`${configuration.DMSUrl}/spaces/PROT/pages/153419777/Platzhalter-Titel`);
              done();
            } catch (err) {
              console.log(`err: ${err}`);
              done(err);
            }
          })
          .catch((err) => {
            done(err);
          });
    });
    describe("Now, we read a site (a homepage, that's always there).", () => {
      before((done) => {
        /* eslint-disable no-unused-vars */
        const scope = nock(configuration.DMSUrl)
            .get("/rest/api/content/152141923")
            .reply(200, JSON.parse(`{
                        "id": "152141923",
                        "type": "page",
                        "status": "current",
                        "title": "prototype Home",
                        "space": {
                            "id": 152141831,
                            "key": "PROT",
                            "name": "prototype",
                            "type": "global",
                            "status": "current",
                            "_expandable": {
                                "settings": "/rest/api/space/PROT/settings",
                                "metadata": "",
                                "operations": "",
                                "lookAndFeel": "/rest/api/settings/lookandfeel?spaceKey=PROT",
                                "identifiers": "",
                                "permissions": "",
                                "icon": "",
                                "description": "",
                                "theme": "/rest/api/space/PROT/theme",
                                "history": "",
                                "homepage": "/rest/api/content/152141923"
                            },
                            "_links": {
                                "webui": "/spaces/PROT",
                                "self": "${configuration.DMSUrl}/wiki/rest/api/space/PROT"
                            }
                        },
                        "history": {
                            "latest": true,
                            "createdBy": {
                                "type": "known",
                                "accountId": "5d4013387c8ce90da7ce18b9",
                                "accountType": "atlassian",
                                "email": "bjoern.meier@gmail.com",
                                "publicName": "Björn Meier",
                                "timeZone": "UTC",
                                "profilePicture": {
                                    "path": "/wiki/aa-avatar/5d4013387c8ce90da7ce18b9",
                                    "width": 48,
                                    "height": 48,
                                    "isDefault": false
                                },
                                "displayName": "Björn Meier",
                                "isExternalCollaborator": false,
                                "_expandable": {
                                    "operations": "",
                                    "personalSpace": ""
                                },
                                "_links": {
                                    "self": "${configuration.DMSUrl}/wiki/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
                                }
                            },
                            "createdDate": "2021-12-15T17:20:50.773Z",
                            "_expandable": {
                                "lastUpdated": "",
                                "previousVersion": "",
                                "contributors": "",
                                "nextVersion": ""
                            },
                            "_links": {
                                "self": "${configuration.DMSUrl}/wiki/rest/api/content/152141923/history"
                            }
                        },
                        "version": {
                            "by": {
                                "type": "known",
                                "accountId": "5d4013387c8ce90da7ce18b9",
                                "accountType": "atlassian",
                                "email": "bjoern.meier@gmail.com",
                                "publicName": "Björn Meier",
                                "timeZone": "UTC",
                                "profilePicture": {
                                    "path": "/wiki/aa-avatar/5d4013387c8ce90da7ce18b9",
                                    "width": 48,
                                    "height": 48,
                                    "isDefault": false
                                },
                                "displayName": "Björn Meier",
                                "isExternalCollaborator": false,
                                "_expandable": {
                                    "operations": "",
                                    "personalSpace": ""
                                },
                                "_links": {
                                    "self": "${configuration.DMSUrl}/wiki/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
                                }
                            },
                            "when": "2021-12-15T17:20:50.773Z",
                            "friendlyWhen": "Dez. 15, 2021",
                            "message": "",
                            "number": 1,
                            "minorEdit": false,
                            "confRev": "confluence$content$152141923.2",
                            "contentTypeModified": false,
                            "_expandable": {
                                "collaborators": "",
                                "content": "/rest/api/content/152141923"
                            },
                            "_links": {
                                "self": "${configuration.DMSUrl}/wiki/rest/api/content/152141923/version/1"
                            }
                        },
                        "macroRenderedOutput": {},
                        "extensions": {
                            "position": 721
                        },
                        "_expandable": {
                            "childTypes": "",
                            "container": "/rest/api/space/PROT",
                            "metadata": "",
                            "operations": "",
                            "schedulePublishDate": "",
                            "children": "/rest/api/content/152141923/child",
                            "restrictions": "/rest/api/content/152141923/restriction/byOperation",
                            "ancestors": "",
                            "body": "",
                            "descendants": "/rest/api/content/152141923/descendant"
                        },
                        "_links": {
                            "editui": "/pages/resumedraft.action?draftId=152141923",
                            "webui": "/spaces/PROT/overview",
                            "context": "/wiki",
                            "self": "${configuration.DMSUrl}/wiki/rest/api/content/152141923",
                            "tinyui": "/x/Y4ARCQ",
                            "collection": "/rest/api/content",
                            "base": "${configuration.DMSUrl}/wiki"
                        }
                    }`));
        done();
      });
      it(`we expecting a status-code 200 a response that says title is 'prototype Home' and our link for the new page 
        is ${configuration.DMSUrl}/spaces/PROT/overview`, (done) => {
        confluenceSite.readSite({id: "152141923"})
            .then((result) => {
              try {
                result.statusCode.should.be.equal(200);
                result.data.apiPayload.title.should.be.equal("prototype Home");
                result.data.apiPayload._links.webui.should.be.equal("/spaces/PROT/overview");
                result.data.apiPayload._links.base.should.be.equal(configuration.DMSUrl);
                done();
              } catch (err) {
                console.log(`err: ${err}`);
                done(err);
              }
            })
            .catch((err) => {
              done(err);
            });
      });
    });
  });
});
