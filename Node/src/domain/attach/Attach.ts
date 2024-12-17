import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";



export interface IAttachProps{
    taskId: string,
    textMessage: string | null,
    images: Array<string> | null,
    videoUrl: string | null,
    videoDuration: number | null,
    createdAt: Date,
    updatedAt: Date
}

export class Attach extends Entity<IAttachProps> implements IAggregateRoot{

    private _taskId: string;
    private _textMessage: string | null;
    private _images: Array<string> | null;
    private _videoUrl: string | null;
    private _videoDuration: number | null;
   
    private _createdAt: Date;
    private _updatedAt: Date;


    constructor({taskId, textMessage, images, videoUrl, videoDuration, createdAt, updatedAt}: IAttachProps, guid?:string){
        super(guid);
        this._taskId = taskId;
        this._textMessage = textMessage;
        this._images = images;
        this._videoUrl = videoUrl;
        this._videoDuration = videoDuration;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
       
    }

    get taskId(){
        return this._taskId;
    }

    get textMessage(){
        return this._textMessage;
    }

    get images(){
        return this._images;
    }

    get videoUrl(){
        return this._videoUrl;
    }

    get videoDuration(){
        return this._videoDuration;
    }

  

    get createdAt(){
        return this._createdAt;
    }

    get updatedAt(){
        return this._updatedAt;
    }

 

    public static create(props: IAttachProps, guid?: string ){
        return new Attach(props, guid);
    }

}