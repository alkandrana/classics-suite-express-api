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

export function buildMetadata(field, map) {
    const metadata = {};
    metadata.name = field.Field;
    metadata.label = map[field.Field];
    console.log(field.Field, map[field.Field]);
    if (field["Type"].includes("enum")) {
        let typeParts = field["Type"].split(/[()]/);
        let valueList = typeParts[1].split(",").map(v => v.replaceAll("'", ""));
        metadata.datatype = typeParts[0];
        metadata.valueList = valueList;
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