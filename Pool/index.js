const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydatabase",
  password: "newpassword",
  port: 5432,
});

async function run() {
  const client = await pool.connect();
  try {
    console.log("Connected to PostgreSQL");

    await client.query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100))"
    );
    console.log("Table created");

    await client.query("INSERT INTO users (name) VALUES ($1)", ["John Doe"]);
    console.log("Data inserted");

    const res = await client.query("SELECT * FROM users");
    console.log("Data queried:", res.rows);
  } catch (err) {
    console.error("Error:", err.stack);
  } finally {
    client.release();
    console.log("Connection released");
    pool.end();
  }
}

run();
