create database Ecommerce1;
use Ecommerce1;


create table user(id integer primary key auto_increment,firstname varchar(100),lastname varchar(100),phoneno varchar(200),email varchar(100),Password varchar(300));

create table category (id integer primary key auto_increment,title varchar(100),description varchar(100));

create table company (id integer primary key auto_increment,title varchar(100),description varchar(100));

create table product (id integer primary key auto_increment,title varchar(100),description varchar(100),price float,category int ,company int);

create table cart (id integer primary key auto_increment,user int,product int,quantity int,price float);


--order master
--status
--0: order placed    1:packaging      2:dispatched     3:out for delivery     4:delivered 5:order cancelled
create table userOrder(id integer primary key auto_increment,user int,totalPrice float ,paidAmount float,orderDate varchar(50),orderStatus int );

--order details
create table orderDetails(id integer primary key auto_increment,orderId int,product int ,price float, quantity int);

select * from category;

select * from company;

select * from product;

select * from user;

truncate user;   <--so duplicate users should be not allowed-->
alter table user add unique(email);<--to make user email unique-->
desc user;


  <--for to check confirm account-->
  alter table user drop column isActive;
  alter table user add column status  int(1);
  <--0:user not verified 1:active 2:deactivated-->
  alter table user add Unique(email);


<--after verifying  account user status will be changed to 1 from 0  you can check it in user table-->

<--to get an product information from cart product id-->
select * from cart c inner join product p where c.id=p.id;