import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap, take } from 'rxjs';

import { BlogService } from 'projects/blog-app/src/app/core/services/blog.service';
import { PostComment, User, UserModalComponent } from 'blog-lib';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: PostComment | undefined;

  constructor(private dialog: MatDialog, private blogService: BlogService) {}

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

  openCommentForm(comment: PostComment | undefined): void {
    this.dialog.open(CommentFormComponent, {
      data: { ...comment },
      panelClass: 'dialog',
      width: '900px',
      maxWidth: '100vw',
      height: 'auto',
    });
  }

  async shareComment(comment: PostComment | undefined): Promise<void> {
    if (navigator.share) {
      const shareData = {
        title: comment?.content.slice(0, 50) + '...',
        url: '/blog',
      };

      await navigator.share(shareData);
    }
  }

  reportComment(comment: PostComment | undefined): void {
    alert(
      'Comentário "' +
        comment?.content.slice(0, 50) +
        '..."' +
        ', reportado com sucesso!'
    );
  }

  trackById(index: any, item: any): any {
    return item.id;
  }
}
