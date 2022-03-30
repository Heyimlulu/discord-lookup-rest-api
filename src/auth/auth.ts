import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../auth/private_key';

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

        const username = decoded.username;
        if (req.body.username !== username) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user'
            });
        } else {
            next();
        }
    });
};