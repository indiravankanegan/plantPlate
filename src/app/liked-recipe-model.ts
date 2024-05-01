export class likedRecipe {
    id: number;
    recipe_id: number;
    user_id: number;

    constructor(id: number, recipe_id: number, user_id: number) {
        this.id = id;
        this.recipe_id = recipe_id;
        this.user_id = user_id;
    }
}