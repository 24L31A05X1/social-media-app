const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'mock_users.json');

function readUsers() {
    if (!fs.existsSync(usersFile)) {
        return [];
    }
    try {
        return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    } catch (e) {
        return [];
    }
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

class UserMock {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this._id = Math.random().toString(36).substring(2, 9);
    }

    async save() {
        const users = readUsers();
        users.push({
            _id: this._id,
            name: this.name,
            email: this.email,
            password: this.password
        });
        writeUsers(users);
        return this;
    }

    static async findOne({ email }) {
        const users = readUsers();
        const user = users.find(u => u.email === email);
        return user ? user : null;
    }
}

module.exports = {
    connect: async () => {
        console.log("Mock MongoDB Connected (using local JSON file)");
        return true;
    },
    Schema: class {
        constructor() {}
    },
    model: (name, schema) => {
        return UserMock;
    }
};
