import { TestBed } from '@angular/core/testing';

import { UIFileReaderService } from './uifile-reader.service';

describe('UIFileReaderService', () => {
  let service: UIFileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIFileReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
