export interface IArticle {
    articleId: number;
    title: string;
    topic: string[]; 
    type: string; 
    releaseDate: string;
    creationDate: string;
    snippet: string;
    content: string;
    thumbnailImageUrl: string;
    images: string[];
  }
  