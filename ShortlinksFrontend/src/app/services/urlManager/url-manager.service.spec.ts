import { TestBed } from '@angular/core/testing';

import { UrlManagerService } from './url-manager.service';

describe('UrlManagerService', () => {
  let service: UrlManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
