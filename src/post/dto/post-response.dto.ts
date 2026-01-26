import { Post } from '../entities/post.entity';

export class PostResponseDto {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly excerpt: string;
  readonly coverImageUrl: string | null;
  readonly published: boolean;
  readonly createdAt: Date;
  readonly updateAt: Date;
  readonly author: {
    id: string;
    email: string;
    name: string;
  };

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.slug = post.slug;
    this.content = post.content;
    this.excerpt = post.excerpt;
    this.coverImageUrl = post.coverageImageUrl;
    this.published = post.published;
    this.createdAt = post.createdAt;
    this.updateAt = post.updatedAt;
    this.author = {
      id: post.author.id,
      name: post.author.email,
      email: post.author.email,
    };
  }
}
