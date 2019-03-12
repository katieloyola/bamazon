DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(120) NOT NULL,
    department_name VARCHAR(120) NOT NULL,
    price int NOT NULL,
    stock_quantity int NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Speaker', 'Electronics', 89, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Headphones', 'Electronics', 40, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('TV', 'Electronics', 400, 98);
