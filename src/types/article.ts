export interface IArticle {
  id: number;
  key: string;
  title: string;
  content: string;
  slug: string;
  images: IArticleImage[];
}
export interface IArticleImage {
  id: number;
  articleId: number;
  url: string;
}

export interface IAddArticle {
  title: string;
  content: string;
  picture: any;
}

export interface IEditArticle {
  title: string;
  content: string;
  id: string;
}