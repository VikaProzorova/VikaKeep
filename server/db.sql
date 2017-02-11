drop table if exists notes;
drop table if exists users;
drop table if exists tags;
drop table if exists notesTagsMap;

create table users (
    id       INT          NOT NULL AUTO_INCREMENT,
    email    VARCHAR(40)  NOT NULL,
    password VARCHAR(100) NOT NULL,
    name     VARCHAR(40)  NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY (email)
)   DEFAULT CHARACTER SET utf8;

create table notes (
    id        INT         NOT NULL AUTO_INCREMENT,
    text      TEXT        NOT NULL,
    date      DATETIME    NOT NULL,
    isDeleted BOOLEAN     NOT NULL DEFAULT FALSE,
    user      INT         NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users (id)
)   DEFAULT CHARACTER SET utf8;

create table tags (
    id       INT          NOT NULL AUTO_INCREMENT,
    name     VARCHAR(20)  NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY (name)
)   DEFAULT CHARACTER SET utf8;

create table notesTagsMap (
    tagID    INT          NOT NULL,
    noteID   INT          NOT NULL,

    PRIMARY KEY (tagID, noteID),
    FOREIGN KEY (tagID) REFERENCES tags (id),
    FOREIGN KEY (noteID) REFERENCES notes (id)
)   DEFAULT CHARACTER SET utf8;


-- create table customers (
--     id          INT          NOT NULL AUTO_INCREMENT,
--     parentID    INT,
--     name        VARCHAR(40)  NOT NULL,
--     description VARCHAR(100) NOT NULL,
--     project     VARCHAR(40)  NOT NULL,
--     priority    ENUM('low', 'normal', 'high') NOT NULL DEFAULT 'normal',

--     PRIMARY KEY (id),
--     UNIQUE KEY (name),
--     FOREIGN KEY (project) REFERENCES projects (id)
-- ) DEFAULT CHARACTER SET utf8;

-- create table teammates (
--     id          INT          NOT NULL AUTO_INCREMENT,
--     name        VARCHAR(40)  NOT NULL,
--     project     VARCHAR(40)  NOT NULL,
--     priority    ENUM('low', 'normal', 'high') NOT NULL DEFAULT 'normal',

--     PRIMARY KEY (id),
--     UNIQUE KEY (name),
--     FOREIGN KEY (project) REFERENCES projects (id)
-- ) DEFAULT CHARACTER SET utf8;

-- create table projects (
--     id          INT          NOT NULL AUTO_INCREMENT,
--     parentID    INT,
--     name        VARCHAR(40)  NOT NULL,
--     description VARCHAR(100) NOT NULL,
--     priority    ENUM('low', 'normal', 'high') NOT NULL DEFAULT 'normal',

--     PRIMARY KEY (id),
--     UNIQUE KEY (name),
-- ) DEFAULT CHARACTER SET utf8;
