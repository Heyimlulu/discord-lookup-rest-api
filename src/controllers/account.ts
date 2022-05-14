import { Request, Response } from 'express';
import { User } from '../sequelize/sequelize';

export default class AccountController {

    /*
    static async authentification(req: Request, res: Response) {

        // create variable for clientId and clientSecret
        const clientId = req.body.clientId;
        const clientSecret = req.body.clientSecret;

        // check if client sent clientId and clientSecret
        if (!clientId || !clientSecret) {
            return res.status(401).json({
                success: false,
                message: 'No clientId or clientSecret provided'
            });
        }

        User.findOne({ where: { clientId: clientId } }).then((user: any) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            } else {
                if (user.clientSecret === clientSecret) {

                    const clientId = user.clientId;
                    const clientSecret = user.clientSecret;

                    return res.json({
                        success: true,
                        message: 'Successfully logged in',
                        data: {
                            clientId: clientId,
                            clientSecret: clientSecret
                        }
                    });
                } else {
                    return res.json({
                        success: false,
                        message: 'Invalid username or password'
                    });
                }
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        });
    }

    // create registration form
    static async registration(req: Request, res: Response) {

        // create variable for user and password
        const username = req.body.username;
        const password = req.body.password;

        // check if client sent username and password
        if (!username || !password) {
            return res.status(400).json({ error: 'Please enter username and password' });
        }

        // check if username and password are not empty
        if (username.trim() === '' || password.trim() === '') {
            return res.status(400).json({ error: 'Please enter username and password' });
        }

        User.findOne({ where: { username: username } }).then((user: any) => {
            if (user) {
                return res.json({
                    success: false,
                    message: 'User already exists'
                });
            } else {
                // generate clientId
                const clientId = Math.random().toString(36).substring(2, 15);

                // generate clientSecret
                const clientSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                User.create({
                    clientId: clientId,
                    clientSecret: clientSecret,
                    username: username,
                    password: clien
                }).then((user: any) => {
                    return res.json({
                        success: true,
                        message: 'User created successfully',
                        data: user
                    });
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        });
    }

     */

}
