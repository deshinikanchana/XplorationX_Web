import { Request, Response } from 'express';
import express from "express";
import {createUser, verifyUserCredentials} from "../Database/user-client";
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post("/login", async (req:Request, res:Response) => {
    console.log('Login Request: ', req.body);
    const { email, password } = req.body.user;

    const user: { email: string; password: string } = { email, password };

    try {
        const isVerified = await verifyUserCredentials(user);
        if (isVerified) {
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: "3600s" });
            const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: "7d" });
            res.setHeader("Content-Type", "application/json");
            return res.json({ accessToken : token, refreshToken : refreshToken });

        } else {
            return res.status(403).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error("Error in login:", err);
        res.status(400).json(err);
    }
});

router.post("/register", async (req, res) => {
    const username = req.body.user.username;
    const password = req.body.user.password;
    const email = req.body.user.email;

    const user : { username: string; email: string; password: string } = {username,email, password};

    try{
        const registration = await createUser(user);
        res.status(201).json(registration);
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }

})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.split(' ')[1];


    if (!refreshToken) {
        return res.status(401).send('No token provided');
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { email: string, iat: number };

        const newAccessToken = jwt.sign(
            { email: payload.email },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "3600s" }
        );

       return res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error("Error in refreshing token:", err);
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
});


export function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).send('No token provided');

    try {
        const payload = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string) as { email: string, iat: number };
        req.body.email = payload.email;
        next();
    } catch (err) {
        res.status(401).send('Invalid or expired token');
    }
}


export default router;