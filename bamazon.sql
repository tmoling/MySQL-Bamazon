--drop this in case there is one created
DROP DATABASE IF EXISTS bamazon_db;

--there isn't, so make one
CREATE DATABASE bamazon_db;

--load data into selected database
USE bamazon_db;

--table for database with requested elements
CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(500) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id));

--10 items for sale in the bamazon database
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (49837, 
'Opened Bottle of Caffiene Pills', 
'Powers Residence', 
15.99, 
10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (10928, 
'Johnny Dakota Jacket', 
'Bayside', 
199.95, 
5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (94012, 
'Tuttle Drivers Ed Car', 
'Bayside', 
950.25, 
28);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (48102, 
'Jar of Screech Spaghetti Sauce', 
'Bayside', 
7.99, 
200);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (20194, 
'Weekend Vacation at Malibu Sands', 
'Malibu Sands', 
499.00, 
3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (94817, 
'Zack Attack Tickets', 
'Bayside', 
65.99, 
74);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (30192, 
'Elvis Statue', 
'Powers Residence', 
84.50, 
25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (29185, 
'Tiger Mascot Costume', 
'Malibu Sands', 
45.99, 
18);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (38111, 
'Buddy Bands Trademark', 
'Bayside', 
500.00, 
8);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
values (39658, 
'Rod Belding Rafting Lessons', 
'Bayside', 
35.99, 
38);


