import { controller, httpGet, httpPost, interfaces, request, requestParam, response } from "inversify-express-utils";
import { inject } from "inversify/lib/annotation/inject";
import { TYPES } from "../../../constants/types";
import { AttachApplication } from "../../../application/attach/AttachApplication";
import {Request, Response} from "express";

@controller("/api/v1/attach")
export class AttachController implements interfaces.Controller{

    constructor(
        @inject(TYPES.AttachApplication)
        private readonly service: AttachApplication
    ){}

    @httpPost("/")
    async createAttach(@request() req: Request, @response() res: Response) {
        const {body} = req;
        const attach = await this.service.createAttach(body);

        return res.json({
            status: '201',
            message: "Success"
        })
    }

    @httpGet("/summary/:taskId")
    async getAttachmentsSummary(@requestParam("taskId") taskId: string, @response() res: Response) {

        try{
            const summary = await this.service.getAttachmentsSummaryByTask(taskId);

            return res.json({
                status: '200',
                message: "Success",
                data: summary
            })
        } catch(error: any) {
            return res.status(500).json({
                status: "500",
                message: "Failed to retrieve attachment summary",
                error: error.message,
              });
        }

    }

    @httpGet("/categories/:taskId")
    async getAttachmentsByCategory(@requestParam("taskId") taskId: string, @response() res: Response) {
    try {
        const categorizedAttachments = await this.service.getAttachmentsByCategory(taskId);

        return res.json({
            status: "000",
            message: "Success",
            data: categorizedAttachments,
        });
    } catch (error:any) {
        return res.status(500).json({
            status: "500",
            message: "Failed to retrieve attachments by category",
            error: error.message,
        });
    }
    }

}