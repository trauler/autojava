create table users (
    id serial PRIMARY KEY,
    status integer,
    email text NOT NULL,
    name text NOT NULL,
    encrypted_password text
);