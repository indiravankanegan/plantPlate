import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileServiceService } from '../profile-service.service';
import { RecipeService } from '../recipe.service';
import { Profile } from '../profile-model';
import { Recipe } from '../recipe-model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileServiceService,
    private recipeService: RecipeService) 
    {}

  public profiles: Profile[] = []

  ngOnInit(): void {
    // this.profileService.getUpdatedProfileList()
    this.profileService.profileList$.subscribe(profiles => {
      this.profiles = profiles;
    });
  }
  
  deleteUser(id: number): void {
    this.profileService.deleteProfile(id).subscribe(() => {

      this.profileService.getNewList();
    });
  }
}
