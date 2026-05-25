import 'dotenv/config';
import {drizzle} from 'drizzle-orm/libsql';
import {count, eq} from 'drizzle-orm';
import {opera, lines, authors, languages} from '../db/schema.js';

const db = drizzle(process.env.DB_FILE_NAME);

export async function getOpera(req, res) {
    const opusList = await db.select().from(opera);
    for (const op of opusList) {
        let [lineCount] = await db.select({count: count()}).from(lines).where(eq(lines.opusId, op.id));
        op.lineCount = lineCount.count;
        [op.author] = await db.select().from(authors).where(eq(authors.id, op.authorId));
        [op.language] = await db.select().from(languages).where(eq(languages.id, op.languageId));
    }
    return res.json(opusList);
}

export async function getOpusByCode(req, res) {
    const code = req.params.code;
    const opus = await db.select().from(opera).where(eq(opera.code, code));
    for (const op of opus) {
        [op.author] = await db.select().from(authors).where(eq(authors.id, op.authorId));
    }
    return res.json(opus);
}

export async function getOpus(req, res) {
    const opusId = req.params.id;
    const [opus] = await db.select().from(opera).where(eq(opera.id, opusId));
    [opus.author] = await db.select().from(authors).where(eq(authors.id, opus.authorId));
    [opus.language] = await db.select().from(languages).where(eq(languages.id, opus.languageId));
    const opusLines = await db.select().from(lines).where(eq(lines.opusId, opusId));
    const sectionedLines = Object.groupBy(opusLines, ({locus}) => {
        let secs = locus.split(".");
        let currentSec = secs.slice(0, secs.length - 1);
        return currentSec.length == 0 ? "unsectioned" : currentSec[0];
    });
    opus.lines = sectionedLines;
    return res.json(opus);
}


export async function createOpus(req, res) {
    const opus = req.body;
    console.log("Opus to add: ", opus);
    const response = await db.insert(opera).values(opus);
    console.log("Creating: ", response);
    return res.json({
        status: `Rows affected: ${response.rowsAffected}`,
        message: "Work created successfully"
    });
}

export async function updateOpus(req, res) {
    const opusId = req.params.id;
    const opusData = req.body;
    const response = await db.update(opera).set(opusData).where(eq(opera.id, opusId));
    console.log("Updating: ", response);
    return res.json({
        id: opusId,
        status: response.info,
        message: "Work updated successfully"
    });
}

export async function deleteOpus(req, res) {
    const opusId = req.params.id;
    const response = await db.delete(opera).where(eq(opera.id, opusId));
    console.log("Deleting: ", response);
    return res.json({
        id: id,
        status: `Rows affected: ${response.rowsAffected}`,
        message: "Work deleted successfully"
    });
}