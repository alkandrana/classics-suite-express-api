CREATE DATABASE classics_db_node;

USE classics_db_node;

create table Authors
(
    id        bigint       auto_increment primary key,
    code      varchar(5)   unique not null,
    praenomen varchar(255) null,
    nomen     varchar(255) null,
    cognomen  varchar(255) null,
    name      varchar(255) not null
);

CREATE TABLE Opera(
    id bigint auto_increment primary key,
    code varchar(5) unique not null,
    title varchar(255) not null,
    language enum('English', 'Latin', 'Greek', 'Hebrew')
        not null default 'English',
    authorId bigint not null,
    CONSTRAINT fk_opus_author FOREIGN KEY (authorId)
        REFERENCES Authors(id)
);

CREATE TABLE TextNode(
    id bigint auto_increment primary key,
    type enum('Book', 'Chapter', 'Section') not null default 'Section',
    label varchar(255) null,
    sequence int not null,
    opusId bigint not null,
    parentId bigint null,
    CONSTRAINT fk_node_opus FOREIGN KEY (opusId) REFERENCES Opera(id),
    CONSTRAINT fk_node_node FOREIGN KEY (parentId)
        REFERENCES TextNode(id)
);

CREATE TABLE LineNodes
(
    id       bigint AUTO_INCREMENT PRIMARY KEY,
    sequence int      NOT NULL,
    text     longtext not null,
    nodeId   bigint   not null,
    CONSTRAINT fk_nodes_lines FOREIGN KEY (nodeId)
        REFERENCES TextNode (id)
);

CREATE TABLE Vocab(
    id bigint auto_increment primary key,
    lemma varchar(255) not null,
    translation varchar(255) not null,
    language enum('English', 'Latin', 'Greek', 'Hebrew')
        not null default 'English',
    part_of_speech varchar(20) not null
);

CREATE TABLE Comment(
    id bigint auto_increment primary key,
    reference varchar(50) null,
    note varchar(255) not null,
    lineId bigint not null,
    CONSTRAINT fk_lines_comments FOREIGN KEY (lineId)
        REFERENCES LineNodes(id)
);

CREATE TABLE VocabOccurrence(
    lineId bigint not null,
    vocabId bigint not null,
    occurrence varchar(50) null,
    form varchar(50) null,
    part_of_speech varchar(20) null,
    startIndex int null,
    endIndex int null,
    primary key (lineId, vocabId),
    CONSTRAINT fk_lines_occurrences FOREIGN KEY (lineId) REFERENCES LineNodes(id),
    CONSTRAINT fk_vocab_occurrences FOREIGN KEY (vocabId) REFERENCES Vocab(id)
);