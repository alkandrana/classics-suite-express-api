import connection from '../../database.config.js';

export const author = {
    code: "Abbreviation",
    name: "Common Name",
    praenomen: "First Name",
    nomen: "Native Name",
    cognomen: "Nickname"
};

export const opus = {
    code: "Abbreviation",
    title: "Title",
    language: "Language",
    authorId: "Author"
}

export function buildMetadata(field, map, tableData) {
    console.log("Table Map: ", map);
    const metadata = {};
    metadata.name = field.Field;
    metadata.label = map[field.Field];
    console.log(field.Field, map[field.Field]);
    if (field["Type"].includes("enum")) {
        getEnumList(tableData, field["Type"], metadata);
    } else if (field["Type"].includes("varchar")) {
        metadata.datatype = "string";
    } else if (field["Type"].includes("int")) {
        metadata.datatype = "int";
    } else {
        metadata.datatype = field["Type"];
    }
    if (field.Key === "PRI") {
        metadata.isPrimaryKey = true;
    } else if (field.Key === "MUL") {
        metadata.isForeignKey = true;
        metadata.valueList = field.values;
    } else if (field.Key === "UNI") {
        metadata.isUnique = true;
    }
    metadata.nullable = field.Null === "YES";
    metadata.hasAutoIncrement = field.Extra === "auto_increment";
    metadata.default = {
        hasDefault: field.Default !== null,
        defaultValue: field.Default
    };
    return metadata;
}

function getEnumList(tableData, enumString, metadata) {
    let typeParts = enumString.split(/[()]/);
    let valueList = typeParts[1].split(",").map(v => v.replaceAll("'", ""));
    metadata.datatype = typeParts[0];
    metadata.valueList = [];

    for (let v of valueList) {
        let value = {};
        value.id = v;
        value.label = v;
        value.name = v;
        metadata.valueList.push(value);
    }
}

export const getList = async (res, sql, where = "") => {
    try {
        const [rows] = await connection.execute(sql, [where]);
        if (!rows || !rows.length) {
            return res.status(404).send({
                error: "Not Found",
                message: "No records match the search criteria"
            });
        } else {
            console.log("In getList: ", rows);
            return rows;
        }
    } catch (error) {
        res.status(500).send({
            error: "Database Error",
            message: "There was an error accessing the database"
        });
    }
}