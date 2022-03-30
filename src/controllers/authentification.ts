import { Request, Response } from 'express';
import { User } from '../sequelize/sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../auth/private_key';

export default class AuthentificationController {

    static async login (req: Request, res: Response) {

        User.findOne({ where: { username: req.body.username } }).then((user: any) => {   
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            } else {
                bcrypt.compare(req.body.password, user.password).then((isPasswordValid) => {
                    if (isPasswordValid) {

                        // JWT
                        const token = jwt.sign({ id: user.id }, PRIVATE_KEY, { expiresIn: '1h' });

                        return res.json({
                            success: true,
                            message: 'Successfully logged in',
                            data: `Hello, ${user.username}!`, token
                        });
                    } else {
                        return res.json({
                            success: false,
                            message: 'Invalid username or password'
                        });
                    }
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        });
    }

}
