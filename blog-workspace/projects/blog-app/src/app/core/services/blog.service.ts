import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Post, rawPost } from 'blog-lib';

@Injectable({
  providedIn: 'root',
})
export class BlogService implements OnDestroy {
  private post: BehaviorSubject<Post> = new BehaviorSubject<Post>(rawPost);
  post$: Observable<Post> = this.post.asObservable();

  constructor() {}

  ngOnDestroy(): void {
    this.post.complete();
  }

  replayComment(content: string, respondsTo: { id: number } | null): void {
    const post = rawPost;
    const comments = post.comments;
    const id = comments?.length ? comments?.length + 1 : 0;

    const comment = {
      id,
      respondsTo,
      author: {
        id: 7,
        username: 'José da Silva',
      },
      timestamp: '2022-07-16T19:50',
      content,
    };

    post.comments?.push(comment);

    this.post.next({ ...post });
  }
}
