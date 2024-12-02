import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
}

export const authMiddleware = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    const authHeader = req.header('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!token) {
         res.status(403).json({ msg: 'Not authorized' });
         return
         
    }
    console.log("In the middleware")

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = decodedToken.id; 
        console.log('Decoded userId in middleware:', req.userId); // Debug log

        next();
    } catch (err) {
         res.status(403).json({ msg: 'Not authorized' });
         
    }
};
