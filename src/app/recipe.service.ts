import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from './recipe-model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeListSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  public recipeList$: Observable<Recipe[]> = this.recipeListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchAndAddRecipes(); // Fetch initial recipes
  }

  addRecipe(recipe: Recipe): void {
    if (!this.isRecipe(recipe)) {
      this.recipeListSubject.next([...this.recipeListSubject.getValue(), recipe]);
    }
  }

  isRecipe(recipe: Recipe): boolean {
    return !!this.recipeListSubject.getValue().find(r => r.id === recipe.id);
  }

  getRecipeByID(id: number): Observable<Recipe | undefined> {
    return this.recipeList$.pipe(
      map(recipes => recipes.find(recipe => recipe.id === id))
    );
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.recipeList$;
  }

  fetchAndAddRecipes(): void {
    this.http.get<any[]>('http://localhost:3000/steps').pipe(
      map(recipesData => recipesData.map(recipeData => this.mapToRecipe(recipeData)))
    ).subscribe(recipes => {
      this.recipeListSubject.next(recipes);
    });
  }

  private mapToRecipe(data: any): Recipe {
    return new Recipe(
      data.id,
      data.title,
      data.summary,
      data.image,
      data.sourceUrl,
      data.cheap as boolean,
      data.cuisines,
      data.diets,
      data.dishTypes
    );
  }
}
