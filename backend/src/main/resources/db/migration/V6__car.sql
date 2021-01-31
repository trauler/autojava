create table car(
    id serial PRIMARY KEY,
    brand text,
    model text,
    vin text,
    plate text,
    client_id integer,
    FOREIGN KEY (client_id) REFERENCES client(id)
);