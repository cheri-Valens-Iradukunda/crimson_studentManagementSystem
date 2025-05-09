/**
 * This file handles the database connection using PostgreSQL.
 * It sets up a connection pool and logs the connection status.
 *
 * Ensure your database credentials are set in the .env file.
 */

import pkg from "pg";
import dotenv from "dotenv";
import { logger } from "../utils/index.js";

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: true,
  connectionTimeoutMillis: 20000, 
  // this is the time of request must await after the time will be the timeout even if the request is not being executing in process
});


(async function () {
  const client = await pool.connect();
  try {
    logger.info("Connected to PostgreSQL Database");
    await client.query(`
      CREATE TABLE IF NOT EXISTS  students (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        student_id VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        date_of_birth DATE NOT NULL,
        contact_number VARCHAR(20) NOT NULL UNIQUE,
        enrollment_date DATE NOT NULL,
        profile_picture VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS  department (
        id SERIAL PRIMARY KEY,
        name VARCHAR(225)
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS  course (
        id SERIAL PRIMARY KEY,
        name VARCHAR(225),
        dep_id INT,
        FOREIGN KEY(dep_id) REFERENCES department(id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS  lecture (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(225),
        last_name VARCHAR(225),
        course_id INT,
        FOREIGN KEY(course_id) REFERENCES course(id)
      );
    `);
    
    await client.query(`
      INSERT INTO students (first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date)
      VALUES
        ('John', 'Doe', 'S12345', 'john.doe@example.com', '2000-01-01', '1234567890', '2023-01-01'),
        ('Jane', 'Smith', 'S12346', 'jane.smith@example.com', '2000-02-01', '0987654321', '2023-01-01')
      ON CONFLICT (student_id) DO NOTHING;
    `);

    logger.info("Database setup complete");
  } catch (err) {
    logger.error(`Database setup error: ${err.message}`);
  } finally {
    client.release();
  }
})();

export default pool;
