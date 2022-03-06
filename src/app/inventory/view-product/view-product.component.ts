import { Component, Input, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/inventory.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  @Input() viewItem!: Inventory;
  constructor() {}

  ngOnInit(): void {}
}
