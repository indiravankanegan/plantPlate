import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileServiceService } from '../profile-service.service';
import { RecipeService } from '../recipe.service';
import { Profile } from '../profile-model';
import { Recipe } from '../recipe-model';
import { LikedRecipesService } from '../liked-recipes.service';
import { likedRecipe } from '../liked-recipe-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-liked-recipes',
  templateUrl: './liked-recipes.component.html',
  styleUrls: ['./liked-recipes.component.css']
})
export class LikedRecipesComponent implements OnInit {
  public profile: Profile | undefined;
  public recipes: Recipe[] = [];

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
      this.likedRecipeService.getLikedRecipes(this.profile.id).subscribe((likedRecipes: likedRecipe[]) => {
        const recipeIds: number[] = likedRecipes.map(lr => lr.recipe_id);
        this.recipeService.getAllRecipes().subscribe((recipes: Recipe[]) => {
          this.recipes = recipes.filter(recipe => recipeIds.includes(recipe.id));
        });
      });
    }
  }

  goToDetails(id: number) {
    this.router.navigateByUrl(`recipe/${id}`, { state: { recipeId: id, profile: this.profile } });
  }

  removeFromLikedList(recipeId: number) {
    if (this.profile) {
      this.likedRecipeService.deleteLikedRecipe(this.profile.id, recipeId).subscribe(() => {
        // Remove the recipe from the displayed list
        this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
      });
    }
  }
}
