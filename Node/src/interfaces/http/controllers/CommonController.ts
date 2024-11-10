import { Request, Response } from "express";
import { controller, httpGet, request, response } from "inversify-express-utils";
import { ok } from "../processors/response";


@controller('/api/v1')
export class CommonController {

    @httpGet('/health')
    async healthCheck(@request() req: Request, @response() res: Response) {
        const actualDate = new Date().toISOString()
        return res.json(ok(undefined, actualDate))
    }

}