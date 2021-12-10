import swaggerAutogen from 'swagger-autogen';
import configuration  from '../model/configuration';

const outputFile = './swagger_output.json'
const endpointsFiles = ['./endpoints.js']

const doc = {
    info: {
        version: "0.0.1",
        title: "\"Mein Caritas\" - Backend API",
        description: "This is the middleware for Mein Caritas."
    },
    host: configuration.host + ":" + configuration.port,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        openId: {
            type: "openIdConnect",
            openIdConnectUrl: "https://keycloak.deliancourt.org/auth/realms/prototype/.well-known/openid-configuration"
          }
    },
    definitions: {
        User: {
            name: "Jhon Doe",
            age: 29,
            parents: {
                father: "Simon Doe",
                mother: "Marie Doe"
            },
            diplomas: [
                {
                    school: "XYZ University",
                    year: 2020,
                    completed: true,
                    internship: {
                        hours: 290,
                        location: "XYZ Company"
                    }
                }
            ]
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})