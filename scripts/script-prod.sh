#!/bin/bash 
#run containers in detached mode for production 
#Note: postgres image will run automatically since app depends on postgres
docker-compose up -d  --build app