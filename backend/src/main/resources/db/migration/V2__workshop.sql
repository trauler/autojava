create table workshop (
                          id serial PRIMARY KEY,
                          vid integer,
                          name text,
                          updated_at DATE,
                          user_id integer,
                          FOREIGN KEY (user_id) REFERENCES users(id)
);