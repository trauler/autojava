create table warehouse (
    id serial PRIMARY KEY,
    name text NOT NULL,
    address text NOT NULL,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id)
);