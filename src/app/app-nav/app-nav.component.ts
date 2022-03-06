import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppNavService } from './app-nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css'],
})
export class AppNavComponent implements OnInit {
  title = 'Shop Bridge';
  mobileQuery: MediaQueryList;
  header: string = '';

  private _mobileQueryListener: () => void;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private readonly appNavService: AppNavService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.appNavService.pageHeaderCast$.subscribe((head: string) => {
      this.header = head;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
