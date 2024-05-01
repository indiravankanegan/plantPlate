import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { likedRecipe } from './liked-recipe-model';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LikedRecipesService {
  private likedRecipesSubject: BehaviorSubject<likedRecipe[]> = new BehaviorSubject<likedRecipe[]>([]);
  public likedRecipes$: Observable<likedRecipe[]> = this.likedRecipesSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  addLikedRecipe(user_id: number, recipe_id: number): Observable<any> {
    const likedRecipe = { user_id, recipe_id };
    return this.httpClient.post<any>('http://localhost:3000/likedRecipes', likedRecipe);
  }

  // Delete a liked recipe
  deleteLikedRecipe(user_id: number, recipe_id: number): Observable<any> {
    const likedRecipe = { user_id, recipe_id };
    return this.httpClient.delete<any>(`http://localhost:3000/likedRecipes`, { body: likedRecipe });
  }

  getLikedRecipes(userId: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/likedRecipes/${userId}`);
  }

  checkIfRecipeIsLiked(user_id: number, recipe_id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:3000/likedRecipes/${user_id}/${recipe_id}/exists`);
  }
  
  fetchLikedRecipes(userId: number): Observable<likedRecipe[]> {
    return this.httpClient.get<likedRecipe[]>(`http://localhost:3000/likedRecipes/${userId}`).pipe(
      tap(
        (recipes: likedRecipe[]) => {
          this.likedRecipesSubject.next(recipes);
        },
        (error: any) => {
          console.error('Error fetching liked recipes:', error);
        }
      )
    );
  }

  
}
