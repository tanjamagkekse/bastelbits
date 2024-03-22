import { Component, Renderer2, ViewChild, HostListener, AfterViewInit, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterEvent, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { OverlayService } from './home/overlay.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, MatListModule, MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule, RouterModule]
})

export class AppComponent implements OnInit{
  title = 'BastelBits';
  
  isMobile= true;  
  isScrolled: boolean = false;
  isOverlayOpen: boolean = false; 

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable | undefined;

  constructor(private observer: BreakpointObserver,
              private overlayService: OverlayService,
              private renderer: Renderer2,
              private router: Router) {
              }


  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        // this.isMobile = false;
      }
    });
    
    //listens to overlay service and hide logo parts if image is scrolled
    this.overlayService.overlayStatus$.subscribe(status => {
      this.isOverlayOpen = status;
      if (this.isOverlayOpen) {
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
      } else {
        this.renderer.setStyle(document.body, 'overflow', 'auto');
      }
    });

    // close sidenav if navigation starts
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.sidenav.close();
      }
    });
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 15;
  }
}
