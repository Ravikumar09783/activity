import { TestBed } from '@angular/core/testing';

import { ActivityHubService } from './activity-hub.service';

describe('ActivityHubService', () => {
  let service: ActivityHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
