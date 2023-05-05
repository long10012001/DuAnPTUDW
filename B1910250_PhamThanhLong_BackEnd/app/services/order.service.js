const { ObjectId } = require("mongodb");
class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractOrderData(payload) {
        const createdAt = new Date();

        const order = {
            name: payload.name,
            email: payload.email,
            products: payload.products,
            address: payload.address,
            phone: payload.phone,
            totalPrice: payload.totalPrice,
            method: payload.method,
            totalProduct: payload.totalProduct,
            status: payload.status,
            createdAt: createdAt,
        };
        // Xóa các trường không xác định
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    async create(payload) {
        const order = this.extractOrderData(payload);

        const result = await this.Order.findOneAndUpdate(
            order,
            { $set: order },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }



    async findById(id) {
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Order.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Order.deleteMany({});
        return result.deletedCount;
    }


}
module.exports = OrderService;