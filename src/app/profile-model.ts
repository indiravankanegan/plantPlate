export class Profile {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    vegan_experience: VeganExperience;
    cooking_experience: CookingExperience;
    cooking_frequency: CookingFrequency;
    experimental: boolean;
    meal_types: MealTypes[];
    dietary_restrictions: string[] | null;
    food_preferences: string[] | null;

    // this.#id = id;
    // this.#name = name;
    // this.#last_name = last_name;
    // this.#username = username;
    // this.#password = password;
    // this.#vegan_experience = vegan_experience;
    // this.#cooking_experience = cooking_experience;
    // this.#cooking_frequency = cooking_frequency;
    // this.#experimental = experimental;
    // this.#dietary_restrictions = dietary_restrictions;
    // this.#food_preferences = food_preferences;
    // this.#meal_types = meal_types;

    constructor(
      id: number,
      first_name: string,
      last_name: string,
      username: string,
      password: string,
      vegan_experience: VeganExperience,
      cooking_experience: CookingExperience,
      cooking_frequency: CookingFrequency,
      experimental: boolean,
      dietary_restrictions: string[] | null,
      food_preferences: string[] | null,
      meal_types: MealTypes[],

    ) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.username = username;
      this.password = password;
      this.vegan_experience = vegan_experience;
      this.cooking_experience = cooking_experience;
      this.cooking_frequency = cooking_frequency;
      this.experimental = experimental;
      this.meal_types = meal_types;
      this.dietary_restrictions = dietary_restrictions;
      this.food_preferences = food_preferences;
    }
  }
  

export enum VeganExperience {
    Never = 'Never',
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    PlantBased = 'Already Plant Based'
}

export enum CookingFrequency {
  Never = 'Never',
  Rarely = 'Rarely',
  Occasionally = 'Occasionally',
  Regularly = 'Regularly'
}

export enum MealTypes {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Snacks = 'Snacks'
}

export enum CookingExperience {
    Very = 'Very Comfortable',
    Somewhat = 'Somewhat Comfortable',
    Not = 'Not Comfortable'
  }

  
