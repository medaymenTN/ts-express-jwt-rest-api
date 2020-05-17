# JWT-REST api boilerplate

#### A REST based solution made with Nodejs,Typescript,Express,TypeORM,Passport,Docker,ApiDocs,postgresSQL

## Requirments

-   docker 19+
-   docker-compose 1.21.0+

## Installation

-   clone the projet from the git repository

```
$ npm install
```

## Running in development enviroment

-   under your project directory execute this command

```
$ docker-compose up --build
```

-   Docker image will run the project in development enviroment

-   Run node js using nodemon

-   API Docs will be displayed on http://localhost:5000/docs<br/>

![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/6.png)<br/>

-   pg admin ui will be displayed on http://localhost:5050/

-   pg admin default credentials : (email: pgadmin@example.com , password : admin)<br/>

    ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/1.png)<br/>

-   Now we need to connect to our postgres and in order to do that go to create -> server<br/>

    ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/2.png)<br/>

-   this form will be displayed so that you can set your server name<br/>

    ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/3..PNG)<br/>

-   Now switch to connection tab and enter the infomation below<br/>

> Note: db credentials (username:postgres,password:postgres)<br/>

![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/4.PNG)<br/>

-   the hostname as you can see is an IPV4 adress which could be found using docker command. In order to get the IPV4 adress tape these commands on your terminal

```
$ docker ps
```

this will display all the running containers so that you can get the id of the container running postgres image

-   Now run:

```
$ docker inspect pg_containers_ID
```

-   you can see now in the image below that we can get the IPV4 adress in the terminal<br/>

![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/3.PNG)<br/>

-   finally the dashboard will display your database details<br/>

    ![Test Image 7](https://github.com/medaymenTN/ts-express-jwt-rest-api/blob/master/docs/5.PNG)<br/>
