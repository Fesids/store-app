import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { AttachmentService } from '../../../services/attach.service';
import { NavigationService } from '../../../shared/utils/navigationService';
import { HeaderComponent } from "../../../shared/layout/header/header.component";
import { RedirectButton } from "../../../shared/components/redirectButton/redirect-button.component";
import { AttachmentsListComponent } from "../../../shared/components/task/attachments/attachments-list.component";
import { CustomButtonComponent } from "../../../shared/components/custom-button/custom-button.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: true,
  templateUrl: './attachments-page.component.html',
  styleUrls: ['./attachments-page.component.scss'],
  imports: [HeaderComponent,  AttachmentsListComponent, CustomButtonComponent]
})
export class TaskAttachmentsPageComponent implements OnInit {
  taskId: string | null = null;
  taskAttachments: any;
  arrowSvg: SafeHtml;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly taskService: TaskService,
    private readonly attachmentsService: AttachmentService,
    private navigationService: NavigationService,
    private sanitizer: DomSanitizer
  ) {
    this.arrowSvg = this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-5 h-5">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `);
  }

  
   
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id_task');
      if (this.taskId) {
        this.loadTaskAttachments(this.taskId);
      }
    });

   
  }

  
  private sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  performRedirect = () => {
    console.log('Performing redirect via NavigationService...');
    this.navigationService.goBack();
  };

  loadTaskAttachments(task_id: string): void {
    this.attachmentsService.loadTaskAttachmentCategorized(task_id).subscribe(
      response => {
        this.taskAttachments = response.data;
        console.log('Categories : ', response.data);
      },
      error => {
        console.log('Failed to load task', error);
      }
    );
  }
}
