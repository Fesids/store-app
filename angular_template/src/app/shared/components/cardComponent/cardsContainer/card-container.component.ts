import { Component } from "@angular/core";
import { CardComponent } from "../card.component";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { SuccessResponse } from "../../../../models/successResponse";
import { map, Observable, startWith } from "rxjs";
import { TaskService } from "../../../../services/task.service";
import { MatDialog } from "@angular/material/dialog";
import { TaskStatistics } from "../../../../models/task-statistics.model";
import { CommonModule } from "@angular/common";


@Component({
    standalone: true,
    selector: "app-card-container",
    templateUrl: './card-container.component.html',
    styleUrls: ['./card-container.component.scss'],
    imports: [CardComponent, CommonModule]
})
export class CardContainerComponent {

    taskStatistics$: Observable<SuccessResponse<TaskStatistics>>;
    taskStatisticsData: Observable<TaskStatistics>
    //tasksArray$: Observable<TaskModel[]>;
    //completedTasksCount$: Observable<number>;
    //notCompletedTasksCount$: Observable<number>;
  
    constructor(private taskService: TaskService, private dialog: MatDialog, private sanitizer: DomSanitizer) {
      this.taskStatistics$ = this.taskService.taskEmployeeStatistics;

      this.taskStatisticsData = this.taskStatistics$.pipe(
        map(tasksResponse => tasksResponse?.data || {
          created: { thisMonth: 0, lastMonth: 0, change: 0 },
          completed: { thisMonth: 0, lastMonth: 0, change: 0 },
          pending: { thisMonth: 0, lastMonth: 0, change: 0 }
        }),
        startWith({
          created: { thisMonth: 0, lastMonth: 0, change: 0 },
          completed: { thisMonth: 0, lastMonth: 0, change: 0 },
          pending: { thisMonth: 0, lastMonth: 0, change: 0 }
        })
      );
      
  
      this.taskCreatedIcon = this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `);
  
      this.taskPendingIcon = this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      `);

      this.taskConckudedIcon = this.sanitizeSvg(`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        `);
  
    }
  
    ngOnInit(): void {
      const defaultEmployeeId = "86db2f60-bbd8-4ad8-b80d-4ea84e37865f";
      this.taskService.loadTaskEmployeeStatistics(defaultEmployeeId);
    }

    apiResponse = {
        employeeId: "86db2f60-bbd8-4ad8-b80d-4ea84e37865f",
        created: {
          thisMonth: 8,
          lastMonth: 0,
          change: 100
        },
        completed: {
          thisMonth: 3,
          lastMonth: 0,
          change: 100
        },
        pending: {
          thisMonth: 5,
          lastMonth: 0,
          change: 100
        }
      };

      taskCreatedIcon: SafeHtml;
      taskPendingIcon: SafeHtml;
      taskConckudedIcon: SafeHtml;
    
    
      private sanitizeSvg(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
      }


      
    
}