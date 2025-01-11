import bcrypt from 'bcrypt';
import jwt, { JwtPayload} from 'jsonwebtoken';
import { Response } from 'express';
import config from '../config/main';

interface JwtPayloadExtended extends JwtPayload {
    guid: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: Array<string>
}

const validate = {
    password: (str: string): boolean => {
        const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        return str.length >= 6 && regex.test(str);
    }
}

const isAvailable = (
    targetObj: Record<string, any>,
    requiredFieldsArr: string[],
    checkForAll: boolean = true
): boolean => {
    const targetKeysArr = Object.keys(targetObj);
    if (checkForAll) return requiredFieldsArr.every(field => targetKeysArr.includes(field));
    return requiredFieldsArr.some(field => targetKeysArr.includes(field));
}

const getHashPassword = async (password: string): Promise<string> => {

    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);

}

const verifyUserPassword = async (
    plainTextPassword: string,
    hashPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

const getJwtToken = (jwtPayload: JwtPayloadExtended): string => {
    return jwt.sign(
        {
            guid: jwtPayload.guid,
            firstName: jwtPayload.firstName,
            lastName: jwtPayload.lastName,
            email: jwtPayload.email,
            roles: jwtPayload.roles
        
        },
        config.JWT_SECRET as string,
        {expiresIn: config.JWT_EXPIRY}
    )
}

const saveCookie = (
    res: Response,
    key: string,
    value: string
): void => {
    res.cookie(key, value, {httpOnly: true, maxAge: config.JWT_EXPIRY * 100, path:"/"});
}

const verifyJwtToken = (token: string): JwtPayloadExtended => {
    return jwt.verify(token, config.JWT_SECRET as string) as JwtPayloadExtended;
}

export {
    validate,
    JwtPayloadExtended,
    isAvailable,
    getHashPassword,
    verifyUserPassword,
    getJwtToken,
    saveCookie,
    verifyJwtToken
    
}