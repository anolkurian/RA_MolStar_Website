CREATE TABLE Users (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  Username VARCHAR(50) NOT NULL,
  Password VARCHAR(100) NOT NULL
);


select * from users

Insert into users (Username, Password)
values ('admin','admin')