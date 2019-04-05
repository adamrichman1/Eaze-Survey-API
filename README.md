# Eaze Technical Screening - Survey API

### Author
* [Adam Richman](http://www.github.com/adamrichman1)

### Instructions
* https://github.com/eaze/take-home-backend

### Requirements
* [Node.js 11.13.0+](https://nodejs.org/en/)

### Test Suites
* Postman API-tests in the test/ directory
* Mocha unit-tests in the test/directory

### Documentation
* Swagger Docs (eaze-api-swagger.yaml)

#### Build
```
cd Eaze-Survey-API/
npm install
```

#### Test
```
cd Eaze-Survey-API/
npm test
```

#### Run
```
cd Eaze-Survey-API/
npm start
```

#### Access
```
localhost:5000/{endpoint}
```

#### Data Persistence in Production

In production, I would use an SQL database to store surveys and survey results. I would create 2 tables:
a survey table and a response table. The survey table would hold surveys, and the response table would
store survey responses. Both tables could be joined on a survey-id field. Surveys could be stored as
JSON strings, but if this API was more extensive, arrays of Strings may be more appropriate.
Similarly, survey results may need to be stored as arrays of booleans if further functionality is added.