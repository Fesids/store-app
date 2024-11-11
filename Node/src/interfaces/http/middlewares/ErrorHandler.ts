//import {INTERNAL_SERVER_ERROR} from 'http-status-code';
import { Request, Response, NextFunction } from 'express';
import { boolean } from 'webidl-conversions';

class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor)

    }
}

const logError = (err: Error) =>{
    console.error('💥 ERROR 💥', err);
}

const sendError = (err: AppError, req: Request, res: Response) => {

    const {statusCode, status, message} = err;

    //console.log(err)
    
    res.status(statusCode).json({
        status,
        message,

        ...(process.env.NODE_ENV === 'development') && {stack: err.stack}
    })

}

const errorHandler  = (
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {  

    if (process.env.NODE_ENV === 'development') logError(err);

    const operationalError = err instanceof AppError ? err : new AppError('Internal Server Error', 500);

    sendError(operationalError, req, res);

}

export { errorHandler, AppError};