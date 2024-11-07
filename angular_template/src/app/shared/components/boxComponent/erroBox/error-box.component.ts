import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IBoxComponentsOptions } from "../model/box-components-options";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';



@Component({
    standalone: true,
    selector: 'app-error-box-component',
    templateUrl: './error-box.component.html',
    styleUrls: ['./error-box.component.scss'],
    imports: [ MatCardModule, MatButtonModule, MatDialogModule]
})
export class ErrorBoxComponent {

    constructor(
        public dialogRef: MatDialogRef<ErrorBoxComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: IBoxComponentsOptions 
    ){}

    closeDialog(): void {
        this.dialogRef.close();
    }

}