import {db} from './db.mjs';
export class LikedRecipes {
    #id;
    #recipe_id;
    #user_id

    constructor(id, recipeID, profileID) {
        this.#id = id;
        this.#recipe_id = recipeID;
        this.#user_id = profileID;
    }

    static async getByUserId(userId) {
        try {
            const likedRecipes = await db.all('SELECT * FROM LikedRecipes WHERE user_id = ?', userId);
            return likedRecipes;
        } catch (error) {
            throw error;
        }
    }

    static async create(userId, recipeId) {
        try {
            const dbResult = await db.run('INSERT INTO LikedRecipes (user_id, recipe_id) VALUES (?, ?)', userId, recipeId);
            const newLikedRecipe = {
                id: dbResult.lastID,
                user_id: userId,
                recipe_id: recipeId
            };
            return newLikedRecipe;
        } catch (error) {
            throw error;
        }
    }

    static async delete(data) {
        const { user_id, recipe_id } = data;
        try {
            await db.run('DELETE FROM LikedRecipes WHERE user_id = ? AND recipe_id = ?', user_id, recipe_id);
        } catch (error) {
            throw error;
        }
    }

    static async exists(userId, recipeId) {
        try {
            const dbResult = await db.get('SELECT COUNT(*) AS count FROM LikedRecipes WHERE user_id = ? AND recipe_id = ?', userId, recipeId);
            return dbResult.count > 0; // Returns true if a record exists, false otherwise
        } catch (error) {
            throw error;
        }
    }

    
}