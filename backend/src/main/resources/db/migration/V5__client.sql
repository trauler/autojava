create table client(
    id serial PRIMARY KEY,
    name text,
    surname text,
    middleName text,
    phone text,
    email text,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id)
);