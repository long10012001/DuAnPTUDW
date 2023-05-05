<template>
  <Header></Header>

  <div id="main-content-wp" class="list-product-page">
    <div class="wrap clearfix">
      <sidebar></sidebar>

      <div id="content" class="fl-right">
        <div class="section" id="title-page">
          <div class="clearfix">
            <h3 id="index" class="fl-left">Danh sách người dùng</h3>
          </div>
        </div>
        <div class="section" id="detail-page">
          <div class="section-detail">
            <div class="filter-wp clearfix">
              <ul class="post-status fl-left">
                <li class="all">
                  <a href=""
                    >Tất cả
                    <span class="count">({{ list_user.length }})</span></a
                  >
                  |
                </li>
                <li class="publish">
                  <a href=""
                    >Quản trị viên
                    <span class="count">({{ admin.length }})</span></a
                  >
                  |
                </li>
                <li class="pending">
                  <a href=""
                    >Người dùng bình thường
                    <span class="count">({{ users.length }})</span> |</a
                  >
                </li>
              </ul>
              <form class="form-s fl-right" @submit.prevent="search()">
                <input
                  type="text"
                  name="s"
                  id="s"
                  v-model="search_user"
                  placeholder="Nhập từ khoá tìm kiếm"
                />
                <input type="submit" name="sm_s" value="Tìm kiếm" />
              </form>
            </div>
            <div class="actions">
              <form @submit.prevent="filter_role()">
                <select name="actions" v-model="role">
                  <option value="0">Vai trò</option>
                  <option value="admin">Quản trị viên</option>
                  <option value="user">Người dùng bình thường</option>
                </select>
                <input type="submit" name="sm_action" value="Áp dụng" />
              </form>
            </div>
            <div class="table-responsive">
              <table class="table list-table-wp">
                <thead>
                  <tr>
                    <td><span class="thead-text">STT</span></td>

                    <td><span class="thead-text">Họ và tên</span></td>
                    <td><span class="thead-text">Email</span></td>

                    <td><span class="thead-text">Vai trò</span></td>
                    <td><span class="thead-text">Thời gian</span></td>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(user, index) in list_user">
                    <td>
                      <span class="tbody-text"
                        ><h3>{{ index + 1 }}</h3></span
                      >
                    </td>

                    <td>
                      <div class="tb-title fl-left">
                        <a href="" title="">{{ user.name }}</a>
                      </div>
                      <ul class="list-operation fl-right">
                        <li>
                          <a
                            title="Xóa"
                            class="delete"
                            @click="deleteUser(user._id, user.name)"
                            ><i class="fa fa-trash" aria-hidden="true"></i
                          ></a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span class="tbody-text">{{ user.email }}</span>
                    </td>
                    <td>
                      <span class="tbody-text">{{ user.role }}</span>
                    </td>
                    <td>
                      <span class="tbody-text">{{
                        format(user.createdAt)
                      }}</span>
                    </td>
                    <td>
                      <span class="tbody-text"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Header from "@/components/admin/Header.vue";
import Sidebar from "@/components/admin/Sidebar.vue";
import UserService from "@/service/user.service.js";
import moment from "moment";

export default {
  name: "list_users",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      list_user: [],
      role: "0",
      search_user: "",
      admin: [],
      users: [],
    };
  },
  watch: {
    search_user: async function () {
      // var search = this.search_user;
      // this.list_user = await UserService.getAll();
      // this.list_user = this.list_user.filter(function (user) {
      //   return (
      //     user.name.toLowerCase().includes(search.toLowerCase()) ||
      //     user.email.toLowerCase().includes(search.toLowerCase())
      //   );
      // });
      this.search();
    },
  },
  methods: {
    async deleteUser(id, name) {
      if (confirm("Bạn có muốn xoá tài khoản " + name + "?")) {
        let user = await UserService.delete(id);
        this.getAllUser();
      }
    },
    async search() {
      var search = this.search_user;
      this.list_user = await UserService.getAll();
      this.list_user = this.list_user.filter(function (user) {
        return (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        );
      });
    },
    async getAllUser() {
      try {
        this.list_user = await UserService.getAll();
        this.admin = this.list_user.filter(function (user) {
          return user.role == "admin";
        });
        this.users = this.list_user.filter(function (user) {
          return user.role == "user";
        });
      } catch (error) {
        console.log(error);
      }
    },
    format(date) {
      return moment(String(date)).format("HH:mm, DD/MM/YY");
    },
    async filter_role() {
      try {
        if (this.role != "0") {
          var role = this.role;
          this.list_user = await UserService.getAll();

          this.list_user = this.list_user.filter(function (user) {
            return user.role == role;
          });
        } else {
          this.list_user = await UserService.getAll();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getAllUser();
  },
};
</script>