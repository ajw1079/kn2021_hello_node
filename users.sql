create table users (
    num int not null auto_increment,
    userid char(30) not null,
    userpw char(30) not null,
    username char(30) not null,
    email char(80),
    primary key(num)
) charset=utf8;
