#!/bin/bash

#Running in development env require installing nodemodules on volumes 
#We only run the services express-dev and pgadmin (postgres will run automatically since express-dev depends on it)

docker-compose run --rm express-dev npm install && docker-compose up --build express-dev pgadmin