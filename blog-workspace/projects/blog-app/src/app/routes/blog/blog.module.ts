import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { BlogComponent } from './blog.component';
import { StarRateModule, UserModalModule } from 'blog-lib';
import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';

@NgModule({
  declarations: [BlogComponent, CommentComponent, CommentFormComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    UserModalModule,
    StarRateModule,
  ],
})
export class BlogModule {}
