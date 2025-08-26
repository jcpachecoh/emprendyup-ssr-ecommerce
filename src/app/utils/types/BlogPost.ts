// Datos centralizados del blog
export interface BlogPost {
  id: string;
  title: string;
  desc: string;
  date: string;
  image: string;
  slug: string;
  tags: string[];
  keywords: string;
  author: string;
  imageAlt: string;
  content: string;
  readTime: string;
}
