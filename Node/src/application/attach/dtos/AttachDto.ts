export class AttachDto{
    constructor(
        public guid: string,
        public taskId: string,
        public textMessage: string | null,
        public images: Array<string> | null,
        public videoUrl: string | null,
        public videoDuration: number | null,
        public createdAt: Date,
        public updatedAt: Date,
    ){

    }
}