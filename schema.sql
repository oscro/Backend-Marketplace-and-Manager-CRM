DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT(5) NOT NULL,
  stock_quantity INT (10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Salt Shaker','Kitchen & Dining','5','50'),
('Kitchen Chair','Kitchen & Dining','25','40'),
('Samsung Galaxy S','Electronics','400','100'),
('Vizio 50 inch TV','Electronics','700','10'),
('Ninja Blender','Kitchen & Dining','80','40'),
('Chino Pants','Fashion','35','70'),
('North Face Jacket','Fashion','75','80'),
('Medicine Ball','Fitness','40','20'),
('Lazy Boy Sofa','Home Goods','2000','5'),
('Pet Food Bowl','Pets','5','200');