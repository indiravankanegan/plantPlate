import {db} from './db.mjs';

// Use the db object to run table creation commands and otherwise initialize your database setup here.

await db.run('CREATE TABLE ingredients (id INTEGER PRIMARY KEY, name TEXT(100) NOT NULL, last_name TEXT, username TEXT, password TEXT, vegan_experience TEXT, cooking_experience TEXT, cooking_frequency TEXT, experimental BOOLEAN, dietary_restrictions TEXT, food_preferences TEXT, meal_types TEXT)');

await db.run('CREATE TABLE steps (id INTEGER PRIMARY KEY, title TEXT, summary TEXT, image TEXT, sourceUrl TEXT, cookingMinutes INTEGER, cheap BOOLEAN, cuisines TEXT, diets TEXT, dishTypes TEXT)');

await db.run('CREATE TABLE LikedRecipes (id INTEGER PRIMARY KEY, user_id INTEGER, recipe_id INTEGER, FOREIGN KEY (user_id) REFERENCES ingredients(id), FOREIGN KEY (recipe_id) REFERENCES steps(id))');

db.close();