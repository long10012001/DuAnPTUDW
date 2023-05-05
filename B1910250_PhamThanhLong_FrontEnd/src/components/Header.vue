<template>
  <div id="header-wp">
    <div id="head-body" class="clearfix">
      <div class="wp-inner">
        <router-link
          :to="{ name: 'home' }"
          id="logo"
          class="fl-left"
          @click="reset()"
        >
          <img src="../images/Tl__1_-removebg-preview (2).png" />
        </router-link>
        <div id="search-wp" class="fl-left">
          <form @submit.prevent="search_product()">
            <input
              type="text"
              name="s"
              id="s"
              v-model="search_home"
              placeholder="Nhập từ khóa tìm kiếm tại đây!"
            />
            <button type="submit" id="sm-s">Tìm kiếm</button>
          </form>
        </div>
        <div id="action-wp" class="fl-right">
          <div id="advisory-wp" class="fl-left">
            <span class="title">Xin chào</span>
            <span class="phone">{{ this.user.name }}</span>
          </div>
          <div id="btn-respon" class="fl-right">
            <i class="fa fa-user" aria-hidden="true"></i>
          </div>
          <a
            href="?page=cart"
            title="giỏ hàng"
            id="cart-respon-wp"
            class="fl-right"
          >
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span id="num">2</span>
          </a>
          <div id="cart-wp" class="fl-right">
            <div id="btn-cart" @mouseover="seen()">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
            <div id="dropdown">
              <p class="desc">
                Có <span>{{ this.list_product.length }} sản phẩm</span> trong
                giỏ hàng
              </p>
              <ul class="list-cart">
                <li
                  class="clearfix"
                  :key="index"
                  v-for="(product, index) in list_product"
                >
                  <a href="" title="" class="thumb fl-left">
                    <img :src="product.imgUrl" alt="" />
                  </a>
                  <div class="info fl-right">
                    <a href="" title="" class="product-name">{{
                      product.name
                    }}</a>
                    <p class="price">
                      {{
                        `${product.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }}
                      đ
                    </p>
                    <p class="qty">
                      Số lượng: <span>{{ product.amount }}</span>
                    </p>
                  </div>
                </li>
              </ul>
              <div class="total-price clearfix">
                <p class="title fl-left">Tổng:</p>
                <p class="price fl-right">
                  {{ `${totalPrice()}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
                  đ
                </p>
              </div>
              <div class="action-cart clearfix">
                <router-link :to="{ name: 'cart' }" class="view-cart fl-left">
                  Giỏ hàng
                </router-link>
                <router-link
                  v-if="list_product.length > 0"
                  :to="{ name: 'checkout' }"
                  title="Thanh toán"
                  class="checkout fl-right"
                  >Thanh toán</router-link
                >
              </div>
            </div>
          </div>
          <div id="btn-respon" class="fl-right">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </div>
          <a
            href="?page=cart"
            title="giỏ hàng"
            id="cart-respon-wp"
            class="fl-right"
          >
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <span id="num"></span>
          </a>
          <div id="cart-wp" class="fl-right">
            <div id="btn-cart">
              <i class="fa fa-user" aria-hidden="true"></i>
              <span id="num"></span>
            </div>
            <div id="dropdown">
              <ul class="list-action" v-if="this.user">
                <li class="clearfix action" v-if="this.user.role == 'admin'">
                  <router-link :to="{ name: 'admin' }" class="route">
                    Trang admin
                  </router-link>
                </li>
                <li class="clearfix action">
                  <a title="" class="route" @click="logout()"> Thoát </a>
                </li>
              </ul>
              <ul class="list-action" v-else>
                <li class="clearfix action">
                  <router-link :to="{ name: 'login' }" class="route">
                    Đăng Nhập
                  </router-link>
                </li>
                <li class="clearfix action">
                  <router-link :to="{ name: 'regist' }" class="route">
                    Đăng Ký
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/service/product.service.js";

export default {
  data() {
    return {
      list_product: [],
      search_home: "",
      user: JSON.parse(localStorage.getItem("localUserLogin")) ?? "",
    };
  },
  watch: {
    search_home: async function () {
      // this.list_product = await ProductService.getAll();
      // var search_home = this.search_home;
      // this.list_product = this.list_product.filter(function (product) {
      //   return product.name.includes(search_home);
      // });

      // this.$emit("list_product", this.list_product);
      this.search_product();
    },
  },

  methods: {
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.list_product.length; i++) {
        total += this.list_product[i].price * this.list_product[i].amount;
      }
      return total;
    },
    logout() {
      localStorage.removeItem("localUserLogin");
      this.$router.push({ name: "login" });
    },
    seen() {
      const listLocalCart = JSON.parse(
        localStorage.getItem("localProductCart") ?? "[]"
      );
      this.list_product = listLocalCart;
    },
    async search_product() {
      this.list_product = await ProductService.getAll();
      var search_home = this.search_home;
      this.list_product = this.list_product.filter(function (product) {
        return product.name.toLowerCase().includes(search_home.toLowerCase());
      });

      this.$emit("list_product", this.list_product);
    },
    reset() {
      this.search_home = "";
    },
  },
};
</script>