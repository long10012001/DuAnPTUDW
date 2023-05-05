<template>
  <Header></Header>
  <div id="main-content-wp" class="checkout-page">
    <div class="section" id="breadcrumb-wp">
      <div class="wp-inner">
        <div class="section-detail">
          <ul class="list-item clearfix">
            <li>
              <router-link :to="{ name: 'home' }">Trang chủ</router-link>
            </li>
            <li>
              <a href="" title="">Đăng ký</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="wrapper" class="wp-inner clearfix">
      <div class="section regist" id="customer-info-wp">
        <div class="section-head">
          <h1 class="section-title">Đăng ký tài khoản</h1>
        </div>
        <div class="section-detail">
          <Form
            name="form-checkout"
            @submit="checkRegist()"
            :validation-schema="registFormSchema"
          >
            <div class="form-row clearfix">
              <div class="form-col fl-left">
                <label for="fullname">Họ tên</label>
                <ErrorMessage name="name" class="error-feedback" />
                <Field
                  type="text"
                  name="name"
                  id="fullname"
                  v-model="user.name"
                />
              </div>
              <div class="form-col fl-right">
                <label for="email">Email</label>
                <ErrorMessage name="email" class="error-feedback" />

                <Field
                  type="email"
                  name="email"
                  id="email"
                  v-model="user.email"
                />
              </div>
            </div>
            <div class="form-row clearfix">
              <div class="form-col fl-left">
                <label for="address">Mật khẩu</label>
                <ErrorMessage name="password" class="error-feedback" />

                <Field
                  type="password"
                  name="password"
                  id="password"
                  v-model="user.password"
                />
              </div>
              <div class="form-col fl-right">
                <label for="phone">Nhập lại mật khẩu</label>
                <ErrorMessage name="password_confirm" class="error-feedback" />

                <Field
                  type="password"
                  name="password_confirm"
                  id="password_confirm"
                  v-model="user.password_confirm"
                />
              </div>
            </div>
            <div class="place-order-wp clearfix">
              <input type="submit" id="order-now" value="Đăng ký" />
            </div>
          </Form>
          <p>
            Dã có tài khoản?
            <router-link :to="{ name: 'login' }">Đăng nhập</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import UserService from "@/service/user.service.js";
import { isArray } from "@vue/shared";
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
    const registFormSchema = yup.object().shape({
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
      password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu có ít nhất 6 ký tự")
        .max(20, "Mật khẩu dài tối đa 20 ký tự"),
      password_confirm: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu")
        .min(6, "Mật khẩu có ít nhất 6 ký tự")
        .max(20, "Mật khẩu dài tối đa 20 ký tự"),
    });
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
      },
      registFormSchema,
    };
  },
  methods: {
    async checkRegist() {
      if (this.user.password == this.user.password_confirm) {
        try {
          const check = await UserService.getEmail(this.user.email);
          if (isArray(check)) {
            alert("Tài khoản đã tồn tại!!!");
          } else {
            const userRegist = await UserService.regist(this.user);
            alert("Tạo tài khoản thành công");
            this.$router.push({ name: "login" });
          }
        } catch (error) {
          alert("Tài khoản đã tồn tại");
        }
      } else {
        alert("Nhập mật khẩu không đúng!!");
      }
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
</style>