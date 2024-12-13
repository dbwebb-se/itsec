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

/**
 * Show all the categories for a gender in the Category table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const getAllCategoriesGender = async (gender) => {
    const sql = `CALL show_categories(?);`;

    try {
        if (gender == 0 || gender == 1) {
            const result = await db.query(sql, [gender]);

            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show all the sub categories for a gender in the Category table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const getAllSubCategories = async (parentId) => {
    const sql = `CALL show_sub_categories(?);`;

    try {
        if (!isNaN(parentId) && parentId < 100000) {
            const result = await db.query(sql, [parentId]);

            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show a specific category in the Category table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const getSpecificCategory = async (parentId) => {
    const sql = `CALL show_specific_category(?);`;

    try {
        if (!isNaN(parentId) && parentId < 100000) {
            const result = await db.query(sql, [parentId]);

            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show a specific category in the Category table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const getProductsFromSpecificCategory = async (categoryId) => {
    const sql = `CALL show_products_from_specific_category(?);`;

    try {
        if (!isNaN(categoryId) && categoryId < 100000) {
            const result = await db.query(sql, [categoryId]);

            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};