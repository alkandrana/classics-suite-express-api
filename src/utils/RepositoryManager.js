class RepositoryManager  {
    constructor(tables){
        this.tables = tables;
    }

    getAll(tableName){
        let sql;
        if (this.tables.includes(tableName)){
            sql = `SELECT * FROM ${tableName};`
        } else {
            sql = "Error: table name invalid."
        }
        return sql;
    }

    getOne(tableName, keyName){
        let sql;
        if (this.tables.includes(tableName) && keyName.toLowerCase().includes("id")){
            sql = `SELECT * FROM ${tableName} WHERE ${keyName} = ?;`
        } else {
            sql = `Error: table or column name invalid.`;
        }
        return sql;
    }

    create(tableName, data){
        let columns = Object.keys(data);
        let colNum = columns.length;
        const placeholders = Array(colNum).fill("?");
        let sql;
        if (this.tables.includes(tableName)){
            sql = `INSERT INTO ${tableName} (${columns.join(", ")})
                    VALUES (${placeholders.join(", ")})`;
        } else {
            sql = "ERROR: table name invalid.";
        }
        return sql;
    }




}