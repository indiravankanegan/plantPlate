# plantPlate
A web app to encourage more plant based eating

## Frontend:
### Profile:
- Users can create a new profile by answers some questions and following the prompts
- Users can log into an existing profile (checks to make sure credentials are correct)
- Username must be unique, users will be asked to change the username if it has already been taken
- Users can update any part of their profile

### Recipes:
- plantPlate houses over 650 plant based recipes
- Users can view details of each recipe on a seperate page
- Users can add recipes to a liked list, which is unique to them
- Users can view their liked recipes on a seperate page as well as remove the recipes from their liked list

## Backend:
### Profile:
- Profile model has many different fields (shown in the video demo) and has many GET methods, a DELETE method, a POST method and a PUT method (**NOTE: in the demo video, the POST and PUT were mismatched**)

### Recipe:
- Recipes taken from Spoonacular API
- I built my own recipe model instead of using the recipes how they come from Spoonacular for ease
- Used a backend GET method to retrieve the recipes from Spoonacular as well as a frontend GET method to get the recipe list from the backend to display on the user dashboard

### Liked Recipes:
- A many to many relationship table that links recipes to profiles
- The liked recipe model has a GET by user id, which gets all of a specified user's liked recipes
- It also has a DELETE and POST method based on the unique combination of user id and recipe id

## Video Demo Link:
https://youtu.be/ltUlvOsSXUs
(hopefully link is working, if not, I added the video into the repo)
