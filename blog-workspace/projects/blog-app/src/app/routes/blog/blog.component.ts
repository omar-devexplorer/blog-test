import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, tap, takeUntil, map } from 'rxjs';

import { BlogService } from '../../core/services/blog.service';
import { PostComment, User, UserModalComponent } from 'blog-lib';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  post$ = this.blogService.post$;
  comments: PostComment[] = [];

  constructor(private dialog: MatDialog, private blogService: BlogService) {}

  ngOnInit(): void {
    this.post$
      .pipe(
        map((post) => post.comments),
        tap((comments) => {
          if (comments) {
            this.comments = this.createTree(comments, null);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  openUserModal(userId: number | undefined): void {
    this.dialog.open(UserModalComponent, {
      data: { id: userId },
      panelClass: 'dialog',
      width: '900px',
      maxWidth: '100vw',
      height: 'auto',
    });
  }

  trackById(index: any, item: any): any {
    return item.id;
  }
}
