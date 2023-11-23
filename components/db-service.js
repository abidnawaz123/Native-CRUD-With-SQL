import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'todo-data.db', location: 'default' });
};

export const createTable = async (db) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT
    );`;
    await db.executeSql(query);
};

export const getTodoItems = async (db) => {
    try {
        const todoItems = [];
        const results = await db.executeSql(`SELECT rowid AS id,value FROM ${tableName}`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                todoItems.push(result.rows.item(index))
            }
        });
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get todoItems !!!');
    }
};

export const saveTodoItems = async (db, todoItems) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
        todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');
    return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db, id) => {
    const deleteQuery = `DELETE FROM ${tableName} WHERE rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

export const getTodoData = db => {
    return select(db, 'SELECT * FROM todoData;');
};

export const select = async (db, query) => {
    const users = [];
    const results = await db.executeSql(query);
    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            users.push(result.rows.item(index));
        }
    });
    return users;
}

export const deleteTable = async (db) => {
    const query = `DROP TABLE ${tableName}`
    await db.executeSql(query);
};
