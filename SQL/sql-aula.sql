
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| phpmyadmin         |
| sakila             |
| sys                |
| world              |
+--------------------+

mysql> CREATE DATABASE poo;

mysql> USE poo;
Database changed

mysql> CREATE TABLE pessoa(
    -> id INT AUTO_INCREMENT PRIMARY KEY,
    -> nome VARCHAR(200) NOT NULL,
    -> email VARCHAR(100) NOT NULL
    -> );

mysql> CREATE TABLE carro(
    -> placa VARCHAR(7) PRIMARY KEY,
    -> modelo VARCHAR(20) NOT NULL,
    -> pessoa_id INT NOT NULL,
    -> FOREIGN KEY (pessoa_id) REFERENCES pessoa(id)
    -> );
 
mysql> DESCRIBE pessoa;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int          | NO   | PRI | NULL    | auto_increment |
| nome  | varchar(200) | NO   |     | NULL    |                |
| email | varchar(100) | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+


mysql> INSERT INTO pessoa (nome,email) VALUES ("Maria","maria@ufmt.br");

mysql> INSERT INTO pessoa (nome,email) VALUES ("Ricardo","ricardo@ufmt.br");

mysql> INSERT INTO pessoa (nome,email) VALUES ("Ricardo","ricardo@ufmt.br"),("Ana","ana@ufmt.br");

mysql> SELECT * FROM pessoa;
+----+---------+-----------------+
| id | nome    | email           |
+----+---------+-----------------+
|  1 | Maria   | maria@ufmt.br   |
|  2 | Ricardo | ricardo@ufmt.br |
|  3 | Ricardo | ricardo@ufmt.br |
|  4 | Ana     | ana@ufmt.br     |
+----+---------+-----------------+

mysql> UPDATE pessoa SET nome = "Alfredo" WHERE id LIKE 3;

mysql> SELECT * FROM pessoa;
+----+---------+-----------------+
| id | nome    | email           |
+----+---------+-----------------+
|  1 | Maria   | maria@ufmt.br   |
|  2 | Ricardo | ricardo@ufmt.br |
|  3 | Alfredo | ricardo@ufmt.br |
|  4 | Ana     | ana@ufmt.br     |
+----+---------+-----------------+

mysql> UPDATE pessoa SET email = "fredinho@gmail.com" WHERE id LIKE 3;

mysql> SELECT * FROM pessoa;
+----+---------+--------------------+
| id | nome    | email              |
+----+---------+--------------------+
|  1 | Maria   | maria@ufmt.br      |
|  2 | Ricardo | ricardo@ufmt.br    |
|  3 | Alfredo | fredinho@gmail.com |
|  4 | Ana     | ana@ufmt.br        |
+----+---------+--------------------+


mysql> INSERT INTO carro (placa,modelo,pessoa_id) VALUES ("BLB1234","Fusca",1);

mysql> INSERT INTO carro (placa,modelo,pessoa_id) VALUES ("KDN2312","Corolla",1);


mysql> INSERT INTO carro (placa,modelo,pessoa_id) VALUES ("KDN2312","Gol",2);
ERROR 1062 (23000): Duplicate entry 'KDN2312' for key 'carro.PRIMARY'
mysql> INSERT INTO carro (placa,modelo,pessoa_id) VALUES ("KDN2313","Gol",2);


mysql> INSERT INTO carro (placa,modelo,pessoa_id) VALUES ("ABC1234","Palio",3);


mysql> INSERT INTO carro (placa,modelo,pessoa_id) VALUES ("ABC1235","Gol",4);


mysql> SELECT * FROM carro;
+---------+---------+-----------+
| placa   | modelo  | pessoa_id |
+---------+---------+-----------+
| ABC1234 | Palio   |         3 |
| ABC1235 | Gol     |         4 |
| BLB1234 | Fusca   |         1 |
| KDN2312 | Corolla |         1 |
| KDN2313 | Gol     |         2 |
+---------+---------+-----------+


mysql> SELECT * FROM pessoa WHERE id LIKE 3;
+----+---------+--------------------+
| id | nome    | email              |
+----+---------+--------------------+
|  3 | Alfredo | fredinho@gmail.com |
+----+---------+--------------------+


mysql> SELECT * FROM carro INNER JOIN pessoa ON carro.pessoa_id = pessoa.id;
+---------+---------+-----------+----+---------+--------------------+
| placa   | modelo  | pessoa_id | id | nome    | email              |
+---------+---------+-----------+----+---------+--------------------+
| BLB1234 | Fusca   |         1 |  1 | Maria   | maria@ufmt.br      |
| KDN2312 | Corolla |         1 |  1 | Maria   | maria@ufmt.br      |
| KDN2313 | Gol     |         2 |  2 | Ricardo | ricardo@ufmt.br    |
| ABC1234 | Palio   |         3 |  3 | Alfredo | fredinho@gmail.com |
| ABC1235 | Gol     |         4 |  4 | Ana     | ana@ufmt.br        |
+---------+---------+-----------+----+---------+--------------------+


mysql> SELECT * FROM carro;
+---------+---------+-----------+
| placa   | modelo  | pessoa_id |
+---------+---------+-----------+
| ABC1234 | Palio   |         3 |
| ABC1235 | Gol     |         4 |
| BLB1234 | Fusca   |         1 |
| KDN2312 | Corolla |         1 |
| KDN2313 | Gol     |         2 |
+---------+---------+-----------+


mysql> SELECT * FROM carro WHERE modelo LIKE "Gol";
+---------+--------+-----------+
| placa   | modelo | pessoa_id |
+---------+--------+-----------+
| ABC1235 | Gol    |         4 |
| KDN2313 | Gol    |         2 |
+---------+--------+-----------+


mysql> CREATE TABLE empresa(
    -> cnpj VARCHAR(15) NOT NULL,
    -> nome VARCHAR(100) NOT NULL,
    -> PRIMARY KEY(cnpj)
    -> );


mysql> CREATE TABLE pessoa_empresa(
    -> pessoa_id INT NOT NULL,
    -> empresa_cnpj VARCHAR(15) NOT NULL,
    -> FOREIGN KEY(pessoa_id) REFERENCES pessoa(id),
    -> FOREIGN KEY(empresa_cnpj) REFERENCES empresa(cnpj),
    -> PRIMARY KEY(pessoa_id,empresa_cnpj)
    -> );


mysql> INSERT INTO empresa (cnpj,nome) VALUES ("123","Nestlé");


mysql> INSERT INTO empresa (cnpj,nome) VALUES ("456","Mercado Livre");


mysql> INSERT INTO pessoa_empresa(pessoa_id,empresa_cnpj) VALUES (1,123);


mysql> INSERT INTO pessoa_empresa(pessoa_id,empresa_cnpj) VALUES (1,123);
ERROR 1062 (23000): Duplicate entry '1-123' for key 'pessoa_empresa.PRIMARY'
mysql> INSERT INTO pessoa_empresa(pessoa_id,empresa_cnpj) VALUES (1,456);


mysql> INSERT INTO pessoa_empresa(pessoa_id,empresa_cnpj) VALUES (2,456);


mysql> SELECT * FROM pessoa_empresa;
+-----------+--------------+
| pessoa_id | empresa_cnpj |
+-----------+--------------+
|         1 | 123          |
|         1 | 456          |
|         2 | 456          |
+-----------+--------------+

mysql> SELECT * FROM pessoa_empresa
    -> INNER JOIN pessoa ON pessoa_empresa.pessoa_id = pessoa.id
    -> INNER JOIN empresa ON pessoa_empresa.empresa_cnpj = empresa.cnpj
    -> ;
+-----------+--------------+----+---------+-----------------+------+---------------+
| pessoa_id | empresa_cnpj | id | nome    | email           | cnpj | nome          |
+-----------+--------------+----+---------+-----------------+------+---------------+
|         1 | 123          |  1 | Maria   | maria@ufmt.br   | 123  | Nestlé        |
|         1 | 456          |  1 | Maria   | maria@ufmt.br   | 456  | Mercado Livre |
|         2 | 456          |  2 | Ricardo | ricardo@ufmt.br | 456  | Mercado Livre |
+-----------+--------------+----+---------+-----------------+------+---------------+


mysql> INSERT INTO empresa (cnpj,nome) VALUES ("456","Mercado Livre");
mysql> SELECT * FROM pessoa_empresa INNER JOIN pessoa ON pessoa_empresa.pessoa_id = pessoa.id  INNER JOIN empresa ON pessoa_empresa.empresa_cnpj = empresa.cnpj;
+-----------+--------------+----+---------+-----------------+------+---------------+
| pessoa_id | empresa_cnpj | id | nome    | email           | cnpj | nome          |
+-----------+--------------+----+---------+-----------------+------+---------------+
|         1 | 123          |  1 | Maria   | maria@ufmt.br   | 123  | Nestlé        |
|         1 | 456          |  1 | Maria   | maria@ufmt.br   | 456  | Mercado Livre |
|         2 | 456          |  2 | Ricardo | ricardo@ufmt.br | 456  | Mercado Livre |
+-----------+--------------+----+---------+-----------------+------+---------------+
