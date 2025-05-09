/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */

// here we have to know that in order to make something in database it require to be connected in the process that's why we imported here in this project

import pool from "../config/db.js";

import { logger } from "../utils/index.js";

export const getAllStudents = async (req, res) => {

  try {
    const students = await pool.query("SELECT * FROM students");
    res.status(200).json({  
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }
};
