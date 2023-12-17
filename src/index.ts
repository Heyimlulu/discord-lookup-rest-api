import http from 'http';
import express, {Express, NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import routes from './routes';
import { initDb } from './sequelize/sequelize';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const router: Express = express();

/*
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    // Database initialization
    initDb();
}
*/

// Logging
router.use(morgan('dev'));
// Parse the request
router.use(express.urlencoded({ extended: false }));
// Takes care of JSON data
router.use(express.json());

// Rules
router.use((req: Request, res: Response, next: NextFunction) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET');
        return res.status(200).json({});
    }
    next();
});

router.get('/', (_req, res) => {
    res.redirect('/api-docs');
});

const environment = process.env.NODE_ENV || 'development';
let port = process.env.PORT || 8080;

let serverUrl;

switch(environment) {
    case 'production':
        serverUrl = 'https://discord-lookup-rest-api.deeploy.ing';
        break;
    case 'development':
        serverUrl = `http://localhost:${port}`;
        break;
    default:
        serverUrl = `http://localhost:${port}`;
        break;
}

const options = {
    swaggerDefinition: {
      info: {
        version: 'v1.0.0',
        title: 'Discord Lookup Rest API',
        description: 'An API to search for a Discord User or Bot by his snowflake ID.',
      },
      servers: [
        {
            url: serverUrl,
            description: `${environment} server`,
        },
    ],
    },
    apis: ['./swagger.json'],
  };

const specs = swaggerJSDoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

router.use('/', routes);

// Error handling
router.use((req: Request, res: Response) => {
    const error = new Error('I think you got lost');
    return res.status(404).json({
        message: error.message
    });
});

// Server
const httpServer = http.createServer(router);
httpServer.listen(port, () => console.log(`The server is running at ${serverUrl}`));
