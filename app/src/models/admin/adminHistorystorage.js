"use strict";

const { query } = require("../../config/db");
const db = require("../../config/db");

class historyStorage {
    static async getHistoriesInfo(option) {
        return new Promise((resolve, reject) => {
            if(option.order === "recent"|| option.order === undefined) {
                db.query("SELECT * FROM historySTEPOF ORDER BY historyId DESC;", (err, data) => {
                    if(err) reject(err)
                    else resolve(data)
                })
            } else if(option.order === "older") {
                db.query("SELECT * FROM historySTEPOF ORDER BY historyId ASC;", (err, data) => {
                    if(err) reject(err)
                    else resolve(data)
                })
            }
        });
    }

    static async getHistoryInfo(id) {
        return new Promise((resolve, reject) => {
                db.query("SELECT * FROM historySTEPOF WHERE historyId = ?;",[id.id], (err, data) => {
                    if(err) reject(err)
                    else resolve(data)
                })
        });
    }

    static async addHistoryInfo(content) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO historySTEPOF(historyContent, historyDate, historyURL) VALUES(?,?,?);'
            db.query(query, [content.content, content.date, content.url], (err) => {
                if(err) reject(err);
                else resolve({ success:true});
            })
        })
    }

    static async deleteHistoryInfo(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM historySTEPOF WHERE historyId = ?;';
            db.query(query, [id.id], (err) => {
                if(err) reject(err);
                else resolve({success : true});
            })
        })
    }

    static async updateHistoryInfo(content) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE historySTEPOF SET historyContent = ?, historyDate = ?, historyURL = ? WHERE historyId = ?;'
            db.query(query, [content.content, content.date, content.url, content.id], (err) => {
                if(err) reject(err);
                else resolve({ success:true});
            })
        })
    }
}

module.exports = historyStorage;