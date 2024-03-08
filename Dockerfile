FROM mysql:latest

COPY ./sqlfiles/ /docker-entrypoint-initdb.d

EXPOSE 3306
