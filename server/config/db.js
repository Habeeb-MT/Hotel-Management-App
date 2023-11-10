import pkg from 'pg';
const { Pool } = pkg;
const client = new Pool({
    user: "postgres",
    password: "hotel",
    host: "localhost",
    port: 5432,
    database: "hotel"
});

export default client;