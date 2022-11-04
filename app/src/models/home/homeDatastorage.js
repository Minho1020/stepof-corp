"use strict";

const db = require("../../config/db");

class historyStorage {
    static async getHistoriesInfo() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM historySTEPOF ORDER BY historyId DESC;", (err, data) => {
                if(err) reject(err)
                else resolve(data)
            })
        });
    }
}

module.exports = historyStorage;