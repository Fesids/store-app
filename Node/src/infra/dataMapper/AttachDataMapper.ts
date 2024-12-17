import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";

import { Attach } from "../../domain/attach/Attach";

@injectable()
export class AttachDataMapper implements IDataMapper<Attach> {
    toDomain(dalEntity: any): Attach {
        const {
            guid,
            taskId,
            textMessage,
            videoUrl,
            images,
            videoDuration,
            createdAt,
            updatedAt
        } = dalEntity;

        return Attach.create({taskId,textMessage, videoUrl, videoDuration,images, createdAt, updatedAt}, guid);
    }

    toDalEntity(entity: Attach) {
        return {
            guid: entity.guid,
            taskId: entity.taskId,
            textMessage: entity.textMessage,
            videoUrl: entity.videoUrl,
            images: entity.images,
            videoDuration: entity.videoDuration,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }
    }

    
}