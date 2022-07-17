import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pipe, take, tap } from 'rxjs';

import { BlogService } from 'projects/blog-app/src/app/core/services/blog.service';
import { PostComment } from 'blog-lib';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public comment: PostComment,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.commentForm = this.fb.group({
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  get content() {
    return this.commentForm.get('content');
  }

  replayComment(): void {
    this.blogService
      .getPost()
      .pipe(
        tap((post) => {
          if (!post) return;

          const comments = post.comments;
          const id = comments?.length ? comments?.length + 1 : 0;
          const respondsTo = {
            id: this.comment.id,
          };
          const content = this.commentForm.value.content;

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

          this.blogService
            .createComment({ ...post })
            .pipe(
              take(1),
              tap((post) => {
                this.blogService.changePost(post);
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
