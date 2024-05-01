import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe-model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'] // Fix typo in styleUrls
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  public recipeID: number | undefined;
  public recipe: Recipe | undefined;
  private recipeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeID = +params['id']; // Parse 'id' to a number

      this.recipeSubscription = this.recipeService.getRecipeByID(this.recipeID!).subscribe(
        recipe => {
          this.recipe = recipe;
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }

  isRecipe(): boolean {
    return !!this.recipe; // Change to return whether recipe is defined or not
  }
}
