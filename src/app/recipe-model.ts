export class Recipe {
    id: number;
    title: string;
    cuisines: string[];
    diets: string[];
    dishTypes: string[];
    summary: string;
    cheap: boolean;
    image: string;
    sourceUrl: string;
    public liked?: boolean

    // this.#id = id;
    // this.#title = title;
    // this.#summary = summary;
    // this.#image = image;
    // this.#sourceUrl = sourceUrl;
    // this.#cookingMinutes = cookingMinues;
    // this.#cheap = cheap;
    // this.#cuisines = cuisines;
    // this.#diets = diets;
    // this.#dishTypes = dishTypes;

    constructor(
        id: number,
        title: string,
        summary: string,
        image: string,
        sourceUrl: string,
        cheap: boolean,
        cuisines: string[],
        diets: string[],
        dishTypes: string[]
    ) {
        this.id = id;
        this.title = title;
        this.cuisines = cuisines;
        this.diets = diets;
        this.dishTypes = dishTypes;
        this.summary = summary;
        this.cheap = cheap;
        this.image = image;
        this.sourceUrl = sourceUrl;
    }
}