import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../shared/layout/header/header.component";
import { ActivatedRoute } from "@angular/router";
import { TaskDetailComponent } from "../../../shared/components/task/detail/task-detail.component";
import { TaskService } from "../../../services/task.service";
import { error } from "console";
import { AttachmentService } from "../../../services/attach.service";



@Component({
    standalone: true,
    templateUrl: "./taskDetailPage.component.html",
    styleUrls: ["./taskDetailPage.component.scss"],
    imports:  [HeaderComponent, TaskDetailComponent]
})
export class TaskDetailPageComponent implements OnInit {

    taskId: string | null = null;
    taskDetails: any;
    taskAttachmentsSumarru: any;

    constructor(private route: ActivatedRoute, private readonly taskService: TaskService, private readonly attachmentsService: AttachmentService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.taskId = params.get("id_task");

            if (this.taskId) {
                this.loadTaskById(this.taskId);
                this.loadTaskAttachmentsSummary(this.taskId)
            }
        })
    }

    loadTaskById(task_id: string): void {
        this.taskService
        .loadTaskById(task_id)
        .subscribe(
            (response) => {
                this.taskDetails = response.data;
                console.log("Task detail : ", this.taskDetails);
            },
            (error) => {
                console.log("Failed to load task", error)
            }
        )
    }

    loadTaskAttachmentsSummary(task_id: string): void{
        this.attachmentsService
        .loadTaskAttachmentSumary(task_id)
        .subscribe(
            (response) => {
                this.taskAttachmentsSumarru = response.data;
                console.log("Summary : ", response.data)
            },
            (error) => {
                console.log("Failed to load task", error)
            }
        )
    }

    


}