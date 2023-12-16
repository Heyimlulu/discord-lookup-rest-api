import http from 'http';
import express, {Express, NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import v1Routes from './routes/v1';
import path from "path";
import { initDb } from './sequelize/sequelize';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

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

// Index route
router.get('/', (_req, res) => {
    res.redirect('/api-docs');
});

// Swagger
router.get('/api-docs/swagger.json', (_req, res) => {
    res.json(swaggerDocument);
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
router.use('/api', v1Routes);

// Error handling
router.use((req: Request, res: Response) => {
    const error = new Error('I think you got lost');
    return res.status(404).json({
        message: error.message
    });
});
2
// Server
const httpServer = http.createServer(router);
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
