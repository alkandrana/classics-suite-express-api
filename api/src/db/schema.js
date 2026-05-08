import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const authors = sqliteTable("authors", {
    id: int().primaryKey({autoIncrement: true}),
    code: text().notNull().unique(),
    name: text().notNull(),
    praenomen: text(),
    nomen: text(),
    cognomen: text()
});

export const languages = sqliteTable("languages", {
    id: int().primaryKey({autoIncrement: true}),
    name: text().notNull()
});

export const opera = sqliteTable("opera", {
    id: int().primaryKey({autoIncrement: true}),
    code: text().notNull(),
    title: text().notNull(),
    languageId: int("language_id").references(() => languages.id),
    authorId: int("author_id").references(() => authors.id)
});

export const lines = sqliteTable("lines", {
    id: int().primaryKey({autoIncrement: true}),
    number: int().notNull(),
    text: text().notNull(),
    locus: text().notNull(),
    opusId: int("opus_id").references(() => opera.id),
});