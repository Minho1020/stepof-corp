"use strict";

const adminHistoryStorage = require("./adminHistorystorage");

class adminHistory {
    constructor(body) {
        this.body = body;
    }
    
    async getHistory() {
        const client = this.body;
        try {
            const history = await adminHistoryStorage.getHistoryInfo(client);

            return history
        } catch {
            return { success : false, err};
        }
    };

    async addHistory() {
        const content = this.body;
        const response = await adminHistoryStorage.addHistoryInfo(content);
        return response
    };

    async deleteHistory() {
        const id = this.body;
        const response = await adminHistoryStorage.deleteHistoryInfo(id);
        return response;
    }
}


module.exports = adminHistory;