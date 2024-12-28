import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../shared/layout/header/header.component";
import { TaskDetailComponent } from "../../../shared/components/task/detail/task-detail.component";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../../services/task.service";
import { AttachmentService } from "../../../services/attach.service";
import { AttachmentsListComponent } from "../../../shared/components/task/attachments/attachments-list.component";


@Component({
    standalone: true,
    templateUrl: "./attachments-page.component.html",
    styleUrls: ["./attachments-page.component.scss"],
    imports:  [HeaderComponent, TaskDetailComponent, AttachmentsListComponent]
})
export class TaskAttachmentsPageComponent implements OnInit{
   
    taskId: string | null = null;
    taskDetails: any;
    taskAttachments: any;

    constructor(private route: ActivatedRoute, private readonly taskService: TaskService, private readonly attachmentsService: AttachmentService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.taskId = params.get("id_task");

            if (this.taskId) {
                
                this.loadTaskAttachments(this.taskId)
            }
        })
    }

  

    loadTaskAttachments(task_id: string): void{
        this.attachmentsService
        .loadTaskAttachmentCategorized(task_id)
        .subscribe(
            (response) => {
                this.taskAttachments = response.data;
                console.log("Categories : ", response.data)
            },
            (error) => {
                console.log("Failed to load task", error)
            }
        )
    }


}