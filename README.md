# VaxData 
This is a fullstack typescript app displaying some data about vaccinations.

## Getting the database up and running
If you want to run this application locally you'll have to create a mongodb database first. To do so you need to create an account here:https://cloud.mongodb.com/ 
and click on the 'Connect' button that should show you a template for the mongourl you'll need to fill in.

After that create a .env file in the /server folder with the content: 
`MONGOURL=[INSERT MONGODB URL]`

## Project root commands:
After that's done you can install the application from the project root with `yarn run install` which installs both the api and client.

### `yarn run populate` 
Will wipe your db and insert the data into it from the .source files in /server/src/data.

### `yarn run client` and `yarn run server`
Will start the respective ends of the application in development mode.

### `yarn run test`
Will run tests for both ends.

### `yarn run build` 
Will build both front and backends into /build.

### `yarn start`
Will start the production build of the application.
