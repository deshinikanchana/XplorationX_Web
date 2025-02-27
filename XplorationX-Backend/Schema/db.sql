CREATE DATABASE xplorationx;

USE xplorationx;

§

CREATE TABLE user(
                     UserId INT AUTO_INCREMENT PRIMARY KEY,
                     Name VARCHAR(100) NOT NULL ,
                     Email VARCHAR(100) UNIQUE NOT NULL ,
                     Password VARCHAR(10)  NOT NULL

);

CREATE TABLE Note(
                     NoteId INT AUTO_INCREMENT PRIMARY KEY,
                     UserId INT NOT NULL ,
                     Topic VARCHAR(100) NOT NULL ,
                     Description VARCHAR(1000) NOT NULL ,
                     FOREIGN KEY(UserId) REFERENCES User(UserId) ON DELETE CASCADE
);

CREATE TABLE Favourites(
                           FavId INT AUTO_INCREMENT PRIMARY KEY,
                           UserId INT NOT NULL,
                           FavTopic VARCHAR(100) NOT NULL,
                           FOREIGN KEY(UserId) REFERENCES User(UserId) ON DELETE CASCADE
);

CREATE TABLE Search(
                       SearchId INT AUTO_INCREMENT PRIMARY KEY,
                       UserId INT NOT NULL ,
                       SearchTopic VARCHAR(100) NOT NULL,
                       FOREIGN KEY(UserId) REFERENCES User(UserId) ON DELETE CASCADE
);