/**
 * This file serves as the main entry point for all controller functions.
 * It currently imports the `getAllStudents` function from the student controller.
 *
 * To add more controllers, import them here and export as needed.
 */

// 

//after making the function in the database you have to import in the file as the main the point entry 

import { getAllStudents } from "./student.controller.js";

export { getAllStudents };
