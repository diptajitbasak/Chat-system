const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const db = new Database(
    path.join(__dirname, "../database/chat.db")
);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Read SQL schema
const schema = fs.readFileSync(
    path.join(__dirname, "../database/schema.sql"),
    "utf8"
);

// Execute SQL schema
db.transaction(() => {
    db.exec(schema);
})();

console.log("SQLite database connected");
console.log("Database tables initialized");

console.log("SQLite database connected");

module.exports = db;
