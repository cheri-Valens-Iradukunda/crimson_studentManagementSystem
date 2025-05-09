/**
 * This file serves as an aggregator for all middleware functions.
 * Currently, it exports the requestLogger middleware.
 *
 * Add additional middleware functions here as needed.
 */

// here we importing the request then here we send to the server where it should be

import { requestLogger } from "./requestLogger.js";

// after the requst sent in server then we import the message that inform the process of it where it allocated in project

export { requestLogger };
