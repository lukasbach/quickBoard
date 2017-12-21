import { TestBed, inject } from '@angular/core/testing';

import { ProjectdataService } from './projectdata.service';

describe('ProjectdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectdataService]
    });
  });

  it('should be created', inject([ProjectdataService], (service: ProjectdataService) => {
    expect(service).toBeTruthy();
  }));
});
