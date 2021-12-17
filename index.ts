import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './src/routes/routes';
import path from "path";

const router: Express = express();

// Logging
router.use(morgan('dev'));
// Parse the request
router.use(express.urlencoded({ extended: false }));
// Takes care of JSON data
router.use(express.json());

// Rules
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});

// Website routes
router.use('/static', express.static(path.join(__dirname, 'static')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
});

// API Routes
router.use('/api', routes);

// Error handling
router.use((req, res) => {
    const error = new Error('I think you got lost');
    return res.status(404).json({
        message: error.message
    });
});

// Server
const httpServer = http.createServer(router);
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
