import connection from '../../database.config.js';
import {
    reportNoData,
    recordExists,
    reportNoRecord,
    reportSuccess,
    reportServerError,
    reportNotFound, getSql
} from '../utils/responses.js';
import {author as authorMap, buildMetadata} from "./metadata.js";

// ---- READ ----
// /works
export const getWorks = async function (req, res) {
    try {
        const sql = "SELECT * FROM Opera ORDER BY title";
        const [rows] = await connection.execute(sql);
        if (rows.length === 0) {
            return reportNotFound(res, "Work");
        } else {
            return res.json(rows);
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// /works/author/:name
export const getWorksByAuthor = async function (req, res) {
    const authorKey = '%' + req.params.name + '%';
    try {
        const sql = `SELECT *
                     FROM Opera
                              JOIN Authors ON Opera.authorId = Authors.id
                     WHERE Authors.name LIKE ?
                     ORDER BY Opera.title`;
        const [rows] = await connection.execute(sql, [authorKey]);
        if (rows.length === 0) {
            return reportNotFound(res, "Work");
        } else {
            return res.json(rows);
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// /works/title/:title
export const getWorksByTitle = async function (req, res) {
    const keyword = "%" + req.params.title + "%";
    try {
        const sql = `SELECT *
                     FROM Opera
                     WHERE title LIKE ?
                     ORDER BY title`;
        const [rows] = await connection.execute(sql, [keyword]);
        if (rows.length === 0) {
            return reportNotFound(res, "Work");
        } else {
            return res.json(rows);
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// /works/:id
export const getWorkById = async function (req, res) {
    const id = req.params.id;
    try {
        const sql = `SELECT o.id, o.title, a.name, o.language
                     FROM Opera o
                              JOIN Authors a ON a.id = o.authorId
                     WHERE o.ID = ?`;
        const [rows] = await connection.execute(sql, [id]);
        if (rows.length === 0) {
            return reportNotFound(res, "Work");
        } else {
            return res.json(rows[0]);
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

export const getMetadata = async (req, res) => {
    try {
        const sql = "DESC opera";
        const [rows] = await connection.execute(sql);
        if (rows.length === 0) {
            return res.status(404).json({
                error: "Not Found",
                message: "No records match the search criteria"
            });
        } else {
            const metadataList = [];
            for (let row of rows) {
                let metadata = buildMetadata(row, authorMap);
                metadataList.push(metadata);
            }
            return res.json(metadataList);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Database error",
            message: "There was an error fetching the data."
        });
    }
}
// ---- CREATE ----

export const createWork = async function (req, res) {
    const {code, title, authorId, language} = req.body;
    const values = [code, title, authorId, language];
    if (!code || !authorId || !title) {
        return reportNoData(res, "Title, AuthorId, and WorkId are required");
    }
    try {
        const authorCheck = `SELECT id
                             FROM Authors
                             WHERE id = ?`;
        if (!await recordExists(authorCheck, connection, authorId)) {
            return reportNoRecord(res, "Author");
        }
        console.log("I didn't return!");
        const sql = `INSERT INTO Opera (code, title, authorId, language)
                     VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(sql, values);
        if (result.affectedRows === 1) {
            return reportSuccess(res, "Work");
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// ---- UPDATE ----
export const updateWork = async function (req, res) {
    const id = req.params.id;
    const authorId = req.body.authorId;
    const [columns, values] = [[], []];
    getSql(req.body, columns, values);
    values.push(id);
    try {
        const opusCheck = "SELECT id FROM Opera WHERE id=?";
        if (!await recordExists(opusCheck, connection, id)) {
            return reportNoRecord(res, "Work");
        }
        const authorCheck = "SELECT id FROM Authors WHERE id = ?";
        if (!await recordExists(authorCheck, connection, authorId)) {
            return reportNoRecord(res, "Author");
        }
        const sql = `UPDATE Opera
                     SET ${columns.join(", ")}
                     WHERE id = ?`;
        const [result] = await connection.execute(sql, values);
        if (result.affectedRows === 1) {
            return reportSuccess(res, "Work");
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// ---- DELETE ----
export const deleteWork = async function (req, res) {
    const id = req.params.id;
    try {
        const opusCheck = "SELECT id FROM Opera WHERE id=?";
        if (!await recordExists(opusCheck, connection, id)) {
            return reportNoRecord(res, "Work");
        }
        const sql = `DELETE
                     FROM Opera
                     WHERE id = ?`;
        const [result] = await connection.execute(sql, [id]);
        if (result.affectedRows === 1) {
            return reportSuccess(res, "Work");
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}