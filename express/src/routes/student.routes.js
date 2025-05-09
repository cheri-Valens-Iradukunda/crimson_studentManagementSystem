/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";

// here are those all operation of accessing the product of database functionalities below




import { getAllStudents } from "../controller/student.controller.js";


const router = express.Router();

// this the operation of fetching data through the route we been creating before and then we exported here

router.get("/", getAllStudents);



// here are the way of exporting operation in order to be used in different operation in project

export default router;
