import { CommonModule, NgFor } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from "@angular/forms";
import { FormField } from "../interfaces/formField";



@Component({
    standalone: true,
    selector: "app-generic-form",
    templateUrl: "./genericForm.component.html",
    styleUrl: "./genericForm.component.scss",
    imports: [NgFor, CommonModule, ReactiveFormsModule]
})
export class GenericFormComponent implements OnInit{

    //@Input() formFields: {name: string; label: string; placeholder: string; type?: string; minLength?: number}[] = [];
    @Input() formFields: FormField[] = [];
    @Input() submitButtonLabel: string = 'Submit';
    @Output() formSubmitted = new EventEmitter<any>();

    form: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder) {}

    private buildFormControls(): { [key: string]: any } {
        return this.formFields.reduce((acc: { [key: string]: any }, field: FormField) => {
          const validators: ValidatorFn[] = [Validators.required];
          if (field.minLength) {
            validators.push(Validators.minLength(field.minLength));
          }
          acc[field.name] = ['', validators];
          return acc;
        }, {});
      }

    ngOnInit(): void {
        this.form = this.fb.group(
            this.buildFormControls()
        )
    
    }

    onSubmit(): void{
       // this.formSubmitted.emit(this.form.value)
       if (this.form.valid) {
        this.formSubmitted.emit(this.form.value);
      } else {
        this.form.markAllAsTouched();
      }
    }

    /*ngOnDestroy(): void {
        if (this.form.valid) {
            this.formSubmitted.emit(this.form.value);
          }
    }*/



}