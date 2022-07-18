import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { BlogService } from './blog.service';
import { Post, PostComment, User } from 'blog-lib';
import { users } from '../mocks/users';
import { rawPost } from '../mocks/rawPost';

describe('BlogService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;
  let blogService: BlogService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    httpTestingController = TestBed.inject(HttpTestingController);
    blogService = new BlogService(httpClientSpy, snackBar);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(blogService).toBeTruthy();
  });

  it('should return expected post (HttpClient called once)', (done: DoneFn) => {
    const expectedPost: Post = rawPost;

    httpClientSpy.get.and.returnValue(of(expectedPost));

    blogService.getPost().subscribe({
      next: (post) => {
        expect(post).withContext('expected post').toEqual(expectedPost);
        done();
        console.log('raw post returned: ', post);
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return expected users (HttpClient called once)', (done: DoneFn) => {
    const expectedUsers: User[] = users;

    httpClientSpy.get.and.returnValue(of(expectedUsers));

    blogService.getUsers().subscribe({
      next: (users) => {
        expect(users).withContext('expected users').toEqual(expectedUsers);
        done();
        console.log('users returned: ', users);
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return expected user (HttpClient called once)', (done: DoneFn) => {
    const expectedUser: User = users[5];

    httpClientSpy.get.and.returnValue(of(expectedUser));

    blogService.getUser(6).subscribe({
      next: (user) => {
        expect(user).withContext('expected user').toEqual(expectedUser);
        done();
        console.log('user returned: ', user);
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should add a comment in the post and return it (HttpClient called once)', (done: DoneFn) => {
    const expectedPost: Post = rawPost;

    const comment: PostComment = {
      id: 10,
      respondsTo: { id: 6 },
      author: {
        id: 7,
        username: 'José da Silva',
      },
      timestamp: '2022-07-16T19:50',
      content: 'Comentário teste post...',
    };

    expectedPost.comments?.push(comment);

    httpClientSpy.post.and.returnValue(of({ ...expectedPost }));

    blogService.addComment({ ...expectedPost }).subscribe({
      next: (post) => {
        expect(post)
          .withContext('expected post')
          .toEqual({ ...expectedPost });
        done();
        console.log('new comment returned: ', post.comments?.slice(-1));
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('should create a tree of comments', () => {
    const post: Post = rawPost;

    const comments: PostComment[] | undefined = post.comments;

    const parentId = 3;

    const parentComment = {
      id: 3,
      respondsTo: {
        id: 2,
      },
      author: {
        id: 4,
        username: 'Clara Passos',
      },
      timestamp: '2019-02-23T07:48',
      content:
        'Ainda assim, existem dúvidas a respeito de como a execução dos pontos do programa representa uma abertura para a melhoria da gestão inovadora da qual fazemos parte.',
    };

    const childrenComments = [
      {
        id: 4,
        respondsTo: {
          id: 3,
        },
        author: {
          id: 5,
          username: 'Mauro Andrade',
        },
        timestamp: '2019-02-28T07:08',
        content: 'Concordo plenamente, Clara!',
      },
      {
        id: 5,
        respondsTo: {
          id: 3,
        },
        author: {
          id: 6,
          username: 'Rafaela Moreira',
        },
        timestamp: '2019-02-28T08:21',
        content: 'Discordo veementemente, Clara!',
      },
    ];

    const treeComments = {
      ...parentComment,
      children: childrenComments,
    };

    expect(
      comments?.filter(
        (comment: PostComment) => comment.respondsTo?.id === parentId
      )
    ).toEqual(childrenComments);

    expect(
      [parentComment]?.reduce(
        (tree: any, comment: PostComment) => [
          ...tree,
          {
            ...comment,
            children: childrenComments,
          },
        ],
        []
      )
    ).toEqual([treeComments]);
  });
});
