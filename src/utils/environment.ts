import dotenv from 'dotenv';
dotenv.config();

export const getEnvironmentBaseUrl = () => {
    const port = process.env.PORT || '8080';
    const environment = process.env.NODE_ENV || 'development';
    let serverUrl;

    switch(environment) {
        case 'production':
            serverUrl = 'https://discord-lookup-rest-api.deeploy.ing';
            break;
        case 'development':
            serverUrl = `http://localhost:${port}`;
            break;
    }

    return serverUrl;
}