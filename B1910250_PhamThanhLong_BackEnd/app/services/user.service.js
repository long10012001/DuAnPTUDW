const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    extractUserData(payload) {
        const createdAt = new Date();

        const user = {
            name: payload.name,
            email: payload.email,
            role: payload.role,
            password: payload.password,
            createdAt: createdAt,
        };

        // Xóa các trường không xác định
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async create(payload) {
        const user = this.extractUserData(payload);
        console.log(user.password);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        console.log(user.password);

        const result = await this.User.findOneAndUpdate(
            user,
            { $set: { "role": "user" } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async login(object) {
        const user = await this.findByEmail(object.email);
        return user;
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByEmail(email) {
        return await this.find({
            email: { $regex: new RegExp(email), $options: "i" },
        });
    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = UserService;