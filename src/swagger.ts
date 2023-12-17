import swaggerAutogen from "swagger-autogen";
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;

let serverUrl;

switch(env) {
    case 'production':
        serverUrl = 'https://discord-lookup-rest-api.deeploy.ing/api';
        break;
    default:
        serverUrl = `http://localhost:${port}/api`;
        break;
}

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Discord Lookup Rest API',
        description: 'An API to search for a Discord User or Bot by his snowflake ID.'
    },
    servers: [
        {
            url: serverUrl,
            description: `${env} server`,
        },
    ],
};
    
const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);