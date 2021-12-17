import { TestBed } from '@angular/core/testing';

import { UIErrorService } from './uierror.service';

describe('UIErrorService', () => {
  let service: UIErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
