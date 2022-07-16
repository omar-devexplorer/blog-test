import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PostComment } from 'blog-lib';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  @Input() comment: PostComment | undefined;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCommentForm(comment: PostComment | undefined): void {
    this.dialog.open(CommentFormComponent, {
      data: { ...comment },
      panelClass: 'comment-form-dialog',
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
