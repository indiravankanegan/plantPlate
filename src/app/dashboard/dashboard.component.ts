import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileServiceService } from '../profile-service.service';
import { RecipeService } from '../recipe.service';
import { Profile } from '../profile-model';
import { Recipe } from '../recipe-model';
import { LikedRecipesService } from '../liked-recipes.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public profile: Profile | undefined;
  public recipes: Recipe[] = [];
  private recipeSubscription: Subscription | undefined;
  private likedRecipeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileServiceService,
    private recipeService: RecipeService,
    private likedRecipeService: LikedRecipesService
  ) {}

  ngOnInit(): void {
    this.profile = history.state.profile;
    if (this.profile) {
      this.recipeSubscription = this.recipeService.getAllRecipes().subscribe(
        recipes => {
          this.recipes = recipes;
          // Subscribe to liked recipes to update heart icons
          this.likedRecipeSubscription = this.likedRecipeService.getLikedRecipes(this.profile!.id).subscribe(
            likedRecipes => {
              this.recipes.forEach(recipe => {
                recipe.liked = likedRecipes.some((lr: { recipe_id: number; }) => lr.recipe_id === recipe.id);
              });
            }
          );
        }
      );
    }
  }

  goToLikedRecipes() {
    this.router.navigateByUrl(`${this.profile?.username}/liked-recipes`, { state: { profile: this.profile } });
  }

  ngOnDestroy(): void {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
    if (this.likedRecipeSubscription) {
      this.likedRecipeSubscription.unsubscribe();
    }
  }

  updateProfile() {
    const profile = this.profile;
    this.router.navigateByUrl(`/${this.profile?.username}/update`, { state: { profile } });
  }

  goToDetails(id: number) {
    this.router.navigateByUrl(`recipe/${id}`, { state: { recipeId: id, profile: this.profile } });
  }

  toggleLike(recipe: Recipe) {
    if (recipe.liked) {
      // Remove from liked list
      this.likedRecipeService.deleteLikedRecipe(this.profile!.id, recipe.id).subscribe(() => {
        recipe.liked = false;
      });
    } else {
      // Add to liked list
      this.likedRecipeService.addLikedRecipe(this.profile!.id, recipe.id).subscribe(() => {
        recipe.liked = true;
      });
    }
  }

  isRoot(): boolean {
    return this.profile?.username === 'root' && this.profile.id === 1;
  }

  manageUsers() {
    this.router.navigateByUrl(`/manage`);
  }
}
