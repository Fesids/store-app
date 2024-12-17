import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { Observable } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { CategorizedAttachments, SummaryAttachments } from "../models/attachments.model";

@Injectable({providedIn: 'root'})
export class AttachmentService {

    private readonly apiService = inject(ApiService);

    loadTaskAttachmentSumary(taskId: string): Observable<SuccessResponse<SummaryAttachments>> {
        return this.apiService.get<SuccessResponse<SummaryAttachments>>(`/attach/summary/${taskId}`, {} as any)
    }

    loadTaskAttachmentCategorized(taskId: string): Observable<SuccessResponse<CategorizedAttachments>> {
        return this.apiService.get<SuccessResponse<CategorizedAttachments>>(`/attach/categories/${taskId}`, {} as any)
    }


}