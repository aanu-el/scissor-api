import { v4 as uuidv4 } from 'uuid';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

export class AuthService {

    generateUUID(): string {
        return uuidv4();
    }
    
   hash(password: string){
       return bcrypt.hash(password, 10);
    }

    compare(password: string, password2: string) {
        return bcrypt.compare(password, password2);
    }

    jwtSign(body: any) {
        return jwt.sign({user: body}, process.env.JWT_SECRET, { expiresIn: "48h" })
    }
}