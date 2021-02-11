create table USERS (
    ID serial primary key,
    STATUS integer,
    EMAIL text not null,
    NAME text not null,
    PASSWORD text
);
create table WORKSHOPS (
    ID serial primary key,
    V_ID integer,
    NAME text not null,
    UPDATED_AT date,
    USER_ID integer,
    foreign key (USER_ID) references USERS (ID)
);
create table STATIONS (
    ID serial primary key,
    WORKSHOP_ID integer not null,
    NAME text not null,
    foreign key (WORKSHOP_ID) references WORKSHOPS (ID)
);
create table WAREHOUSES (
    ID serial primary key,
    NAME text not null,
    ADDRESS text not null,
    USER_ID integer,
    foreign key (USER_ID) references USERS (ID)
);
create table CLIENTS (
    ID serial primary key,
    NAME text,
    SURNAME text,
    MIDDLE_NAME text,
    PHONE text,
    EMAIL text,
    USER_ID integer,
    foreign key (USER_ID) references USERS (ID)
);
create table CARS (
    ID serial primary key,
    BRAND text,
    MODEL text,
    VIN text,
    PLATE text,
    CLIENT_ID integer,
    foreign key (CLIENT_ID) references CLIENTS (ID)
);
create table AUTO_PARTS (
    ID serial primary key,
    NAME text,
    DESCRIPTION text,
    PURCHASE_PRICE integer,
    RETAIL_PRICE integer,
    QUANTITY decimal(19, 2),
    USER_ID integer,
    foreign key (USER_ID) references USERS (ID)
);
create table SERVICES (
    ID serial primary key,
    V_ID integer,
    NAME text,
    COST integer,
    USER_ID integer,
    foreign key (USER_ID) references USERS (ID)
);
create table SERVICE_TYPES (
    ID serial primary key,
    NAME text,
    USER_ID integer,
    foreign key (USER_ID) references USERS (ID)
);
create table ORDERS (
    ID serial primary key,
    STATION_ID integer,
    CAR_ID integer,
    foreign key (STATION_ID) references STATIONS (ID),
    foreign key (CAR_ID) references CARS (ID)
);
create table ORDER_AUTO_PARTS (
    ID serial primary key,
    AUTO_PART_ID integer,
    QUANTITY decimal(19, 2),
    ORDER_ID integer,
    foreign key (AUTO_PART_ID) references AUTO_PARTS (ID),
    foreign key (ORDER_ID) references ORDERS (ID)
);
create table AUTO_PART_CROSSES (
    ID serial primary key,
    NOT_OE_BRAND text,
    NOT_OE_CODE text,
    OE_BRAND text,
    OE_CODE text
);
create table ORDER_SERVICES (
    ID serial primary key,
    COST integer,
    QUANTITY decimal(19, 2),
    SERVICE_ID integer,
    ORDER_ID integer,
    foreign key (SERVICE_ID) references SERVICES (ID),
    foreign key (ORDER_ID) references ORDERS (ID)
);