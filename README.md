# JWT-REST api boilerplate

#### A REST based solution made with Nodejs,Typescript,Express,TypeORM,Passport,Docker,SwaggerUI,postgresSQL

## Requirments

- docker 19+
- docker-compose 1.21.0+

## Installation

- clone the projet from the git repository

```
$ npm install
```

## Running in development enviroment

- under your project directory execute this command

```
$ docker-compose up --build
```

- Docker image will run the project on development enviroment

- Run node js using nodemon

- Swagger-ui will be displayed on http://localhost:5000/swagger-ui

- pg admin ui will be displayed on http://localhost:5050/

- pg admin default credentials : (email: pgadmin@example.com , password : admin)

  ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/1.png)

- your project will run on http://localhost:5000/
