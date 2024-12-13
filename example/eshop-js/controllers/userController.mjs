/**
 * A module exporting functions to access the itsec database
 * regarding users.
 */
"use strict";

import mysql from "promise-mysql";
import bcrypt from "bcryptjs";
import { config } from "../config/db/eshop.mjs";
import { valid_user_input } from "../public/js/functions.js";

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
 * Verify the email and the password, if successful the object contains
 * all details from the database row.
 *
 * @param string  $email users email
 * @param string $password the password to use.
 * @return bool true if email and password matches, else false.
 */
export const verifyPassword = async (email, password) => {
    let sql = `CALL get_user(?);`;
    let userOk = false;
    try {
        if (email !== undefined && email.includes('@') && email.length < 80) {
            const result = await db.query(sql, [email]);
            if (result) {
                if (result[0][0] != undefined && email === result[0][0].userMail) {
                    userOk = bcrypt.compare(password, result[0][0].userPassword).then((isPasswordMatch) => {
                        return isPasswordMatch;
                    });
                }
            }
        }
        return userOk;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Create a new user in the User table
 *
 * @param object  user users data
 * @return bool true if user added ok, else false.
 */
export const createUserProfile = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    let sql = `CALL create_user(?,?,?,?,?,?,?,?,?,?);`;
 
    try {
        if (valid_user_input(user)) {
            const result = await db.query(sql, [user.firstname, user.surname, user.phone, user.email, user.gender, user.address, user.postcode, user.city, 0, hashedPassword]);

            return result;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Update a user in the User table
 *
 * @param object  user users data
 * @return bool true if user added ok, else false.
 */
export const updateUserProfile = async (userID, user) => {
    let sql = `CALL update_user(?,?,?,?,?,?,?,?,?,?);`;

    try {
        if (valid_user_input(user)) {
            const result = await db.query(sql, [userID, user.firstname, user.surname, user.phone, user.email, user.gender, user.address, user.postcode, user.city, 0]);

            return result;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Get data from a user in the User table.
 *
 * @returns {RowDataPacket} Result set from the query or undefined if user not found.
 */
export const getUserDataById = async (userID) => {
    let sql = `CALL get_user_by_id(?);`;

    try {
        if (userID !== undefined) {
            const result = await db.query(sql, [userID]);
            
            return result[0];
        }
        return [];
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Get data from a user in the User table.
 *
 * @returns {RowDataPacket} Result set from the query or undefined if user not found.
 */
export const getUserData = async (email) => {
    let sql = `CALL get_user(?);`;

    try {
        if (email !== undefined && email != null && email.includes('@') && email.length < 80) {
            const result = await db.query(sql, [email]);

            return result[0];
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return null;
    }
};
