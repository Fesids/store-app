import {Request, Response} from 'express';
import {
    controller,
    httpGet,
    request,
    response,
    httpPost,
    interfaces
} from 'inversify-express-utils';
import {inject} from 'inversify';
import { TYPES } from '../../../constants/types';
import { ok } from '../processors/response';

@controller('/api/v1/application')
export class AppController implements interfaces.Controller{

    @httpGet('/')
    public getExample(@request() req: Request, @response() res: Response): void {
        res.json({ message: 'Teste from TaskController!' });
    }
}