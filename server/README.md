# Up migration
* Create database
* Configure connection to database in `.env` and `database.json`
* Go to `server` directiory in command line
* In command line:
```sh
npm install
npm install -g db-migrate
npm install -g db-migrate-pg
npx db-migrate up initialize
npx db-migrate up posts
```
# How to run
```sh
npm run dev
```
or
```sh
npm start
```

# Create migration
```sh
npx db-migrate create {migration_file_name} --sql-file
```