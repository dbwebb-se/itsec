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
    //const sql = `CALL show_products();`;
    const sql = `SELECT * FROM Product  WHERE productGender=0 LIMIT 10;`;

    try {
        const result = await db.query(sql);

        return result;
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
    //const sql = `CALL show_products();`;
    const sql = `SELECT * FROM Product WHERE productGender=1 LIMIT 10;`;

    try {
        const result = await db.query(sql);

        return result;
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
    //const sql = `CALL show_products();`;
    const sql = `SELECT * FROM Product  WHERE productGender=0 AND productSellPrize < 500 ORDER BY productSellPrize`;

    try {
        const result = await db.query(sql);

        return result;
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
    //const sql = `CALL show_products();`;
    const sql = `SELECT * FROM Product  WHERE productGender=0 AND productSellPrize < 500 ORDER BY productSellPrize`;

    try {
        const result = await db.query(sql);

        return result;
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
export const showProductsTop10Under500Female = async () => {
    //const sql = `CALL show_products();`;
    const sql = `SELECT * FROM Product  WHERE productGender=0 AND productSellPrize < 500 ORDER BY productSellPrize LIMIT 10`;

    try {
        const result = await db.query(sql);

        return result;
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
export const showProductsTop10Under500Male = async () => {
    //const sql = `CALL show_products();`;
    const sql = `SELECT * FROM Product  WHERE productGender=0 AND productSellPrize < 500 ORDER BY productSellPrize LIMIT 10`;

    try {
        const result = await db.query(sql);

        return result;
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
    //const sql = `CALL show_products();`;
    const sql1 = 'SELECT productID FROM Product';
    const sql2 = `SELECT * FROM Product  WHERE productID=` + productId;

    try {
        if ( typeof productId == 'number' ) {
            const result1 = await db.query(sql1);
            const productIds = JSON.parse(JSON.stringify(result1));
            const contains = productIds.some(item => item.productID === productId);
            if (contains) {
                const result2 = await db.query(sql2);

                return result2[0];
            }
        }
        return undefined;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Show all categories in the Category table.
 *
 * @returns {RowDataPacket} Result set from the query.
 */
export const showCategories = async () => {
    //const sql = `CALL show_categories();`;
    const sql = `SELECT * FROM Category;`;

    try {
        const result = await db.query(sql);

        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Search for products in database.
 * @method searchProducts()
 * @param  string  $searchString searchstring
 * @return array with products.
 */
export const searchProducts = async (searchString) => {
    const sql = `SELECT * FROM Product WHERE productName LIKE` + " '%" + searchString + "%'";
    try {
        if (searchString !== undefined && searchString !== "" && searchString.match('^[a-zA-Z0-9 åäöÅÄÖ]+$')) {
            const result = await db.query(sql);

            return result;
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};
