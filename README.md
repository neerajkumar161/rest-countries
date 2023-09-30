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
  <!-- - 1. Open terminal and run command ```pnpm i``` , this command will install all dependencies on the project.
  - 2. Use ```node v18.16.1```, ```pnpm v8.7.5```, and ```typescript v5.2.2``` version to run the application properly. You can check the versions in ```package.json``` file as well.
  - 3. Now, to run the application, first run command ```npm run compile``` and on second terminal run ```npm start```. First command will compile the ```.ts``` files in ```.js``` files. Make sure there will be no error in compile time.
  - 4. Check the second terminal, if server is listening or not. If it is, you're good to go. -->


## Endpoints
The following section lists and describes the available API endpoints, including details about request methods, request payloads, and response formats.

### \`POST /user/signup\` - User Signup endpoint
#### Request method: \`GET\`
#### Request body payload:
```json
{
  "username": "neerajkumar",
  "password": "testpassword"
}
```
#### Request response:
```json
{
  "message": "User registered!",
  "data": null,
  "code": 200
}
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
### \`GET /countries/{countryName}\` - Get Country Details by name
- #### Request method: \`GET\`
- #### Request paramters: countryName: india | sri lanka | china ....
- #### Request headers payload:
```json
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
      "region": ""
      // and so on.... 
    }
  ],
  "code": 200
}
```

### \`GET /countries\` - Get Countries with spe
- #### Request method: \`GET\`
- #### Request query paramters:
```js
    /* Use any of these filters at a time 
     * Note: Since, population and area will return single country, therefore sorting and pagination will not work on 
     * these two filters, use only language filter to use pagination
     * if no filter is passed, it will retreive all countries with pagination
     */
    language: hin | eng | tam | jpa   // use Alpha -3 codes [here](https://www.loc.gov/standards/iso639-2/php/English_list.php) is the list
    population: 1380004385  // population of the country
    area: 3287590.0  // area of the country

    /* Sorting an Pagination */
    sortBy: population | area
    orderBy: asc | desc
    pageSize: number
    pageNumber: number

    /** Examples:
     * http://localhost:5500/countries?population=1380004385
     * http://localhost:5500/countries?area=3287590.0
     * http://localhost:5500/countries?language=hin&sortBy=population&orderBy=desc&pageSize=10&pageNumber=1 
     */
```

- #### Request headers payload:
```json
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
      "region": ""
      // and so on.... 
    }
  ],
  "code": 200
}
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Author
[Neeraj Kumar](https://www.github.com/neerajkumar161)