
import {db} from './db.mjs';
export class Step {

    #id
    #title
    #summary
    #image
    #sourceUrl
    #cookingMinutes //number
    #cheap //bool
    #cuisines //list
    #diets //list
    #dishTypes //list

    #ingredients

    constructor (id, title, summary, image, sourceUrl
        , cookingMinues, cheap
        , cuisines, diets, dishTypes
    ) {
        this.#id = id;
        this.#title = title;
        this.#summary = summary;
        this.#image = image;
        this.#sourceUrl = sourceUrl;
        this.#cookingMinutes = cookingMinues;
        this.#cheap = cheap;
        this.#cuisines = cuisines;
        this.#diets = diets;
        this.#dishTypes = dishTypes;
    }

    static async create(data) {
        if ((data !== undefined) && (data instanceof Object) 
        && (data.title !== undefined) 
        && (typeof data.title == 'string')
        && (typeof data.summary == 'string')
        && (typeof data.image == 'string')
        && (typeof data.sourceUrl == 'string')
        && (typeof data.cheap == 'boolean')
        && Array.isArray(data.cuisines) &&
        data.cuisines.every(item => typeof item == 'string') &&
        Array.isArray(data.diets) &&
        data.diets.every(item => typeof item == 'string') &&
        Array.isArray(data.dishTypes) &&
        data.dishTypes.every(item => typeof item == 'string')
    ) {

            try {
                let db_result = await db.run('insert into steps values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                data.title, data.summary, data.image, data.sourceUrl
                , data.cookingMinues, data.cheap
                , JSON.stringify(data.cuisines), JSON.stringify(data.diets), JSON.stringify(data.dishTypes)
            );

                let ing = new Step(db_result.lastID, data.title, data.summary, data.image, data.sourceUrl
                    , data.cookingMinues, data.cheap
                    , data.cuisines, data.diets, data.dishTypes
                );
                return ing;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getAllIDs() {
        try {
            let rows = await db.all('select id from steps');
            return rows.map(r => r.id);
        } catch (e) {
            return [];
        }
    }

    static async deleteStepByID(id) {
        try {
            await db.run('delete from steps where id = ?', id);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from steps where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Step(row.id, row.title, row.summary, row.image, row.sourceUrl
                    , row.cookingMinues, row.cheap
                    , JSON.parse(row.cuisines), JSON.parse(row.diets), JSON.parse(row.dishTypes)
                );
            }
        } catch (e) {
            return null;
        }
    }

    static async getAllSteps() {
        try {
            let rows = await db.all('select * from steps');
            return rows.map(row => ({
                id: row.id,
                title: row.title,
                summary: row.summary,
                image: row.image,
                sourceUrl: row.sourceUrl,
                cookingMinutes: row.cookingMinutes,
                cheap: row.cheap,
                cuisines: JSON.parse(row.cuisines),
                diets: JSON.parse(row.diets),
                dishTypes: JSON.parse(row.dishTypes)
            }));
        } catch (error) {
            console.error('Error fetching all steps:', error);
            return [];
        }
    }


    



    json() {
        return {
            id: this.#id,
            title: this.#title,
            summary: this.#summary,
            image: this.#image,
            sourceUrl: this.#sourceUrl,
            cookingMinues: this.#cookingMinutes,
            cheap: this.#cheap,
            cuisines: this.#cuisines,
            diets: this.#diets,
            dishTypes: this.#dishTypes
        }
    }

}