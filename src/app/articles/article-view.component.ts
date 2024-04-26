import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from './article.service';
import { IArticle } from './article';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { OverlayService } from '../home/overlay.service';
import { CarouselComponent } from "../carousel/carousel.component";


@Component({
    selector: 'app-article-view',
    standalone: true,
    templateUrl: './article-view.component.html',
    styleUrl: './article-view.component.css',
    imports: [CommonModule, RouterModule, CarouselComponent]
})


export class ArticleViewComponent implements OnInit, OnDestroy {
  errorMessage = '';
  article: IArticle | undefined; 
  imagesSubset: Array<string> | undefined;
  
  
  private articleSubscription: Subscription | undefined;


  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private http: HttpClient,
              private overlayService: OverlayService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getArticle(id);
    }
    this.overlayService.setOverlayStatus(true);
  }

  getArticle(id: number): void {
    this.articleSubscription = this.articleService.getArticleById(id).subscribe({
      
      next: article => {
        // if it is a text article
        if (article?.type =="text") {
          // check the html content
          this.http.get(article.content, {responseType: 'text'}).subscribe(htmlContent => {
            // and use it as article
            this.article = { ...article, content: htmlContent };
            //create a NEW array instead of referencing to the other one
            this.imagesSubset = this.article.images.slice();
            this.insertImages();
            
          });
        } else {
          this.article = article;
        }
      },
      error: err => this.errorMessage = err
    });
  }

  insertImages(){
    if (this.article) {
      let updatedContent = this.article.content;
  
      // repeat until all placeholders are filled or images are empty
      while ((updatedContent.match(/{{img(\d+)}}/) ?? []).length > 0) {
        const num = parseInt(updatedContent.match(/{{img(\d+)}}/)![1]);    
        let imageHtml = '';
        
        // add images as long as there are space and images
        if(this.imagesSubset && this.imagesSubset?.length>0){
          imageHtml = "<div class='row mt-4 mb-2 justify-content-center align-items-center'>"
          //add as much images as specified in {{img*}}

          for (let i = 0; i < num && this.imagesSubset.length > 0; i++) {
            imageHtml += `
              <div class='col-md-4'>
                <img alt="${this.imagesSubset[0]}" 
                    src="${this.imagesSubset[0]}" 
                    class='img-fluid w-100 mb-3 rounded image-shadow' />
              </div>`;

            // delete this element from subset to avoid doubles
            this.imagesSubset.shift();
          }
          imageHtml += "</div>"
        }
        else{
          console.log("hier stimmt was nicht - ich arbeite dran")
          break;
        }
        // delete match from updatedContent
        updatedContent = updatedContent.replace(/{{img(\d+)}}/, imageHtml); 

      }
  
      this.article.content = updatedContent;
    }
  }


  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    this.overlayService.setOverlayStatus(false);
  }

}
