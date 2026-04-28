import connection from '../../database.config.js';
import {
    reportNoData,
    recordExists,
    reportNoRecord,
    reportSuccess,
    reportServerError,
    reportNotFound, getSql
} from '../utils/responses.js';

// ---- READ ----
// /works
export const getAuthors = async function(req, res) {
    try {
        const sql = "SELECT * FROM Authors ORDER BY name";
        const [rows] = await connection.execute(sql);
        if (rows.length === 0) {
            return reportNotFound(res, "Author");
        } else {
            return res.json(rows);
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// /authors/name/:name
export const getAuthorsByName = async function(req, res){
    const keyword = "%" + req.params.name + "%";
    try {
        const sql = `SELECT * FROM Authors WHERE name LIKE ? ORDER BY name`;
        const [rows] = await connection.execute(sql, [keyword]);
        if (rows.length === 0) {
            return reportNotFound(res, "Author");
        } else {
            return res.json(rows);
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// /authors/:id
export const getAuthorById = async function(req, res){
    const id = req.params.id;
    try {
        const sql = `SELECT * FROM Authors WHERE id=?`;
        const [rows] = await connection.execute(sql, [id]);
        if (rows.length === 0){
            return reportNotFound(res, "Author");
        } else {
            return res.json(rows[0]);
        }
    } catch (e){
        return reportServerError(res, e);
    }
}

// ---- CREATE ----

export const createAuthor = async function(req, res) {
    const {code, name} = req.body;
    const values = [code, name];
    if (!code || !name) {
        return reportNoData(res, "Author Code and Name are required");
    }
    try {
        const sql = `INSERT INTO Authors (code, name) 
		                    VALUES (?, ?)`;
        const [result] = await connection.execute(sql, values);
        if (result.affectedRows === 1) {
            return reportSuccess(res, "Author");
        }
    } catch (e) {
        return reportServerError(res, e);
    }
}

// ---- UPDATE ----
export const updateAuthor = async function(req, res) {
    const id = req.params.id;
    const [columns, values] = [[], []];
    getSql(req.body, columns, values);
    try {
        const authorCheck = "SELECT id FROM Authors WHERE id = ?";
        if (!await recordExists(authorCheck, connection, id)) {
            return reportNoRecord(res, "Author");
        }
        if (columns.length === 0) {
            return res.status(400).json({
                error: "No valid update fields found."
            });
        }
        values.push(id);
        const sql = `UPDATE Authors SET ${columns.join(", ")} WHERE id=?`;
        const [result] = await connection.execute(sql, values);
        if (result.affectedRows === 1) {
            return reportSuccess(res, "Author");
        }
    } catch (e){
        return reportServerError(res, e);
    }
}

// ---- DELETE ----
export const deleteAuthor = async function(req, res){
    const id = req.params.id;
    try{
        const authorCheck = "SELECT Authors.id FROM Authors WHERE id=?";
        if (!await recordExists(authorCheck, connection, id)) {
            return reportNoRecord(res, "Author");
        }
        const sql = `DELETE FROM Authors WHERE id=?`;
        const [result] = await connection.execute(sql, [id]);
        if (result.affectedRows === 1){
            return reportSuccess(res, "Author");
        }
    } catch (e){
        return reportServerError(res, e);
    }
}