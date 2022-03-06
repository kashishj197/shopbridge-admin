import { Component, OnInit } from '@angular/core';
import { AppNavService } from '../app-nav/app-nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  constructor(private readonly appNavService: AppNavService) {}

  ngOnInit(): void {
    this.appNavService.setHeader = 'Dashboard';
  }
}
