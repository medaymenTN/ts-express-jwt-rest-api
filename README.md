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

-Now we need to connect to our postgres and in order to to that go to create -> server
![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/2.png)
-this form will be displayed so that you can set your server name
![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/3..PNG)

-Now switch to connection tab and enter the infomation below

> Note: db credentials (username:postres,password:postgres)

- ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/4.PNG)
  > Note : the hostname as you can see is and IPV4 adress which could be found using docker command
- In order to get the IPV4 adress tape these commands on your terminal

```
$ docker ps
```

this will display all the running containers so that you can get the id of the container running pg image

-Now run:

```
$ docker inspect pg_containers_ID
```

-- you can see now in the image below that we can get the IPV4 adress in the terminal

- ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/3.PNG)

- finally the dashboard will display your database details

- ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/5.PNG)
