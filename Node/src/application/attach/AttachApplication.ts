import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IAttachRepository } from "../../domain/attach/IAttachRepository";
import { AttachDto } from "./dtos/AttachDto";
import { Attach } from "../../domain/attach/Attach";
import { Pagination } from "../../shared/pagination/Pagination";



@injectable()
export class AttachApplication {
    constructor(
        @inject(TYPES.AttachRepository)
        private readonly attachRepository: IAttachRepository
    ){}

    async createAttach(data: AttachDto): Promise<void>{
        const {taskId, images, textMessage, videoDuration, videoUrl} = data;
        const createdAt = new Date();
        const updatedAt = new Date();

      

        
        //if(password !== rePassword) throw new AppError('Password and rePassword didnt match', 404)

        const attach = Attach.create({taskId, images, textMessage, videoDuration, videoUrl, createdAt: createdAt, updatedAt: updatedAt });

        await this.attachRepository.save(attach);
       
    }

    async getAttachments(): Promise<any> {

      const attachments = await this.attachRepository.findAll();

      return attachments;
  }


    async getAttachmentsSummaryByTask(taskId: string): Promise<any> {
        const pipeline = [
            {
                $match: { taskId }, // Filter by taskId
              },
              {
                $group: {
                  _id: "$taskId",
                  totalImages: {
                    $sum: { $cond: [{ $isArray: "$images" }, { $size: "$images" }, 0] },
                  },
                  totalVideos: {
                    $sum: { $cond: [{ $ne: ["$videoUrl", null] }, 1, 0] },
                  },
                  totalTextMessages: {
                    $sum: { $cond: [{ $ne: ["$textMessage", null] }, 1, 0] },
                  },
                },
              },
        ]

        const result = await this.attachRepository.aggregate(pipeline);

        return result.length > 0 ? result[0]: {totalImages: 0, totalVideos: 0, totalMaxMessages: 0}
    }


    async getAttachmentsByCategory(taskId: string): Promise<any> {
        const pipeline = [
          {
            $match: { taskId }, // Filter by taskId
          },
          {
            $facet: {
              videos: [
                { $match: { videoUrl: { $ne: null } } },
                { $project: { _id: 0, videoUrl: 1, videoDuration: 1 } },
              ],
              images: [
                { $match: { images: { $ne: null } } },
                { $project: { _id: 0, images: 1 } },
              ],
              textMessages: [
                { $match: { textMessage: { $ne: null } } },
                { $project: { _id: 0, textMessage: 1 } },
              ],
            },
          },
        ];


        const result = await this.attachRepository.aggregate(pipeline);

        return result.length > 0
        ?{
            videos: result[0].videos || [],
            images: result[0].images.flatMap((doc:any) => doc.images) || [],
            textMessages: result[0].textMessages || []
        }
        :
        {videos: [], images: [], textMessages: []}
    }      
    
}