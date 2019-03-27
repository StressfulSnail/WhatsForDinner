# WhatsForDinner

Managing recipes, deciding what to cook, creating meal lists and the resulting shopping lists are all repetitive chores that take time week after week, but that can save money and provide health benefits for modern, busy people.  To assist with streamlining these tasks, WhatsForDinner provides users with a secure, web based, community oriented set of tools to manage and find new recipes, create meal plans and produce shopping lists.

WhatsForDinner will further provide value to its users by streamlining and simplifying this routine process and providing structure around food, which has numerous health benefits - from helping people select lower calorie options, portion control, budgeting and avoiding foods with allergens in them that the user may wish to avoid.  The product will be free with advertising banners and will offer a paid subscription model for premium users.

## Setup
### Install libraries
Have Node >= 10 installed

After cloning repository run: `npm install`

### Create your .env
Your .env file will store all of your local environment variables. Make a copy of base.env at the project root named .env then fill in the variables.

If you need to create new environment variables, add it to the base.env file as well so the variable names can be versioned.

Do not commit your personal .env file as it hold your super secret local DB password.

## Start Scripts
`npm run start` Start application

`npm run server-start` Start server

`npm run client-start` Start client dev server, this has live reload

## Core Libraries
### Frontend
- [React.js](https://reactjs.org/docs/getting-started.html)
  - [Redux](https://redux.js.org/introduction/getting-started)
  - [react-router](https://reacttraining.com/react-router/web/guides/quick-start)
  - [Jest](https://jestjs.io/docs/en/getting-started) + [Enzyme](https://airbnb.io/enzyme/)
  - [Material UI](https://material-ui.com/)

### Backend
- [Node.js](https://nodejs.org/api/)
- [Express](https://expressjs.com/en/4x/api.html)
  - [Passport.js](http://www.passportjs.org/docs/) + [passport-local](http://www.passportjs.org/packages/passport-local/)
  - [Knex.js](https://knexjs.org/#Builder)
- [Jest](https://jestjs.io/docs/en/getting-started)