import {db} from './db.mjs';
export class Ingredient {

    #id
    #name
    #last_name
    #username
    #password
    #vegan_experience
    #cooking_frequency
    #cooking_experience
    #experimental
    #dietary_restrictions
    #food_preferences
    #meal_types

    constructor (id, name, last_name, username, password, vegan_experience, cooking_experience, cooking_frequency, experimental, dietary_restrictions, food_preferences, meal_types) {
        this.#id = id;
        this.#name = name;
        this.#last_name = last_name;
        this.#username = username;
        this.#password = password;
        this.#vegan_experience = vegan_experience;
        this.#cooking_experience = cooking_experience;
        this.#cooking_frequency = cooking_frequency;
        this.#experimental = experimental;
        this.#dietary_restrictions = dietary_restrictions;
        this.#food_preferences = food_preferences;
        this.#meal_types = meal_types;
        
    }

    static async create(data) {
        if ((data !== undefined) && (data instanceof Object) 
        && (data.name !== undefined) 
        && (typeof data.name == 'string')
        && (typeof data.last_name == 'string')
        && (typeof data.username == 'string')
        && (typeof data.password == 'string')
        && (typeof data.vegan_experience == 'string')
        && (typeof data.cooking_experience == 'string')
        && (typeof data.cooking_frequency == 'string')
        && (typeof data.experimental == 'boolean')
        && Array.isArray(data.dietary_restrictions) &&
        data.dietary_restrictions.every(item => typeof item == 'string') &&
        Array.isArray(data.food_preferences) &&
        data.food_preferences.every(item => typeof item == 'string') &&
        Array.isArray(data.meal_types) &&
        data.meal_types.every(item => typeof item == 'string')
    ) {

            try {
                let db_result = await db.run('insert into ingredients values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                data.name, data.last_name, data.username, data.password, data.vegan_experience, data.cooking_experience, data.cooking_frequency, data.experimental, JSON.stringify(data.dietary_restrictions), JSON.stringify(data.food_preferences), JSON.stringify(data.meal_types));

                let ing = new Ingredient(db_result.lastID, data.name, data.last_name, data.username, data.password, data.vegan_experience, data.cooking_experience, data.cooking_frequency, data.experimental, data.dietary_restrictions, data.food_preferences, data.meal_types);
                return ing;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getAllIDs() {
        try {
            let rows = await db.all('select id from ingredients');
            return rows.map(r => r.id);
        } catch (e) {
            return [];
        }
    }

    static async getAllIngredients() {
        try {
            let rows = await db.all('select * from ingredients');
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                last_name: row.last_name,
                username: row.username,
                password: row.password,
                vegan_experience: row.vegan_experience,
                cooking_experience: row.cooking_experience,
                cooking_frequency: row.cooking_frequency,
                experimental: row.experimental,
                dietary_restrictions: JSON.parse(row.dietary_restrictions),
                food_preferences: JSON.parse(row.food_preferences),
                meal_types: JSON.parse(row.meal_types)
            }));
        } catch (error) {
            console.error('Error fetching all ingredients:', error);
            return [];
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from ingredients where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Ingredient(row.id, row.name, row.last_name, row.username, row.password, row.vegan_experience, row.cooking_experience, row.cooking_frequency, row.experimental, JSON.parse(row.dietary_restrictions), JSON.parse(row.food_preferences), JSON.parse(row.meal_types));
            }
        } catch (e) {
            return null;
        }
    }

    static async deleteIngredientByID(id) {
        try {
            await db.run('delete from ingredients where id = ?', id);
            return true;
        } catch (e) {
            return false;
        }
    }

    json() {
        return {
            id: this.#id,
            name: this.#name,
            last_name: this.#last_name,
            username: this.#username,
            password: this.#password,
            vegan_experience: this.#vegan_experience,
            cooking_experience: this.#cooking_experience,
            cooking_frequency: this.#cooking_frequency,
            experimental: this.#experimental,
            dietary_restrictions: this.#dietary_restrictions,
            food_preferences: this.#food_preferences,
            meal_types: this.#meal_types

        }
    }

    getID() {
        return this.#id;
    }

    async setValues(data) {

        if ((data !== undefined) && (data instanceof Object) 
        && (data.name !== undefined) 
        && (typeof data.name == 'string')
        && (typeof data.last_name == 'string')
        && (typeof data.username == 'string')
        && (typeof data.password == 'string')
        && (typeof data.vegan_experience == 'string')
        && (typeof data.cooking_experience == 'string')
        && (typeof data.cooking_frequency == 'string')
        && (typeof data.experimental == 'boolean')
        && Array.isArray(data.dietary_restrictions) &&
        data.dietary_restrictions.every(item => typeof item == 'string') &&
        Array.isArray(data.food_preferences) &&
        data.food_preferences.every(item => typeof item == 'string') &&
        Array.isArray(data.meal_types) &&
        data.meal_types.every(item => typeof item == 'string')
    ) {

            try {
                let db_result = await db.run('update ingredients set name = ?, last_name = ?, username = ?, password = ?, vegan_experience = ?, cooking_experience = ?, cooking_frequency = ?, experimental = ?, dietary_restrictions = ?, food_preferences = ?, meal_types = ? where id = ?', 
                data.name, data.last_name, data.username, data.password, data.vegan_experience, data.cooking_experience, data.cooking_frequency, data.experimental, JSON.stringify(data.dietary_restrictions), JSON.stringify(data.food_preferences), JSON.stringify(data.meal_types), this.#id);

                let ing = new Ingredient(this.#id, data.name, data.last_name, data.username, data.password, data.vegan_experience, data.cooking_experience, data.cooking_frequency, data.experimental, data.dietary_restrictions, data.food_preferences, data.meal_types);
                return ing;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    async setName(data) {
        try {
            this.#name = data.name;
            this.#last_name = data.last_name;
            this.#username = data.username;
            this.#password = data.password;
            this.#vegan_experience = data.vegan_experience;
            this.#cooking_experience = data.cooking_experience;
            this.#cooking_frequency = data.cooking_frequency;
            this.#experimental = data.experimental;
            this.#dietary_restrictions = JSON.stringify(data.dietary_restrictions);
            this.#food_preferences = JSON.stringify(data.food_preferences);
            this.#meal_types = JSON.stringify(data.meal_types);
            await db.run('update ingredients set name = ?, last_name = ?, username = ?, password = ?, vegan_experience = ?, cooking_experience = ?, cooking_frequency = ?, experimental = ?, dietary_restrictions = ?, food_preferences = ?, meal_types = ? where id = ?', this.#name, this.#last_name, this.#username, this.#password, this.#vegan_experience, this.#cooking_experience, this.#cooking_frequency, this.#experimental, this.#dietary_restrictions, this.#food_preferences, this.#meal_types, this.#id);
            return new Ingredient(this.#id, this.#name, this.#last_name, this.#username, this.#password, this.#vegan_experience, this.#cooking_experience, this.#cooking_frequency, this.#experimental, JSON.parse(this.#dietary_restrictions), JSON.parse(this.#food_preferences), JSON.parse(this.#meal_types));

        } catch (e) {
            return false;
        }
    }

    // async setValues(data) {
    //     if ((data !== undefined) && (data instanceof Object) 
    //     && (data.name !== undefined) 
    //     && (typeof data.name == 'string')
    //     && (typeof data.last_name == 'string')
    //     && (typeof data.username == 'string')
    //     && (typeof data.password == 'string')
    //     && (typeof data.vegan_experience == 'string')
    //     && (typeof data.cooking_experience == 'string')
    //     && (typeof data.cooking_frequency == 'string')
    //     && (typeof data.experimental == 'boolean')
    //     && Array.isArray(data.dietary_restrictions) &&
    //     data.dietary_restrictions.every(item => typeof item == 'string') &&
    //     Array.isArray(data.food_preferences) &&
    //     data.food_preferences.every(item => typeof item == 'string') &&
    //     Array.isArray(data.meal_types) &&
    //     data.meal_types.every(item => typeof item == 'string')
    // ) {

    //         try {
    //             let db_result = await db.run(`UPDATE ingredients SET 
    //             name=${data.name}, last_name=${data.last_name}, username=${data.username}, password=${data.password}, vegan_experience=${data.vegan_experience}, cooking_experience=${data.cooking_experience}, cooking_frequency=${data.cooking_frequency}, experimental=${data.experimental}, dietary_restrictions=${JSON.stringify(data.dietary_restrictions)}, food_preferences=${JSON.stringify(data.food_preferences)}, meal_types=${data.meal_types}`)

    //             let ing = new Ingredient(db_result.lastID, data.name, data.last_name, data.username, data.password, data.vegan_experience, data.cooking_experience, data.cooking_frequency, data.experimental, data.dietary_restrictions, data.food_preferences, data.meal_types);
    //             return ing;
    //         } catch (e) {
    //             return null;
    //         }
    //     }
    //     return null;
    // }
    

    // async setValues(new_name) {
    //     try {
    //         await db.run('update ingredients set name = ? where id = ?', this.#name, this.#id);
    //         this.#name = new_name;
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // }
}