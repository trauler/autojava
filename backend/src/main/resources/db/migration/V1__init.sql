create table users (
    id serial PRIMARY KEY,
    status integer,
    email text,
    name text,
    encrypted_password text
);