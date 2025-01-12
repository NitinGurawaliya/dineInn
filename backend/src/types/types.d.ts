import 'express';
import { File } from 'multer'; // Ensure multer is installed

declare global {
  namespace Express {
    export interface Request {
      files?: {
        [fieldname: string]: File[];
      };
    }
  }
}
