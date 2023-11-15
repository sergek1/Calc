#!/bin/bash

# Сборка и запуск сервера
#brew install maven
#cd src/main/java/SmartCalc
mvn clean install
java -jar target/ваш-артефакт.jar &

# Сборка и запуск клиента
cd ../client
npm install
npm start