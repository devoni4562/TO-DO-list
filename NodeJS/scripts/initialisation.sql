CREATE DATABASE IF NOT EXISTS todo_list_devoni;

USE todo_list_devoni;

CREATE TABLE IF NOT EXISTS categories(
    id int auto_increment PRIMARY KEY,
    wording varchar(255) UNIQUE NOT NULL,
    user_id int NOT NULL
    );

CREATE TABLE IF NOT EXISTS tasks(
    id int auto_increment PRIMARY KEY,
    title varchar(255) NOT NULL,
    completed bool NOT NULL,
    category_id int NOT NULL,
    user_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id int auto_increment PRIMARY KEY,
    email varchar(255) unique NOT NULL,
    pseudo varchar(50) unique NOT NULL,
    password varchar(255) NOT NULL
);

ALTER TABLE categories
ADD CONSTRAINT fk_category_user
FOREIGN KEY IF NOT EXISTS (user_id)
REFERENCES users(id);

ALTER TABLE tasks
ADD CONSTRAINT fk_category
FOREIGN KEY IF NOT EXISTS (category_id)
REFERENCES categories(id);

ALTER TABLE tasks
ADD CONSTRAINT fk_task_user
FOREIGN KEY IF NOT EXISTS (user_id)
REFERENCES users(id);