import { Component, Input } from "@angular/core";
import { CategorizedAttachments } from "../../../../models/attachments.model";
import { CommonModule } from "@angular/common";


@Component({
    standalone: true,
    selector: 'app-attchments-list',
    templateUrl: 'attachments-list.component.html',
    styleUrls: ['attachments-list.component.scss'],
    imports: [CommonModule]
})
export class AttachmentsListComponent{
    @Input() data: CategorizedAttachments | null = {
        videos: [],
        images: [],
        textMessages: []
    };
}