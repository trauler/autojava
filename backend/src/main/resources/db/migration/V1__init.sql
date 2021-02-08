create table USERS (
    id serial PRIMARY KEY,
    status integer,
    email text NOT NULL,
    name text NOT NULL,
    encrypted_password text
);
create table WORKSHOP (
    id serial PRIMARY KEY,
    vid integer,
    name text NOT NULL,
    updated_at DATE,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);
create table STATION (
    id serial PRIMARY KEY,
    workshop_id integer NOT NULL,
    name text NOT NULL,
    FOREIGN KEY (workshop_id) REFERENCES WORKSHOP (id)
);
create table WAREHOUSE (
    id serial PRIMARY KEY,
    name text NOT NULL,
    address text NOT NULL,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);
create table CLIENT (
    id serial PRIMARY KEY,
    name text,
    surname text,
    middleName text,
    phone text,
    email text,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);
create table CAR (
    id serial PRIMARY KEY,
    brand text,
    model text,
    vin text,
    plate text,
    client_id integer,
    FOREIGN KEY (client_id) REFERENCES CLIENT (id)
);
create table AUTO_PARTS (
    id serial PRIMARY KEY,
    name text,
    description text,
    purchasePrice integer,
    retailPrice integer,
    quantity decimal(19, 2),
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);
create table SERVICE (
    id serial PRIMARY KEY,
    vid integer,
    name text,
    cost int,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);
create table SERVICE_TYPE (
    id serial PRIMARY KEY,
    name text,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES USERS (id)
);
create table ORDERS (
    id serial PRIMARY KEY,
    station_id int,
    car_id int,
    FOREIGN KEY (station_id) REFERENCES STATION (id),
    FOREIGN KEY (car_id) REFERENCES CAR (id)
);
create table ORDER_AUTO_PART (
    id serial PRIMARY KEY,
    auto_part_id int,
    quantity decimal(19, 2),
    order_id int,
    FOREIGN KEY (auto_part_id) REFERENCES AUTO_PARTS (id),
    FOREIGN KEY (order_id) REFERENCES ORDERS (id)
);
create table AUTO_PART_CROSSES (
    id serial PRIMARY KEY,
    notOeBrand text,
    notOeCode text,
    oeBrand text,
    oeCode text
);
create table ORDER_SERVICE (
    id serial PRIMARY KEY,
    cost int,
    quantity decimal(19, 2),
    service_id int,
    order_id int,
    FOREIGN KEY (service_id) REFERENCES SERVICE (id),
    FOREIGN KEY (order_id) REFERENCES ORDERS (id)
);
