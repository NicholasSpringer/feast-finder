# FeastFinder
FeastFinder is a webapp that helps people find recipes when they don't know
what to make. Simply put in the ingredients that you have available, and
we will present you with a list of curated, delicious recipes (no instructions for now) that you might
be able to make. Logging in will save your ingredients for future browsing.

## Structure
The react app consists of 4 components located in `src/components`: the app component, which acts as an outer
container and contains most of the state of the app; the ingredient list, which 
displays the ingredients that the user has inputted; the login component, which either
displays a login field or a logout button; and the recipe list, which displays recipes
that include any of the active ingredients. The express backend is contained `source/server.js`.

## How to run the code
To run the site, a GCP key is required to access our database of curated recipes. 
Save the key as `key.json` in the root directory of this repository. Then, run `npm run start-frontend` and 
`npm run start-backend` in two separate terminals. The site will be available at `localhost:3000`

## Project Contributors
Nicholas Springer and Peter Li

Project development was done mostly using pair programming, so each contributor contributed 
around half of each component.
