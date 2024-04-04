import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.css'
})

export class ImpressumComponent implements OnInit {

  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.addTag({name: 'robots', content: 'noindex'});
  }
}