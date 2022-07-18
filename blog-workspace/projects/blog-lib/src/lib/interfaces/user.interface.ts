import { Post } from './post.interface';

export interface User {
  id: number;
  username: string;
  memberSince: string;
  friendIds: number[];
  friendNames?: string[];
  posts: Post[];
}
