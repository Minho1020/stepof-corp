"use strict";

const adminHistoryStorage = require("./adminHistorystorage");

class adminHistory {
    constructor(body) {
        this.body = body;
    }
    
    async getHistories() {
        const client = this.body;
        try {
            const history = await adminHistoryStorage.getHistoriesInfo(client);

            return history
        } catch {
            return { success : false, err};
        }
    };
    async getHistory() {
        const id = this.body;
        try {
            const history = await adminHistoryStorage.getHistoryInfo(id);
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

    async updateHistory() {
        const content = this.body;
        const response = await adminHistoryStorage.updateHistoryInfo(content);
        return response;
    }
}


module.exports = adminHistory;