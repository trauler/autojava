create table autoParts(
    id serial PRIMARY KEY,
    name text,
    description text,
    purchasePrice integer,
    retailPrice integer,
    quantity float,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id)
);