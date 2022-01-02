// During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Require the dev-dependencies
import chai from "chai";
import server from "../src/modules/app";
import configuration from "../src/modules/configuration";
import confluenceSite from "../src/modules/externalAPIs/confluenceSites";
import nock from "nock";
const should = chai.should();
const hostname = "localhost";
const port = 5500;

// Our parent block
/*
 * Test the /GET route
 */
describe("Test handling of confluence sites", () => {
	before((done) => {
		server.listen(port, hostname);
		if (should);
		done();
	});
	describe("First we create a Site.", () => {
		before((done) => {
			/* eslint-disable no-unused-vars */
			const scope = nock(configuration.DMSUrl)
				.post("/rest/api/content")
				.reply(200, 
					`{
						"id": "153124865",
						"type": "page",
						"status": "current",
						"title": "testpage",
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
								"self": "https://dicvhi.atlassian.net/wiki/rest/api/space/PROT"
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
									"self": "https://dicvhi.atlassian.net/wiki/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
								}
							},
							"createdDate": "2022-01-02T17:26:39.841Z",
							"_expandable": {
								"lastUpdated": "",
								"previousVersion": "",
								"contributors": "",
								"nextVersion": ""
							},
							"_links": {
								"self": "https://dicvhi.atlassian.net/wiki/rest/api/content/153124865/history"
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
									"self": "https://dicvhi.atlassian.net/wiki/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
								}
							},
							"when": "2022-01-02T17:26:39.841Z",
							"friendlyWhen": "vor Kurzem",
							"message": "",
							"number": 1,
							"minorEdit": false,
							"confRev": "confluence$content$153124865.2",
							"contentTypeModified": false,
							"_expandable": {
								"collaborators": "",
								"content": "/rest/api/content/153124865"
							},
							"_links": {
								"self": "https://dicvhi.atlassian.net/wiki/rest/api/content/153124865/version/1"
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
									"self": "https://dicvhi.atlassian.net/wiki/rest/api/content/152141923",
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
										"self": "https://dicvhi.atlassian.net/wiki/rest/api/user?accountId=5d4013387c8ce90da7ce18b9"
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
								"self": "https://dicvhi.atlassian.net/wiki/rest/api/space/PROT"
							}
						},
						"macroRenderedOutput": {},
						"body": {
							"storage": {
								"value": "<p>###test###</p>",
								"representation": "storage",
								"embeddedContent": [],
								"_expandable": {
									"content": "/rest/api/content/153124865"
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
							"position": 81728528
						},
						"_expandable": {
							"childTypes": "",
							"metadata": "",
							"operations": "",
							"schedulePublishDate": "",
							"children": "/rest/api/content/153124865/child",
							"restrictions": "/rest/api/content/153124865/restriction/byOperation",
							"descendants": "/rest/api/content/153124865/descendant"
						},
						"_links": {
							"editui": "/pages/resumedraft.action?draftId=153124865",
							"webui": "/spaces/PROT/pages/153124865/testpage",
							"context": "/wiki",
							"self": "https://dicvhi.atlassian.net/wiki/rest/api/content/153124865",
							"tinyui": "/x/AYAgCQ",
							"collection": "/rest/api/content",
							"base": "https://dicvhi.atlassian.net/wiki"
						}
					}`);
			done();
		});
		it("we expect status 200 and a JSON-Object", (done) => {
			apiUse.get("http://www.example.com/resource", {}, (statusCode, data) => {
				try {
					statusCode.should.be.equal(200);
					data.should.be.equal("{status: \"ok\"}");
					done();
				} catch (err) {
					done(err);
				}
			});
		});
	});
});