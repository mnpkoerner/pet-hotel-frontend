-- Database name = 'python_pets'


CREATE TABLE "owners" (
	"id" SERIAL PRIMARY KEY, 
	"name" VARCHAR(50) NOT NULL
	);
CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "owners",
	"name" VARCHAR(50) NOT NULL, 
	"breed" VARCHAR(50) NOT NULL, 
	"color" VARCHAR(50) NOT NULL, 
	"checked-in" VARCHAR(50) DEFAULT 'No' NOT NULL
	);