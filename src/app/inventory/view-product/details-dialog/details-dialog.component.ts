import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inventory } from 'src/app/models/inventory.model';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css'],
})
export class DetailsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
