create table station (
    id serial PRIMARY KEY,
    workshop_id integer NOT NULL,
    name text NOT NULL,
    FOREIGN KEY (workshop_id) REFERENCES workshop(id)
);