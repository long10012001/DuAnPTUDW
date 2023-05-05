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
              <a href="" title="">Đăng nhập</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="wrapper" class="wp-inner clearfix">
      <div class="section login" id="customer-info-wp">
        <div class="section-head">
          <h1 class="section-title">Đăng Nhập</h1>
        </div>
        <div class="section-detail">
          <Form
            name="form-checkout"
            @submit="checkLogin()"
            :validation-schema="loginFormSchema"
          >
            <div class="form-row clearfix">
              <div class="form-col fl-left">
                <label for="email">Email</label>
                <ErrorMessage name="email" class="error-feedback" />
                <Field
                  type="email"
                  name="email"
                  id="email"
                  v-model="user.email"
                />
              </div>
              <div class="form-col fl-right">
                <label for="password">Mật khẩu</label>
                <ErrorMessage name="password" class="error-feedback" />
                <Field
                  type="password"
                  name="password"
                  id="password"
                  v-model="user.password"
                />
              </div>
            </div>
            <div class="place-order-wp clearfix">
              <input type="submit" id="order-now" value="Đăng nhập" />
            </div>
          </Form>
          <p>
            Chưa có tài khoản?
            <router-link :to="{ name: 'regist' }">Đăng ký</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import UserService from "@/service/user.service.js";
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
    const loginFormSchema = yup.object().shape({
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
    });
    return {
      user: {
        email: "",
        password: "",
      },
      loginFormSchema,
    };
  },
  methods: {
    async checkLogin() {
      try {
        const userLogin = await UserService.login(this.user);
        const localUserLogin = JSON.stringify(userLogin);
        localStorage.setItem("localUserLogin", localUserLogin);
        if (userLogin.role === "user") {
          this.$router.push({ name: "home" });
        } else if (userLogin.role === "admin") {
          this.$router.push({ name: "admin" });
        } else {
          alert("Email hoặc mật khẩu không chính xác!!!");
        }
      } catch (error) {
        console.log(error);
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