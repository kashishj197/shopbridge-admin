import { Component, OnInit } from '@angular/core';
import { AppNavService } from '../../app-nav/app-nav.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { PatternModel } from 'src/app/models/validator.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.css'],
})
export class CreateInventoryComponent implements OnInit {
  addInventoryForm: FormGroup;

  constructor(
    private readonly appNavService: AppNavService,
    private readonly router: Router
  ) {
    this.addInventoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      price: new FormControl('', [
        Validators.required,
        this.validatePattern({
          pattern: /^[0-9]+$/,
          msg: 'Only numbers allowed',
        }),
      ]),
      image: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [
        Validators.required,
        this.validatePattern({
          pattern: /^[0-9]+$/,
          msg: 'Only numbers allowed',
        }),
      ]),
      available: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.appNavService.setHeader = 'Create';
  }

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

  submitInventory() {
    if (this.addInventoryForm.valid) {
      this.appNavService.setInventory = this.addInventoryForm.value;
      Swal.fire('Success', 'Inventory successfully added', 'success');
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
  }
}
