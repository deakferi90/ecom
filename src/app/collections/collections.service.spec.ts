import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CollectionsService } from './collections.service';

describe('CollectionsService', () => {
  let service: CollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectionsService],
    });
    service = TestBed.inject(CollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
