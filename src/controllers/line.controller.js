import 'dotenv/config';
import {drizzle} from 'drizzle-orm/libsql';
import {eq} from 'drizzle-orm';
import {lines} from '../db/schema.js';

const db = drizzle(process.env.DB_FILE_NAME);

export async function getLines(req, res) {
    const lineList = await db.select().from(lines);
    return res.json(lineList);
}

export async function getLinesByOpus(req, res) {
    const opusId = req.params.id;
    const lineList = await db.select().from(lines).where(eq(lines.opusId, opusId));
    return res.json(lineList);
}

export async function getLine(req, res) {
    const lineId = req.params.id;
    const [line] = await db.select().from(lines).where(eq(lines.id, lineId));
    return res.json(line);
}

export async function createLine(req, res) {
    const line = req.body;
    const [result] = await db.insert(lines).values(line).returning();
    console.log("Creating: ", result);
    if (result) {
        return res.json({
            data: result,
            message: "Line created successfully"
        });
    } else {
        return res.status(500).json({
            message: 'There was an error inserting line'
        });
    }

}

export async function updateLine(req, res) {
    const lineId = req.params.id;
    const lineData = req.body;
    const response = await db.update(lines).set(lineData).where(eq(lines.id, lineId));
    console.log("Updating: ", response);
    return res.json({
        id: lineId,
        status: response.info,
        message: "Line updated successfully"
    });
}

export async function deleteLine(req, res) {
    const lineId = req.params.id;
    console.log(req.params.id);
    const response = await db.delete(lines).where(eq(lines.id, lineId));
    console.log("Deleting: ", response);
    return res.json({
        id: lineId,
        status: `Rows affected: ${response.rowsAffected}`,
        message: "Line deleted successfully"
    });
}