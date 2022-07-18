import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommentFormComponent } from './comment-form.component';
import { rawPost } from 'projects/blog-app/src/app/core/mocks/rawPost';
import { PostComment } from 'blog-lib';
import { BlogService } from 'projects/blog-app/src/app/core/services/blog.service';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let comment: any = rawPost.comments?.find((comment) => comment.id === 1);
  let blogSpy: any;

  beforeEach(async () => {
    blogSpy = jasmine.createSpyObj('BlogService', ['changePost']);
    let blogService: BlogService;

    await TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: '',
        },
        FormBuilder,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            ...comment,
          },
        },
        {
          provide: MatSnackBar,
        },
        {
          provide: BlogService,
          useValue: 'blogSpy',
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide expected data', () => {
    expect(component.comment.id).toEqual(comment.id);
    expect(component.comment.timestamp).toEqual(comment.timestamp);
  });
});
