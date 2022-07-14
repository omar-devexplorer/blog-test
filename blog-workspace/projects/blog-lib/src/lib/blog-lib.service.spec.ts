import { TestBed } from '@angular/core/testing';

import { BlogLibService } from './blog-lib.service';

describe('BlogLibService', () => {
  let service: BlogLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
