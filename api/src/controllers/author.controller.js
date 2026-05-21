import 'dotenv/config';
import {drizzle} from 'drizzle-orm/libsql';
import {eq} from 'drizzle-orm';
import {authors} from '../db/schema.js';

const db = drizzle(process.env.DB_FILE_NAME);

export async function getAuthors(req, res) {
    const authorList = await db.select().from(authors);
    return res.json(authorList);
}

export async function getAuthor(req, res) {
    const authorId = req.params.id;
    const [author] = await db.select().from(authors).where(eq(authors.id, authorId));
    return res.json(author);
}

export async function createAuthor(req, res) {
    const author = req.body;
    const response = await db.insert(authors).values(author);
    console.log("Creating: ", response);
    return res.json({
        status: `Rows affected: ${response.rowsAffected}`,
        message: "Author created successfully"
    });
}

export async function updateAuthor(req, res) {
    const authorId = req.params.id;
    const authorData = req.body;
    const response = await db.update(authors).set(authorData).where(eq(authors.id, authorId));
    console.log("Updating: ", response);
    return res.json({
        id: authorId,
        status: response.info,
        message: "Author updated successfully"
    });
}

export async function deleteAuthor(req, res) {
    const authorId = req.params.id;
    const response = await db.delete(authors).where(eq(authors.id, authorId));
    console.log("Deleting: ", response);
    return res.json({
        id: id,
        status: `Rows affected: ${response.rowsAffected}`,
        message: "Author deleted successfully"
    });
}