import { TestBed } from '@angular/core/testing';

import { LikedRecipesService } from './liked-recipes.service';

describe('LikedRecipesService', () => {
  let service: LikedRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
