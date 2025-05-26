# dev-skill-test
To test skill of all candidate.
We are using react for Frontend and express for Backend

## Assignment
Create a new page to show a country tag as selected
### Bankend
1) Create a migration and seed data into the db using data from `./backend/mockup/country.json`
1) Create Api for insert and query to serve Frontend

### Frontend
1) A user can search by typing on a searchbox and click filters button
Expect: the countries list must be search using api and display correctly and ignore the country's tag
1) A user can click checkbox for many counties
Expect: each selected country must display a tag
1) A user can click `x` button from the tag or uncheck the checkbox from the contries list
Expect: the tag will be removed and the checkbox must be uncheck
1) A user can change page
Expect: new result will be shown on the country list but the tag remain the same.

## Expectation
### Junior
1) Finish the assignment

### Mid level
1) Same as Junior
2) Make the searchbox become a autocomplete with maximum 3 suggestion countries
3) Check component rerender
4) Create command `yarn db` to run migration and `yarn seed` to seed data 
5) Improve api (e.g. caching, etag, etc)
6) Add validation when adding a new country (country name must be unique case insensitive)

### Senior
1) Same as Mid level
2) Add unit test for api
3) Add unit test for debouce, searching
4) Create docker for frontend to use a correct node version and auto run `yarn` 
5) Update docker to auto migrate and seeding when running ./docker.sh

## How to run the project
### Frontend
```bash
cd ./frontend
```

#### How to start project
1) install dependency
```bash
yarn
``` 
2) run project
```bash
yarn dev
```

### Backend
```bash
cd ./backend
```

#### What we have
1) prisma
2) postgres db
3) mockfile (mockup/country.json)

#### How to start project
1) open `docker`
2) run docker
```bash
cd backend
chmod +x ./docker.sh
./docker.sh
```
3) start project
```bash
yarn dev
```