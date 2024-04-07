import { Component, Renderer2, ViewChild, HostListener, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { OverlayService } from './home/overlay.service';
import { FooterComponent } from "./footer/footer.component";
import { SearchService } from './home/search.service';
import { IArticle } from './articles/article';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, FooterComponent, MatListModule, MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule, RouterModule, FooterComponent]
})

export class AppComponent implements OnInit{
  title = 'BastelBits';
  
  isMobile: boolean = true;  
  isScrolled: boolean = false;
  isOverlayOpen: boolean = false; 

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable | undefined;

  constructor(private observer: BreakpointObserver,
              private overlayService: OverlayService,
              private renderer: Renderer2,
              private router: Router,
              private searchService: SearchService) { }


  ngOnInit() {

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
