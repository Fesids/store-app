import { Component, Input } from '@angular/core';
import { SummaryAttachments } from '../../../../../models/attachments.model';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-attachment-summary',
  templateUrl: './taskAttachments.component.html',
  styleUrls: ['./taskAttachments.component.scss'],
  imports: [CommonModule]
})
export class AttachmentSummaryComponent {
  @Input() summary: SummaryAttachments | null = null;
}
