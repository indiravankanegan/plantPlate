import express from 'express';
import bodyParser from 'body-parser';
import {Ingredient} from './ingredient.mjs';
import { Step } from './step.mjs';
import { LikedRecipes } from './personal-recipes.mjs';
import cors from 'cors'



const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(cors())


app.get('/ingredients', async (req, res) => {
    res.json(await Ingredient.getAllIngredients());
});

app.get('/ingredients/:id', async (req, res) => {
    let ing = await Ingredient.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Ingredient not found");
        return;
    }
    res.json(ing.json());
});



app.post('/ingredients', async (req, res) => {

    let ing = await Ingredient.create(req.body);

    if (!ing) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

// app.put('/ingredients/:id', async (req, res) => {
//     let ing = await Ingredient.findByID(req.params.id);
//     if (!ing) {
//         res.status(404).send("Ingredient not found.");
//         return;
//     }
    
//     if ((!req.body instanceof Object) || (req.body.name == undefined)) {
//         res.status(400).send("Bad request");
//         return;
//     }

//     const new_ing = await ing.setValues(req.body);
//     res.json(new_ing);
// })

app.put('/ingredients/:id', async (req, res) => {
    let ing = await Ingredient.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Ingredient not found.");
        return;
    }
    
    if ((!req.body instanceof Object) || (req.body.name == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    let new_ing = await ing.setName(req.body);
    res.status(201).json(new_ing.json());
})


app.delete('/ingredients/:id', async (req, res) => {
    if (!await Ingredient.deleteIngredientByID(req.params.id)) {
        res.status(400).send("Ingredient is still in use");
        return;
    } 
    res.json(true);
})

app.get('/steps/:id', async (req, res) => {
    let ing = await Step.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("step not found");
        return;
    }
    res.json(ing.json());
});


app.get('/steps', async (req, res) => {

    res.json(await Step.getAllSteps());
});


app.post('/steps', async (req, res) => {

    let ing = await Step.create(req.body);

    if (!ing) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

app.delete('/steps/:id', async (req, res) => {
    if (!await Step.deleteStepByID(req.params.id)) {
        res.status(400).send("dnw");
        return;
    } 
    res.json(true);
})

// app.get('/recipes', async (req, res) => {
//     res.json(await Recipe.getAllIDs());
// });

// app.get('/recipes/:id', async (req, res) => {
//     let recipe = await Recipe.findByID(req.params.id);
//     if (!recipe) {
//         res.status(404).send("Recipe not found");
//         return;
//     }

//     res.json(await recipe.json(req.query.expanded != undefined));
// });

// app.post('/recipes', async (req, res) => {

//     let recipe = await Recipe.create(req.body);

//     if (!recipe) {
//         res.status(400).send("Bad request");
//         return;
//     }

//     res.status(201).json(await recipe.json(true));
// });

// app.put('/recipes/:id', async (req, res) => {
//     let recipe = await Recipe.findByID(req.params.id);
//     if (!recipe) {
//         res.status(404).send("Recipe not found.");
//         return;
//     }
    
//     if ((!req.body instanceof Object) || (req.body.name == undefined)) {
//         res.status(400).send("Bad request");
//         return;
//     }

//     await recipe.setName(req.body.name);
//     res.json(true);
// });

// app.delete('/recipes/:id', async (req, res) => {
//     await Recipe.deleteRecipeByID(req.params.id);
//     res.json(true);
// });


app.get('/steps', async (req, res) => {
    res.json(await Step.getAllIDs());
});

app.get('/likedRecipes/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const likedRecipes = await LikedRecipes.getByUserId(userId);
        res.status(200).json(likedRecipes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.get('/likedRecipes/:userId/:recipeId/exists', async (req, res) => {
    const userId = req.params.userId;
    const recipeId = req.params.recipeId;

    try {
        const recipeExists = await LikedRecipes.exists(userId, recipeId);
        res.status(200).json(recipeExists);
    } catch (error) {
        console.error('Error checking if recipe is liked:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/likedRecipes', async (req, res) => {
    const { user_id, recipe_id } = req.body;

    try {
        const newLikedRecipe = await LikedRecipes.create(user_id, recipe_id);
        res.status(201).json(newLikedRecipe);
    } catch (error) {
        res.status(400).send("Bad request");
    }
});

app.delete('/likedRecipes', async (req, res) => {
    const { user_id, recipe_id } = req.body;

    try {
        await LikedRecipes.delete({ user_id, recipe_id });
        res.status(204).send();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
const apiKey = "f83b706b5ff7471b9d51739a6c0e4ef0";
const batchSize = 50;
const totalResults = 689;
const numBatches = Math.ceil(totalResults / batchSize);
let allResults = [];

async function fetchData(offset){
    let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?diet=vegan&addRecipeInformation=true&apiKey=${apiKey}&offset=${offset}&number=${batchSize}`);
    const data = await response.json();
    return data.results;
}


async function fetchAllResults() {
    for (let i = 0; i < numBatches; i++) {
        const offset = i * batchSize;
        const results = await fetchData(offset);
        allResults = allResults.concat(results);
    }
}
// DON'T USE UNLESS RETREIVING DATA
// app.get('/fetch-all-results', async (req, res) => {
//     try {
//         await fetchAllResults();
//         res.json({ message: 'All results fetched successfully.' });
//     } catch (error) {
//         console.error('Error fetching results:', error);
//         res.status(500).json({ error: 'Failed to fetch results.' });
//     }
// });

app.get('/get-all-results', (req, res) => {
    res.json(allResults);
});

app.get('/store-all-results', async (req, res) => {
    try {
        const storedResults = [];

        // Iterate over each recipe in allResults
        for (const recipe of allResults) {
            // Extract the desired fields from the recipe
            const stepData = {
                title: recipe.title, 
                summary: recipe.summary,
                image: recipe.image,
                sourceUrl: recipe.sourceUrl,
                cookingMinutes: recipe.readyInMinutes,
                cheap: recipe.cheap,
                cuisines: recipe.cuisines,
                diets: recipe.diets,
                dishTypes: recipe.dishTypes
            };
            storedResults.push(stepData);

            // Call Step.create with the extracted fields
            await Step.create(stepData);

        }

        res.json({ message: 'All results stored successfully.', storedResults });
    } catch (error) {
        console.error('Error storing results:', error);
        res.status(500).json({ error: 'Failed to store results.' });
    }
});




// await Ingredient.create({name: "bruh",
//                         last_name: "test",
//                         username: "bye",
//                         password: "kys",
//                         vegan_experience: "none",
//                         cooking_experience: "zip",
//                         cooking_frequency: "zilch",
//                         experimental: true,
//                         dietary_restrictions: ["vegan", "gf"],
//                         food_preferences: ["vegan", "gf"],
//                         meal_types: ["vegan", "gf"]
//                     });

// await Step.create({title: "bruh",
//                     summary: "test",
//                     image: "bye",
//                     sourceUrl: "kys",
//                     cookingMinutes: 1,
//                     cheap: true,
//                     cuisines: ["vegan", "gf"],
//                     diets: ["vegan", "gf"],
//                     dishTypes: ["vegan", "gf"]
//                 });


                




// await Recipe.create({
//     name: 'Chicken Picatta',
//     steps: [
//         {
//             seq_no: 1,
//             instruction: "Heat oil in pan",
//             ingredients: []
//         },
//         {
//             seq_no: 2,
//             instruction: "Pan fry chicken cutlets",
//             ingredients: [1]
//         },
//         {
//             seq_no: 2,
//             instruction: "Make lemon sauce",
//             ingredients: [2,3]
//         },
//         {
//             seq_no: 3,
//             instruction: "Combine and serve",
//             ingredients: [1,2,3]
//         }
//     ]
// });

app.listen(port, () => {
    console.log('Running...');
})