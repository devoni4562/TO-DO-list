CREATE DATABASE IF NOT EXISTS todo_list_devoni;

USE todo_list_devoni;

CREATE TABLE IF NOT EXISTS category(
    category_id int auto_increment,
    category_name varchar(255) not null,
    primary key(category_id)
    );