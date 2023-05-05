<template>
  <Header></Header>
  <div id="main-content-wp" class="checkout-page">
    <div class="section" id="breadcrumb-wp">
      <div class="wp-inner">
        <div class="section-detail">
          <ul class="list-item clearfix">
            <li>
              <a href="" title="">Trang chủ</a>
            </li>
            <li>
              <a href="" title="">Thanh toán</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="wrapper" class="wp-inner clearfix">
      <Form
        name="form-checkout"
        @submit="save_order()"
        :validation-schema="checkoutFormSchema"
      >
        <div class="section" id="customer-info-wp">
          <div class="section-head">
            <h1 class="section-title">Thông tin khách hàng</h1>
          </div>
          <div class="section-detail">
            <div class="form-row clearfix">
              <div class="form-col fl-left">
                <label for="name">Họ tên</label>
                <ErrorMessage name="name" class="error-feedback invalid" />

                <Field
                  type="text"
                  name="name"
                  id="name"
                  v-model="user_inf.name"
                />
              </div>
              <div class="form-col fl-right">
                <label for="email">Email</label>
                <ErrorMessage name="email" class="error-feedback invalid" />

                <Field
                  type="email"
                  name="email"
                  id="email"
                  v-model="user_inf.email"
                />
              </div>
            </div>
            <div class="form-row clearfix">
              <div class="form-col fl-left">
                <label for="address">Địa chỉ</label>
                <ErrorMessage name="address" class="error-feedback invalid" />

                <Field
                  type="text"
                  name="address"
                  id="address"
                  v-model="user_inf.address"
                />
              </div>
              <div class="form-col fl-right">
                <label for="phone">Số điện thoại</label>
                <ErrorMessage name="phone" class="error-feedback invalid" />

                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  v-model="user_inf.phone"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="section" id="order-review-wp">
          <div class="section-head">
            <h1 class="section-title">Thông tin đơn hàng</h1>
          </div>
          <div class="section-detail">
            <table class="shop-table">
              <thead>
                <tr>
                  <td>Sản phẩm</td>
                  <td>Tổng</td>
                </tr>
              </thead>
              <tbody :key="index" v-for="(product, index) in list_product">
                <tr class="cart-item">
                  <td class="product-name">
                    {{ product.name
                    }}<strong class="product-quantity"
                      >x {{ product.amount }}</strong
                    >
                  </td>
                  <td class="product-total">
                    {{
                      `${product.price * product.amount}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        "."
                      )
                    }}
                    đ
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="order-total">
                  <td>Tổng đơn hàng:</td>
                  <td>
                    <strong class="total-price"
                      >{{
                        `${totalPrice()}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }}
                      đ</strong
                    >
                  </td>
                </tr>
              </tfoot>
            </table>
            <div id="payment-checkout-wp">
              <div class="invalid" v-if="errors.method">
                {{ errors.method }}
              </div>
              <ul id="payment_methods">
                <li>
                  <input
                    type="radio"
                    id="payment-home"
                    name="payment-method"
                    @blur="validate()"
                    v-model="method.method"
                    :class="{ 'is-invalid': errors.method }"
                  />
                  <label for="">Thanh toán tại nhà</label>
                </li>
              </ul>
            </div>
            <div class="place-order-wp clearfix">
              <input type="submit" id="order-now" value="Đặt hàng" />
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>

  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import OrderService from "@/service/order.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Header,
    Footer,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const checkoutFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Vui lòng nhập Họ và Tên")
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(50, "Tên có nhiều nhất 50 ký tự"),
      email: yup
        .string()
        .required("Vui lòng nhập Email")
        .email("Email không đúng")
        .max(50, "Email dài tối đa 50 ký tự"),
      address: yup
        .string()
        .required("Vui lòng nhập địa chỉ nhận hàng")
        .max(50, "Email dài tối đa 50 ký tự"),
      phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      list_product: [],
      order: {
        name: "",
        email: "",
        address: "",
        phone: "",
        method: "",
        products: [],
        totalProduct: "",
        totalPrice: "",
        status: "",
      },
      user_inf: JSON.parse(localStorage.getItem("localUserLogin")) ?? "",
      method: {
        method: "",
      },
      errors: {
        method: "",
      },
      checkoutFormSchema,
    };
  },
  mounted() {
    const listLocalCart = JSON.parse(
      localStorage.getItem("localProductCart") ?? "[]"
    );
    this.list_product = listLocalCart;
  },

  methods: {
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.list_product.length; i++) {
        total += this.list_product[i].price * this.list_product[i].amount;
      }
      return total;
    },
    validate() {
      let isValid = true;

      if (!this.method.method) {
        this.errors.method = "Vui lòng chọn phương thức thanh toán";
        isValid = false;
      } else {
        this.errors.method = "";
      }
      return isValid;
    },
    async save_order() {
      if (this.validate()) {
        try {
          this.order.name = this.user_inf.name;
          this.order.email = this.user_inf.email;
          this.order.phone = this.user_inf.phone;
          this.order.method = "Thanh toán tại nhà";
          this.order.address = this.user_inf.address;
          let total = 0;
          let total_product = 0;
          for (let i = 0; i < this.list_product.length; i++) {
            total += this.list_product[i].price * this.list_product[i].amount;
            total_product += this.list_product[i].amount;
          }
          this.order.products = this.list_product;
          this.order.totalProduct = total_product;
          this.order.totalPrice = total;
          this.order.status = "Đang xử lý";
          const check = await OrderService.create(this.order);
          alert("Đặt hàng thành công. Cảm ơn quý khách!!!");
          localStorage.removeItem("localProductCart");
          this.$router.push({ name: "home" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
