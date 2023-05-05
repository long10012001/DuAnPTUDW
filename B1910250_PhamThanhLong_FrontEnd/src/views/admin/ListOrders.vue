<template>
  <Header></Header>

  <div id="main-content-wp" class="list-product-page">
    <div class="wrap clearfix">
      <sidebar></sidebar>

      <div id="content" class="fl-right">
        <div class="section" id="title-page">
          <div class="clearfix">
            <h3 id="index" class="fl-left">Danh sách đơn hàng</h3>
          </div>
        </div>
        <div class="section" id="detail-page">
          <div class="section-detail">
            <div class="filter-wp clearfix">
              <ul class="post-status fl-left">
                <li class="all">
                  <a href=""
                    >Tất cả
                    <span class="count">({{ list_order.length }})</span></a
                  >
                  |
                </li>
                <li class="publish">
                  <a href=""
                    >Đang xử lý<span class="count"
                      >({{ process.length }})</span
                    ></a
                  >
                  |
                </li>
                <li class="pending">
                  <a href=""
                    >Đang vận chuyển<span class="count"
                      >({{ delivery.length }})</span
                    >
                    |</a
                  >
                </li>
                <li class="pending">
                  <a href=""
                    >Giao hàng thành công<span class="count"
                      >({{ success.length }})</span
                    ></a
                  >
                </li>
              </ul>
              <form class="form-s fl-right" @submit.prevent="search()">
                <input
                  type="text"
                  name="s"
                  id="s"
                  v-model="search_order"
                  placeholder="Nhập từ khoá tìm kiếm"
                />
                <input type="submit" name="sm_s" value="Tìm kiếm" />
              </form>
            </div>
            <div class="actions">
              <form @submit.prevent="filter()">
                <select name="actions" v-model="status">
                  <option value="0">Trạng thái</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đang vận chuyển">Đang vận chuyển</option>
                  <option value="Thành công">Thành công</option>
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
                    <td><span class="thead-text">Số sản phẩm</span></td>
                    <td><span class="thead-text">Tổng giá</span></td>
                    <td><span class="thead-text">Trạng thái</span></td>
                    <td><span class="thead-text">Thời gian</span></td>
                    <td><span class="thead-text">Chi tiết</span></td>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="index" v-for="(order, index) in list_order">
                    <td>
                      <span class="tbody-text"
                        ><h3>{{ index + 1 }}</h3></span
                      >
                    </td>

                    <td>
                      <div class="tb-title fl-left">
                        <a href="" title="">{{ order.name }}</a>
                      </div>
                      <ul class="list-operation fl-right">
                        <li>
                          <a
                            title="Xóa"
                            class="delete"
                            @click="deleteOrder(order._id, order.name)"
                            ><i class="fa fa-trash" aria-hidden="true"></i
                          ></a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span class="tbody-text">{{ order.email }}</span>
                    </td>
                    <td>
                      <span class="tbody-text">{{ order.totalProduct }}</span>
                    </td>
                    <td>
                      <span class="tbody-text"
                        >{{
                          order.totalPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        }}
                        Đ</span
                      >
                    </td>
                    <td>
                      <span class="tbody-text">{{ order.status }}</span>
                    </td>
                    <td>
                      <span class="tbody-text">{{
                        format(order.createdAt)
                      }}</span>
                    </td>
                    <td>
                      <router-link
                        :to="{
                          name: 'order.detail',
                          params: { id: order._id },
                        }"
                        class="tbody-text"
                        >Chi tiết</router-link
                      >
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
import OrderService from "@/service/order.service.js";
import moment from "moment";

export default {
  name: "list_products",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      list_order: [],
      status: "0",
      search_order: "",
      process: [],
      delivery: [],
      success: [],
    };
  },
  watch: {
    search_order: async function () {
      // var search = this.search_order;
      // this.list_order = await OrderService.getAll();
      // this.list_order = this.list_order.filter(function (order) {
      //   return (
      //     order.name.toLowerCase().includes(search.toLowerCase()) ||
      //     order.email.toLowerCase().includes(search.toLowerCase()) ||
      //     order.totalPrice.toString().includes(search) ||
      //     order.totalProduct.toString().includes(search)
      //   );
      // });
      this.search();
    },
  },
  methods: {
    async deleteOrder(id, name) {
      if (confirm("Bạn có muốn xoá đơn hàng của " + name + "?")) {
        let order = await OrderService.delete(id);
        this.getAllOrder();
      }
    },
    async search() {
      var search = this.search_order;
      this.list_order = await OrderService.getAll();
      this.list_order = this.list_order.filter(function (order) {
        return (
          order.name.toLowerCase().includes(search.toLowerCase()) ||
          order.email.toLowerCase().includes(search.toLowerCase()) ||
          order.totalPrice.toString().includes(search) ||
          order.totalProduct.toString().includes(search)
        );
      });
    },
    async getAllOrder() {
      try {
        this.list_order = await OrderService.getAll();
        this.process = this.list_order.filter(function (order) {
          return order.status == "Đang xử lý";
        });
        this.delivery = this.list_order.filter(function (order) {
          return order.status == "Đang vận chuyển";
        });
        this.success = this.list_order.filter(function (order) {
          return order.status == "Thành công";
        });
        console.log(this.delivery);
      } catch (error) {
        console.log(error);
      }
    },
    format(date) {
      return moment(String(date)).format("HH:mm, DD/MM/YY");
    },
    async filter() {
      try {
        if (this.status != "0") {
          // this.list_order = await OrderService.getByStatus(this.status);
          var stauts = this.status;
          this.list_order = await OrderService.getAll();

          this.list_order = this.list_order.filter(function (order) {
            return order.status == stauts;
          });
        } else {
          this.list_order = await OrderService.getAll();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getAllOrder();
  },
};
</script>