import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppNavService } from 'src/app/app-nav/app-nav.service';
import { Inventory } from 'src/app/models/inventory.model';
import Swal from 'sweetalert2';
import { EditDialogComponent } from '../edit-inventory/edit-dialog/edit-dialog.component';
import { DetailsDialogComponent } from '../view-product/details-dialog/details-dialog.component';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css'],
})
export class ViewInventoryComponent implements OnInit {
  allInventory$ = new MatTableDataSource<Inventory>();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'name',
    'price',
    'quantity',
    'available',
    'select',
  ];
  constructor(
    private readonly appNavService: AppNavService,
    public dialog: MatDialog
  ) {}

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.allInventory$.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.appNavService.getInventory$.subscribe((item: Inventory[]) => {
      this.allInventory$.data = item;
      this.getNewInventory();
    });
  }

  ngAfterViewInit(): void {
    this.allInventory$.sort = this.sort;
  }

  getNewInventory(): void {
    this.appNavService.getNewInventory$.subscribe((item: Inventory) => {
      if (item && item.name !== '') {
        item.quantity = Number(item.quantity);
        this.allInventory$.data = [...this.allInventory$.data, item];
      }
    });
  }

  openDialog(item: Inventory): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(item: Inventory): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((newItem: Inventory) => {
      console.log('The edit dialog was closed');
      const updatedItems = this.allInventory$.data.filter(
        (ele: Inventory) => ele !== item
      );
      updatedItems.push(newItem);
      this.allInventory$.data = [...updatedItems];
      this.allInventory$.sort = this.sort;
    });
  }

  async deleteItem(item: Inventory) {
    Swal.fire({
      title: 'Delete Item',
      text: `Are you sure you want to delete ${item.name.toLowerCase()}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = this.allInventory$.data.filter(
          (inv) => item !== inv
        );
        this.allInventory$.data = [...updatedItems];
        this.allInventory$.sort = this.sort;
        Swal.fire('', `${item.name} deleted successfully`, 'success');
      }
    });
  }
}
