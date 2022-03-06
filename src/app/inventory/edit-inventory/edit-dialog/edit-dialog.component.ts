import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppNavService } from 'src/app/app-nav/app-nav.service';
import { Inventory } from 'src/app/models/inventory.model';
import Swal from 'sweetalert2';
import { CreateInventoryComponent } from '../../create-inventory/create-inventory.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent extends CreateInventoryComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory,
    private readonly navService: AppNavService,
    private readonly route: Router
  ) {
    super(navService, route);
  }

  override ngOnInit(): void {
    this.addInventoryForm.patchValue({
      name: this.data.name,
      price: this.data.price,
      description: this.data.description,
      quantity: String(this.data.quantity),
      available: this.data.available,
    });
  }

  updateInventory() {
    if (this.addInventoryForm.valid) {
      Swal.fire('Success', 'Inventory successfully updated', 'success');
      this.dialogRef.close(this.addInventoryForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close(this.addInventoryForm.value);
  }
}
