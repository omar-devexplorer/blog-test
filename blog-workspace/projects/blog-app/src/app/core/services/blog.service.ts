import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, take, tap } from 'rxjs';

import { Post, PostComment, User } from 'blog-lib';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private post: Subject<Post> = new Subject<Post>();
  post$: Observable<Post> = this.post.asObservable();

  private readonly url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPost(): Observable<Post> {
    return this.http.get<Post>(`${this.url}/post`);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  createComment(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.url}/post`, post);
  }

  createTree(comments: PostComment[], parent: number | null): PostComment[] {
    return comments
      .filter(
        (comment: PostComment) =>
          comment.respondsTo === parent || comment.respondsTo?.id === parent
      )
      .reduce(
        (tree: any, comment: PostComment) => [
          ...tree,
          {
            ...comment,
            children: this.createTree(comments, comment.id),
          },
        ],
        []
      );
  }

  changePost(post: Post): void {
    this.post.next({ ...post });
  }
}
