import { CommonModule } from "@angular/common";
import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import { ErrorBoxComponent } from "./erroBox/error-box.component";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { IBoxComponentsOptions } from "./model/box-components-options";

@Component({
    standalone: true,
    selector: 'app-box-component',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
    imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule]
})
export class BoxComponent implements OnInit, OnDestroy{

   
    constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<BoxComponent>, @Inject(MAT_DIALOG_DATA) public data: IBoxComponentsOptions){}

    openErrorDialog(): void{
        if (this.data.showError && this.data.errorMessage) {
            this.dialog.open(ErrorBoxComponent, {
                data: {message: this.data.errorMessage},
                width: '400px'
            })
        }
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        //throw new Error("Method not implemented.");
    }


}