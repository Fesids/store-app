import { Request, Response } from "express";
import { controller, httpGet, request, response } from "inversify-express-utils";
import { ok } from "../processors/response";


@controller('')
export class CommonController {

    @httpGet('/health')
    async healthCheck(@request() req: Request, @response() res: Response) {
        return res.json(ok(undefined, 'Success'))
    }

}