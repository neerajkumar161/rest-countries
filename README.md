# rest-countries 

A backend API service to get the countries details using [RestCountries](https://restcountries.com) API.

## Features

- User signup and signin for authentication to access APIs.
- API authentication using JWT token.
- Global Error handling middleware.
- Custom Error handlers for different use cases.

## Installation
```bash
# Clone the repository
git clone https://github.com/neerajkumar161/rest-countries

# Change to the project directory
cd rest-countries

# Install dependencies, use 
pnpm install
```
## Usage
To run the application, use ```node v18.16.1```, ```pnpm v8.7.5```, and ```typescript v5.2.2```. You can check the versions in ```package.json``` file as well.
```bash
  # To compile the typescript files, make sure there should be no error in compile time
  npm run compile
```
On second terminal, while first opened
```bash
  # Start Node.js server for listening requests
  npm start
```

## Endpoints
#### The following section lists and describes the available API endpoints, including details about request methods, request payloads, and response formats.

### \`POST /user/signup\` - User Signup endpoint
- #### Request method: \`GET\`
- #### Request body payload:
```json
{
  "username": "neerajkumar",
  "password": "testpassword"
}
```
- #### Request response:
```json
{
  "message": "User registered!",
  "data": null,
  "code": 200
}
```

- #### Request error:
```json
{
  "errors":[
    {
      "message":"Username already exists! Try another one!"
    }
  ]
}
```
- #### Curl Request
```bash
curl -X POST http://localhost:5500/user/signup -H "Content-Type: application/json" -d '{
    "username": "neerajkumar",
    "password": "tester"
}'
```

### \`POST /user/signin\` - User Signin endpoint
- #### Request method: \`POST\`
- #### Request body payload:
```json
{
  "username": "neerajkumar",
  "password": "testpassword"
}
```
- #### Request response:
```json
{
  "message": "User signed in succesfully!",
  "data": {
    "username": "neerajkumar",
    "token": "user-generated-token"
  },
  "code": 200
}
```

- #### Request error:
```json
{
  "errors":[
    {
      "message":"Invalid credentials!"
    }
  ]
}
```
- #### Curl Request
```bash
curl -X POST http://localhost:5500/user/signup -H "Content-Type: application/json" -d '{
    "username": "neerajkumar",
    "password": "tester"
}'
```

### \`GET /countries/{countryName}\` - Get Country Details by name
- #### Request method: \`GET\`
- #### Request parameters: countryName: india | sri lanka | china ....
- #### Request headers payload:
```
Authorization: auth-token // user auth token received in signin api
```
- #### Request response:
```json
{
  "message": "Country Details fetched!",
  "data": [
    {
      "name": {},
      "currencies": {},
      "region": "",
      "otherKeys": "values"
    }
  ],
  "code": 200
}
```
- #### Request error:
```json
{
  "errors":[
    {
      "message":"Invalid auth token!" // or "Auth token is required!"
    }
  ]
}
```
- #### Curl Request
```bash
curl -X GET http://localhost:5500/countries/india -H "Authorization: auth-token"
```



### \`GET /countries\` - Get Countries with specific filters
- #### Request method: \`GET\`
- #### Request query parameters:
  ##### Note: Since, population and area will return single country, therefore sorting and pagination will not work on these two filters, use only language filter to use pagination. if no filter is passed, it will retreive all countries with pagination
  - language: hin | eng | tam | jpa   // use Alpha -3 codes [here](https://www.loc.gov/standards/iso639-2/php/English_list.php) is the list.
  - population: 1380004385  // population of the country
  - area: 3287590.0  // area of the country
- #### Sorting an Pagination
  - sortBy: population | area
  - orderBy: asc | desc
  - pageSize: number
  - pageNumber: number
- #### Examples
  * http://localhost:5500/countries?population=1380004385
  * http://localhost:5500/countries?area=3287590.0
  * http://localhost:5500/countries?language=hin&sortBy=population&orderBy=desc&pageSize=10&pageNumber=1 

- #### Request headers payload:
```
Authorization: auth-token // user auth token received in signin api
```
- #### Request response:
```json
{
  "message": "All Countries fetched",
  "data": {
    "countries": {
      "name": {},
      "currencies": {},
      "region": "",
      "otherKeys": "values"
    },
    "currentPage": 1,
    "totalPages": 25,
    "totalItems": 250
      },
  "code": 200
}
```
- #### Request error:
```json
{
  "errors":[
    {
      "message":"Invalide auth token!" // or "Auth token is required!"
    }
  ]
}
```
- #### Curl Request
```bash
curl -X GET 'http://localhost:5500/countries?language=hin&sortBy=area&orderBy=asc&pageSize=10&pageNumber=1' -H "Authorization: auth-token"
```

## Global error
- When some error occured in server
```json
{ 
  "message": "Something went wrong!"
}
```
## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Author
[Neeraj Kumar](https://www.github.com/neerajkumar161)