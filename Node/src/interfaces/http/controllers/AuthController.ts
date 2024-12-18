import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { AuthApplication } from "../../../application/auth/AuthApplication";
import {Request, Response} from "express";
import { ok } from "../processors/response";


@controller("/api/v1/auth")
export class AuthController implements interfaces.Controller{

    constructor(
        @inject(TYPES.AuthApplication)
        private readonly service: AuthApplication
    ){}

    @httpPost("/signUp")
    async signUpUser(@request() req: Request, @response() res: Response) {
        const {body} = req;
        const user = await this.service.signUpUser(body);

        return res.json({
            status: '000',
            message: "Success"
        })
    }

    @httpPost("/login")
    async loginUser(@request() req: Request, @response() res: Response) {
        const {body} = req;
        const user = await this.service.loginUser(body);

        return res.json(ok(user, 'User logged in successfully'))

    }
}