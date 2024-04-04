import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.css'
})
export class DatenschutzComponent implements OnInit {

  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.addTag({name: 'robots', content: 'noindex'});
  }
}