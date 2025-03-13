import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { AuthApplication } from "../../../application/auth/AuthApplication";
import {Request, Response} from "express";
import { ok } from "../processors/response";
import { saveCookie, verifyJwtToken } from "../../../shared/authenticationUtil";
import { error } from "console";


@controller("/api/v1/auth")
export class AuthController implements interfaces.Controller{

    constructor(
        @inject(TYPES.AuthApplication)
        private readonly service: AuthApplication
    ){}

    @httpPost("/signUp")
    async signUpUser(@request() req: Request, @response() res: Response) {
        const {body} = req;
        console.log(body)
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

       
        saveCookie(res, "auth_cookie", user["token"])

        //console.log(verifyJwtToken(user["token"]))

        return res.json(ok(user, 'User logged in successfully'))

    }

    @httpGet("/me")
    async getUserInfo(@request() req: Request, @response() res: Response){
        const token = req.cookies["auth_cookie"];

        if(!token) {
            return res.status(401).json({error: "Unauthorized"});
        
        }

        try{
            const decoded = verifyJwtToken(token);
            return res.json(ok(decoded, "User info retrieved successfuly"))
        } catch(error){
            console.log(error)
            return res.status(401).json({error: "Invalid token"})
        }
    }
}