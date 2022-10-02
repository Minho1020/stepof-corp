"use strict";

const db = require("../../config/db");

class adminUserStorage {
    static async getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM adminuser WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if(err) reject(err);
                else resolve(data[0])
            });
        });
    }
}

module.exports = adminUserStorage;