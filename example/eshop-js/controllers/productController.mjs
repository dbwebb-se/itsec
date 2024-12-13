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
 * Show top 10 female products in the Product table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const showProductsTop10Female = async () => {
    const sql = `CALL show_products(?,?);`;
    const params = [0, 10];

    try {
        const result = await db.query(sql, params);

        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show top 10 male products in the Product table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const showProductsTop10Male = async () => {
    const sql = `CALL show_products(?,?);`;
    const params = [1, 10];

    try {
        const result = await db.query(sql, params);

        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show female products under 500 in the Product table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const showProductsUnder500Female = async () => {
    const sql = `CALL show_products_under500(?);`;

    try {
        const result = await db.query(sql, [0]);

        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show male products under 500 in the Product table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const showProductsUnder500Male = async () => {
    const sql = `CALL show_products_under500(?);`;

    try {
        const result = await db.query(sql,[1]);

        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show specific product in the Product table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const showSpecificProduct = async (productId) => {
    const sql = `CALL show_one_product(?);`;

    try {
        if ( typeof productId == 'number' && productId < 100000) {
            const result = await db.query(sql, [productId]);

            return result[0] === null ? undefined : result[0][0];
        }
        return undefined;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Search for products in database.
 * @method searchProducts()
 * @param  string  $searchString search string
 * @return array with products.
 */
export const searchProducts = async (searchString) => {
    const sql = `CALL search_products(?,?);`;
    const params = ['',0];
    
    if (isNumeric(searchString)) {
        params[1] = isNumeric(searchString);
    }
    params[0] = '%' + searchString + '%';

    try {
        if (searchString !== undefined && searchString !== "" && 
            searchString.match('^[a-zA-Z0-9 åäöÅÄÖ]+$') && searchString.length <= 40) {
            const result = await db.query(sql, params);

            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Converts a numeric string to an integer and return an integer if the string only contains
 * numbers and null otherwise.
 * @method isNumeric()
 * @param  string  $str string to check
 * @return integer | null 
 */
function isNumeric(str) {
    if (/^[0-9]+$/.test(str)) {
        return parseInt(str, 10);
    }
    return null; 
}

export const getOneProduct = async (productId) => {
    let sql = `CALL get_one_product(?);`;

    try {
        let result = await db.query(sql, [productId] );
        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
};