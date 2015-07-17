drop table if exists notes;
drop table if exists users;


create table notes (
    id        INT         NOT NULL AUTO_INCREMENT,
    text      TEXT        NOT NULL,
    date      DATETIME    NOT NULL,
    isDeleted BOOLEAN     NOT NULL DEFAULT FALSE,
    user      VARCHAR(40) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users (email)
);

create table users (
    email        VARCHAR(40) NOT NULL,
    password     VARCHAR(20) NOT NULL, --TODO
    securityCode VARCHAR(50) NOT NULL,

    PRIMARY KEY (email)
);