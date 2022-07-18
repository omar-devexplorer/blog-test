import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, tap, takeUntil, map, take } from 'rxjs';

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
    this.blogService
      .getPost()
      .pipe(
        take(1),
        tap((post) => {
          this.blogService.changePost(post);
        })
      )
      .subscribe();

    this.post$
      .pipe(
        map((post) => post.comments),
        tap((comments) => {
          if (comments) {
            this.comments = this.blogService.createTree(comments, null);
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

  openUserModal(userId: number | undefined): void {
    if (!userId) return;

    const user$ = this.blogService.getUser(userId);

    user$
      .pipe(
        take(1),
        tap((user: User) => this.findFriendsNames(user))
      )
      .subscribe();
  }

  private findFriendsNames(user: User): void {
    this.blogService
      .getUsers()
      .pipe(
        take(1),
        tap((users) => {
          if (!users) return;
          let friendNames: any[] = [];

          user.friendIds.forEach((friendId) => {
            const friend = users.find((u) => u.id === friendId);
            friendNames.push(friend?.username);
          });

          this.openDialog({ ...user, friendNames });
        })
      )
      .subscribe();
  }

  private openDialog(user: User): void {
    this.dialog.open(UserModalComponent, {
      data: { ...user },
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
