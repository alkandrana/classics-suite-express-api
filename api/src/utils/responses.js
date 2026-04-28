export function reportNoData(res, message){
    return res.status(400).json({
        error: message
    });
}

export function reportNoRecord(res, tableName){
    return res.status(400).json({
        error: `Invalid ${tableName}`,
        message: `The provided ${tableName} ID does not exist.`
    });
}

export function reportNotFound(res, tableName){
    return res.status(404).json({
        error: `Not Found`,
        message: `No ${tableName}s match the search criteria.`
    });
}

export function reportSuccess(res, tableName){
    return res.status(201).json({
        message: `${tableName} updated successfully.`
    });
}

export function reportServerError(res, e){
    console.error("Database error: ", e);
    return res.status(500).json({
        error: "Internal Server Error"
    });
}

export async function recordExists(sql, connection, pathVar){
    const [tableCheck] = await connection.execute(sql, [pathVar]);
    return tableCheck.length === 1;
}

export function getSql(data, cols, values) {
    const colMap = {
        nativeName: "nomen",
        commonName: "name",
        firstName: "praenomen",
        nickName: "cognomen"
    }

    for (let key in data) {
        for (let subKey in colMap) {
            if (key === subKey && data[key]) {
                cols.push(`${colMap[subKey]} = ?`)
                values.push(data[key]);
            }
        }
    }
}
