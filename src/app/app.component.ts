import { Component, Renderer2, ViewChild, HostListener, AfterViewInit, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkScrollable } from '@angular/cdk/scrolling';


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

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable | undefined;


  constructor(private observer: BreakpointObserver, 
              private renderer: Renderer2) {}


  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        // this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 15;
    console.log(window.scrollY)
  }
}
