import { Component, Input } from "@angular/core";
import { TaskModel } from "../../../../models/task.model";
import { CommonModule } from "@angular/common";
import { faBriefcase, faCheck, faList, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { AttachmentSummaryComponent } from "./taskAttachmentsSumary/taskAttachments.component";
import { SummaryAttachments } from "../../../../models/attachments.model";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: "app-task-component",
    templateUrl: "./task-detail.component.html",
    styleUrl: "./task-detail.component.scss",
    imports: [CommonModule, FontAwesomeModule, AttachmentSummaryComponent]
})
export class TaskDetailComponent{
    faCheck = faCheck;
    faTimes = faTimes;
    faMapMarkerAlt = faMapMarkerAlt;
    faBriefcase = faBriefcase;
    faList = faList

    constructor(private router: Router){}

    goToAttachments(taskId: string | undefined){
        this.router.navigate([`/tarefa/${taskId}/anexos`])
    }

    @Input() taskDetails: TaskModel = {} as TaskModel
    @Input() taskSummaryAttachments: SummaryAttachments = {} as SummaryAttachments
}