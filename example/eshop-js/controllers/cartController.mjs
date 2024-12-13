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

export const createOrder = async (userId, couponId) => {
    let sql = `CALL create_order(?, ?);`;

    try {
        let result = await db.query(sql, [userId, couponId] );
        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createOrderItem = async (orderID, productID, desiredAmount) => {
    let sql1 = `CALL create_order_item(?, ?, ?);`;
    let sql2 = `CALL get_one_product(?);`;
    let result;

    if (typeof desiredAmount !== 'number' || desiredAmount < 0 || desiredAmount > 500) {
        throw new Error("Invalid input.");
    }

    try {
        result = await db.query(sql2, [productID] );
        let amount = result[0][0].productAmount;
        if (amount >= desiredAmount) {
            let result = await db.query(sql1, [orderID, productID, desiredAmount] );
            return result;
        }
    } catch (error) {
        throw new Error(`Not enough in stock.`);
    }
};

export const getOrderItem = async (orderID) => {
    let sql = `CALL get_order_item(?);`;

    try {
        let result = await db.query(sql, [orderID] );
        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateOrder = async (orderID, totalSum, status) => {
    let sql = `CALL update_order(?, ?, ?);`;

    try {
        let result = await db.query(sql, [orderID, totalSum, status] );
        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
};
