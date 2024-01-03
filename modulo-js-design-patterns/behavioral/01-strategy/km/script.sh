# postgres
docker run \
  --name postgres \
  -e POSTGRES_USER=kelvinmodesto \
  -e POSTGRES_PASSWORD="abc123" \
  -e POSTGRES_DB=players \
  -p 5432:5432 \
  -d \
  postgres

  CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);
  SELECT * FROM warriors;

# mongodb
docker run \
  -p 27017:27017 \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=kelvinmodesto \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \ 
  -d \
  mongo:4