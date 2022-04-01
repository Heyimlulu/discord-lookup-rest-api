import { Request, Response } from 'express';
import { User } from '../sequelize/sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../oauth';

export default class AccountController {

    static async authentification(req: Request, res: Response) {

        // create variable for user and password
        const username = req.body.username;
        const password = req.body.password;

        // check if client sent username and password
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter username and password'
            });
        }

        User.findOne({ where: { username: username } }).then((user: any) => {   
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            } else {
                bcrypt.compare(password, user.password).then((isPasswordValid) => {
                    if (isPasswordValid) {

                        // JWT
                        const token = jwt.sign({ id: user.clientId }, PRIVATE_KEY, { expiresIn: '1h' });

                        return res.json({
                            success: true,
                            message: 'Successfully logged in',
                            data: `Hello, ${user.username}, your clientId is: ${user.clientId}`, token
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
                const clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

                bcrypt.hash(password, 10).then((hash) => {
                    User.create({
                        clientId: clientId,
                        username: username,
                        password: hash
                    }).then((user: any) => {
                        return res.json({
                            success: true,
                            message: 'User created successfully',
                            data: user
                        });
                    });
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        });
    }

}
