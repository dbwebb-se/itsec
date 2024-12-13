/**
 * A module exporting functions to access the itsec database
 * regarding categories and products.
 */
"use strict";

import mysql from "promise-mysql";
import { config } from "../config/db/eshop.mjs";
let db;

/**
 * Main function.
 * @async
 * @returns void
 */
(async () => {
    try {
        db = await mysql.createConnection(config);

        process.on("exit", () => {
            db.end();
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
})();

