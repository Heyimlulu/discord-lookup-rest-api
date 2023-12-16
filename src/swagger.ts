import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Discord Lookup Rest API',
        description: 'An API to search for a Discord User or Bot by his snowflake ID.'
    },
    servers: [
        {
            url: 'http://localhost:8080/api',
            description: ''
        },
    ],
};
    
const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/v1/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);