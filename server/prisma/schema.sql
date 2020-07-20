CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "public"."Record" (
  id SERIAL PRIMARY KEY NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  customdate TIMESTAMP,
  product VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  quantity VARCHAR(255) NOT NULL,
  unit VARCHAR(255) NOT NULL,
  "isOnSale" BOOLEAN NOT NULL DEFAULT false,
  "authorId" INTEGER NOT NULL,
  FOREIGN KEY ("authorId") REFERENCES "public"."User"(id)
);
