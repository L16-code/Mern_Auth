import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import envConfig from '../config/EnvConfig';

interface CustomRequest extends Request {
    userId?: string | JwtPayload;
}

const env = envConfig();
const SecretKey=env.secretKey;
const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');
    // console.log( token)
    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const newToken=token.split(" ")[1];
        console.log(newToken);
        const decoded = jwt.verify(newToken, SecretKey);
        console.log(decoded);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default verifyToken;
