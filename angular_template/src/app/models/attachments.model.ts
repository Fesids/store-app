export interface CategorizedAttachments {
    videos: { videoUrl: string; videoDuration: number }[];
    images: string[];
    textMessages: { textMessage: string }[];
}


export interface SummaryAttachments {
    totalImages: number,
    totalVideos: number,
    totalTextMessages: number
}