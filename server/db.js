import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
    user: "postgres",
    password: "2018",
    host: "localhost",
    port: 5432,
    database: "hotel"
});

export default db;