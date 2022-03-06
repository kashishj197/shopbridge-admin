import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inventory } from 'src/app/models/inventory.model';
import { PatternModel } from 'src/app/models/validator.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  updateInventoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory
  ) {
    this.updateInventoryForm = new FormGroup({
      name: new FormControl(data.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      price: new FormControl(data.price, [
        Validators.required,
        this.validatePattern({
          pattern: /^[0-9]+$/,
          msg: 'Only numbers allowed',
        }),
      ]),
      image: new FormControl(data.image),
      description: new FormControl(data.description, [Validators.required]),
      quantity: new FormControl(String(data.quantity), [
        Validators.required,
        this.validatePattern({
          pattern: /^[0-9]+$/,
          msg: 'Only numbers allowed',
        }),
      ]),
      available: new FormControl(data.available),
    });
  }

  ngOnInit(): void {}

  validatePattern(config: PatternModel): ValidatorFn {
    return (control: AbstractControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg,
        };
      } else {
        return null;
      }
    };
  }

  updateInventory() {
    if (this.updateInventoryForm.valid) {
      Swal.fire('Success', 'Inventory successfully updated', 'success');
      this.dialogRef.close(this.updateInventoryForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close(this.updateInventoryForm.value);
  }
}
