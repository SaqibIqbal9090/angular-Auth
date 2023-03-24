import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {


  constructor(
    private songsservice: AuthService,
    private observer: BreakpointObserver,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {}
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.changeDetector.detectChanges();
    });
  }
  logout() {
    this.songsservice.UserSignout();
  }




}
