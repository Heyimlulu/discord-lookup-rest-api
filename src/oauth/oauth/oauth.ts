import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from './constants';

export const verifyToken = (req: any, res: any, next: any) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, PRIVATE_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Failed to authenticate token'
            });
        }
        
        const clientId = decoded.id;

        if (req.body.clientId !== clientId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user'
            });
        } else {
            next();
        }
    });
};

const verifyClient = (req: any, res: any, next: any) => {
    const clientId = req.body.clientId;
    const clientSecret = req.body.clientSecret;

    if (clientId !== 'clientId' || clientSecret !== 'clientSecret') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user'
        });
    } else {
        next();
    }
}