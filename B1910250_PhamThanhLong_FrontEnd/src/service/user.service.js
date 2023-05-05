import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async login(data) {
        return (await this.api.post("/logincheck", data)).data;
    }
    async regist(data) {
        return (await this.api.post("/regist", data)).data;
    }
    async getEmail(email) {
        return (await this.api.get(`/regist/${email}`)).data;
    }
    async deleteAll() {
        const data = (await this.api.delete("/")).data;
        return data
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new UserService();