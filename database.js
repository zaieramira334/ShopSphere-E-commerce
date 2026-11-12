
const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "shopsphere",
    port: 3306
};

async function query(sql) {
    let connection;

    try {
        connection = await mysql.createConnection(config);

        const [rows] = await connection.execute(sql);

        return rows;

    } catch (error) {
        console.log("Database query failed:", error);
        throw error;

    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function connectDatabase() {
    try {
        const connection = await mysql.createConnection(config);

        console.log("Connected to ShopSphere database");

        return connection;

    } catch (error) {
        console.log("Database connection failed:", error);
        return null;
    }
}

module.exports = {
    query,
    connectDatabase
};
