# FeastFinder
FeastFinder is a webapp that helps people find new recipes, especially useful when
they don't know what to make. Simply put in the ingredients that you have available,
and we will present you with a list of recipes, sorted by relevance, that you might
be able to cook. Logging in will save your ingredients for future browsing!

![Demo Screenshot](https://github.com/NicholasSpringer/feast-finder/blob/main/demo.png)

## Structure
The react app consists of 4 components located in `src/components`: the app component, which acts as an outer
container and contains most of the state of the app; the ingredient list, which 
displays the ingredients that the user has inputted; the login component, which either
displays a login field or a logout button; and the recipe list, which displays recipes
that include any of the active ingredients. The express backend is contained `source/server.js`.

## How to run the code
To run the site, a GCP key is required (available upon request) to access our database of curated recipes. 
Save the key as `key.json` in the root directory of this repository. Then, run `npm run start-frontend` and 
`npm run start-backend` in two separate terminals. The site will be available at `localhost:3000`

## Next steps
For now, the recipe database is manually populated by us. Moving forward, we'd like to build a feature
such that users can contribute their own recipes, tagging the necessary ingredients and steps. We hope
that this will make the database valuable in and of itself, as well as build community around the webapp.


## Project Contributors
Nicholas Springer and Peter Li

Project development was done mostly using pair programming, so each contributor contributed 
around half of each component.
