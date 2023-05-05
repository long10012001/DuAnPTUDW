<template>
  <Header></Header>
  <div id="main-content-wp" class="list-product-page">
    <div class="wrap clearfix">
      <sidebar></sidebar>
      <div id="content" class="detail-exhibition fl-right">
        <div class="section" id="info">
          <div class="section-head">
            <h3 class="section-title">Thông tin đơn hàng</h3>
          </div>
          <ul class="list-item">
            <li>
              <h3 class="title">Địa chỉ nhận hàng</h3>
              <span class="detail"
                >{{ order.address }} / {{ order.phone }}</span
              >
            </li>
            <li>
              <h3 class="title">Thông tin vận chuyển</h3>
              <span class="detail">{{ order.method }}</span>
            </li>
            <form @submit.prevent="update_order()">
              <li>
                <h3 class="title">Tình trạng đơn hàng</h3>
                <select name="status" v-model="selected">
                  <option value="Đang xử lý" :disabled="this.disable.process">
                    Chờ duyệt
                  </option>
                  <option
                    value="Đang vận chuyển"
                    :disabled="this.disable.deliver"
                  >
                    Đang vận chuyển
                  </option>
                  <option value="Thành công" :disabled="this.disable.success">
                    Thành công
                  </option>
                </select>
                <input
                  type="submit"
                  name="sm_status"
                  value="Cập nhật đơn hàng"
                />
              </li>
            </form>
          </ul>
        </div>
        <div class="section">
          <div class="section-head">
            <h3 class="section-title">Sản phẩm đơn hàng</h3>
          </div>
          <div class="table-responsive">
            <table class="table info-exhibition">
              <thead>
                <tr>
                  <td class="thead-text">STT</td>
                  <td class="thead-text">Ảnh sản phẩm</td>
                  <td class="thead-text">Tên sản phẩm</td>
                  <td class="thead-text">Đơn giá</td>
                  <td class="thead-text">Số lượng</td>
                  <td class="thead-text">Thành tiền</td>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(detail, index) in this.order.products">
                  <td class="thead-text">{{ index + 1 }}</td>
                  <td class="thead-text">
                    <div class="thumb">
                      <img :src="detail.imgUrl" alt="" />
                    </div>
                  </td>
                  <td class="thead-text">{{ detail.name }}</td>
                  <td class="thead-text">
                    {{ detail.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} đ
                  </td>
                  <td class="thead-text">{{ detail.amount }}</td>
                  <td class="thead-text">
                    {{
                      (detail.price * detail.amount)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    }}
                    đ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="section">
          <h3 class="section-title">Giá trị đơn hàng</h3>
          <div class="section-detail">
            <ul class="list-item clearfix">
              <li>
                <span class="total-fee">Tổng số lượng</span>
                <span class="total">Tổng đơn hàng</span>
              </li>
              <li>
                <span class="total-fee">{{ order.totalProduct }} sản phẩm</span>
                <span class="total"
                  >{{
                    `${order.totalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }}
                  đ</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {{ order.status }}
</template>

<script>
import Header from "@/components/admin/Header.vue";

import Sidebar from "@/components/admin/Sidebar.vue";

import OrderService from "@/service/order.service.js";
export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      order: {},
      selected: "",
      disable: {
        process: false,
        deliver: false,
        success: false,
      },
    };
  },

  methods: {
    async getOrder(id) {
      try {
        this.order = await OrderService.get(id);
        const status = this.order.status;
        if (status == "Đang xử lý") {
          this.selected = "Đang xử lý";
        } else if (status == "Đang vận chuyển") {
          this.selected = "Đang vận chuyển";
          this.disable.process = true;
        } else {
          this.selected = "Thành công";
          this.disable.process = true;
          this.disable.deliver = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async update_order() {
      const id = this.$route.params.id;
      try {
        console.log(this.selected);
        this.order.status = this.selected;
        const order1 = await OrderService.update(id, this.order);
        alert("Cập nhật trạng thái đơn hàng thành công!!!");
        this.$router.push({ name: "list_orders" });
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    const id = this.$route.params.id;

    if (id) {
      this.getOrder(id);
    }
  },
};
</script>