"use strict";

const adminUserStorage = require("./adminUserStorage");

class adminUser  {
    constructor(body) {
        this.body = body;
    }
    
    async login() {
        const client = this.body;
        try {
            const user = await adminUserStorage.getUserInfo(client.id);
            if(user) {
                if(user.id === client.id && user.psword === client.psword) {
                    return { success:true };
                }
                return {success:false, msg: "비밀번호가 틀렸습니다"};
            }
            return {success:false, msg: "존재하지 않는 아이디입니다"}
        } catch {
            return { success : false, err};
        }
    }
}


module.exports = adminUser;