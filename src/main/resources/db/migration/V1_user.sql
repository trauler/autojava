    create table User(
        id serial PRIMARY KEY NOT NULL,
        status integer,
        email text,
        name text,
        encrypted_password text
    );