import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleViewComponent } from './article-view.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('ArticleViewComponent', () => {
  let component: ArticleViewComponent;
  let fixture: ComponentFixture<ArticleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleViewComponent, RouterModule.forRoot([]), HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
