/**
 * A module exporting functions to access the itsec database
 * regarding orders.
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
 * Get all orders from the Orders table for a specific user.
 *
 * @param {number} userId
 * @returns {Promise<RowDataPacket[]>}
 */
export const getUserOrders = async (userId) => {
    let sql = `CALL get_orders_by_user(?);`;

    try {
        if (userId !== undefined && !isNaN(parseInt(userId))) {
            const result = await db.query(sql, [userId]);
            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get a specific order from the Orders table for a specific user.
 *
 * @param {number} orderId
 * @returns {Promise<RowDataPacket[]>}
 */
export const getOneOrder = async (orderId) => {
    let sql = `CALL get_one_order(?);`;

    try {
        if (orderId !== undefined && !isNaN(parseInt(orderId))) {
            const result = await db.query(sql, [orderId]);
            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get the cost of shipping regarding the weight.
 *
 * @param {number} weight - The number to be squared.
 * @returns {number} The shipping cost.
 */
export const getShippingCost = (weight) => {
    const chargeRules = [
        { max: 500, cost: 39 },
        { min: 501, max: 1000, cost: 59 },
        { min: 1001, max: 3000, cost: 79 },
        { min: 3001, cost: 99 }
    ];
    for (const rule of chargeRules) {
        if ((rule.min === undefined || weight >= rule.min) &&
            (rule.max === undefined || weight <= rule.max)) {
            return rule.cost;
        }
    }
    return 0;
};
