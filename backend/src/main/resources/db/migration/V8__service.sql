create table (
    id serial PRIMARY KEY,
    vid integer,
    name text,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES users(id)
)