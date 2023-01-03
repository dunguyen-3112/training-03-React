/* eslint-disable no-undef */
const db = require('../db.json');

class User {
    constructor({ email, password, firstName, lastName, avatarUrl, role, id }) {
        Object.assign(this, {
            email,
            password,
            firstName,
            lastName,
            avatarUrl,
            role,
            id,
        });
    }

    /**
     *
     * @param {string} id
     * @returns User
     */
    static async findUserById(id) {
        return await db.users.find((user) => user.id === id);
    }
}

module.exports = User;
