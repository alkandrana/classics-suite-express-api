import 'dotenv/config';
import {drizzle} from 'drizzle-orm/libsql';
import {eq} from 'drizzle-orm';
import {languages} from '../db/schema.js';

const db = drizzle(process.env.DB_FILE_NAME);

export async function getLanguages(req, res) {
    const languageList = await db.select().from(languages);
    return res.json(languageList);
}

export async function getLanguage(req, res) {
    const languageId = req.params.id;
    const [language] = await db.select().from(languages).where(eq(languages.id, languageId));
    return res.json(language);
}

export async function createLanguage(req, res) {
    const language = req.body;
    const response = await db.insert(languages).values(language);
    console.log("Creating: ", response);
    return res.json({
        status: `Rows affected: ${response.rowsAffected}`,
        message: "Language created successfully"
    });
}

export async function updateLanguage(req, res) {
    const languageId = req.params.id;
    const languageData = req.body;
    const response = await db.update(languages).set(languageData).where(eq(languages.id, languageId));
    console.log("Updating: ", response);
    return res.json({
        id: languageId,
        status: response.info,
        message: "Language updated successfully"
    });
}

export async function deleteLanguage(req, res) {
    const languageId = req.params.id;
    const response = await db.delete(languages).where(eq(languages.id, languageId));
    console.log("Deleting: ", response);
    return res.json({
        id: languageId,
        status: `Rows affected: ${response.rowsAffected}`,
        message: "Language deleted successfully"
    });
}