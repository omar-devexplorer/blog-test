import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Post, PostComment, User } from 'blog-lib';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private post: Subject<Post> = new Subject<Post>();
  post$: Observable<Post> = this.post.asObservable();

  private readonly url = 'http://localhost:3000';

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  getPost(): Observable<Post> {
    return this.http
      .get<Post>(`${this.url}/post`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getUser(userId: number): Observable<User> {
    return this.http
      .get<User>(`${this.url}/users/${userId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.url}/users`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  createComment(post: Post): Observable<Post> {
    return this.http
      .post<Post>(`${this.url}/post`, post)
      .pipe(catchError((err) => this.handleError(err)));
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

  private handleError(err: any) {
    this.snackbar.open(
      'Verifique se o server está ativo. Para ativar execute: "json-server --watch db.json" na pasta db. ' +
        err.message,
      'Ok'
    );

    return throwError(() => err);
  }
}
