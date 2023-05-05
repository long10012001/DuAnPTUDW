<template>
  <Header></Header>
  <div id="main-content-wp" class="clearfix detail-product-page">
    <div class="wp-inner">
      <div class="secion" id="breadcrumb-wp">
        <div class="secion-detail">
          <ul class="list-item clearfix">
            <li>
              <router-link :to="{ name: 'home' }">Trang chủ</router-link>
            </li>
            <li v-if="product.category == 1">
              <router-link
                :to="{ name: 'product.category', params: { category: 1 } }"
                >Điện thoại</router-link
              >
            </li>
            <li v-if="product.category == 2">
              <router-link
                :to="{ name: 'product.category', params: { category: 2 } }"
                >Laptop</router-link
              >
              <!-- <a title=""></a> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="main-content fl-right">
        <div class="section" id="detail-product-wp">
          <div class="section-detail clearfix">
            <div class="thumb-wp fl-left">
              <a href="" title="" id="main-thumb">
                <img id="zoom" :src="product.imgUrl" />
              </a>
            </div>
            <div class="thumb-respon-wp fl-left">
              <img src="" alt="" />
            </div>
            <div class="info fl-right">
              <h3 class="product-name">{{ product.name }}</h3>

              <div class="num-product">
                <span class="title">Sản phẩm: </span>
                <span class="status">Còn hàng</span>
              </div>
              <p class="price">
                {{ `${product.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
                Đ
              </p>
              <div id="num-order-wp">
                <a title="" id="minus" @click="minus"
                  ><i class="fa fa-minus"></i
                ></a>
                <input
                  type="text"
                  name="num-order"
                  :value="quantity"
                  id="num-order"
                  min="1"
                />
                <a title="" id="plus" @click="add"
                  ><i class="fa fa-plus"></i
                ></a>
              </div>
              <a title="Thêm giỏ hàng" class="add-cart" @click="add_cart()"
                >Thêm giỏ hàng</a
              >
            </div>
          </div>
        </div>
        <div class="section" id="post-product-wp">
          <div class="section-head">
            <h3 class="section-title">Mô tả sản phẩm</h3>
          </div>
          <div class="section-detail">
            <p>
              {{ product.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="sidebar fl-left">
        <sidebar></sidebar>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ProductService from "@/service/product.service.js";
export default {
  name: "detail_product",
  components: {
    Sidebar,
    Header,
    Footer,
  },
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  methods: {
    add() {
      return this.quantity++;
    },
    minus() {
      if (this.quantity > 1) return this.quantity--;
    },
    async getProductById(id) {
      try {
        this.product = await ProductService.get(id);
      } catch (error) {
        console.log(error);
      }
    },
    async add_cart() {
      const saveLocalCart = JSON.parse(
        localStorage.getItem("localProductCart") ?? "[]"
      );
      for (const item of saveLocalCart) {
        if (item.id === this.product._id) {
          item.amount += this.quantity;
          const localProductCart = JSON.stringify(saveLocalCart);
          localStorage.setItem("localProductCart", localProductCart);

          alert(`Số lượng sản phẩm ${this.product.name} đã được cập nhật`);
          this.$router.push({ name: "cart" });

          return;
        }
      }
      const temp = {
        id: this.product._id,
        name: this.product.name,
        imgUrl: this.product.imgUrl,
        price: this.product.price,
        description: this.product.description,
        amount: this.quantity,
      };

      saveLocalCart.push(temp);
      const localProductCart = JSON.stringify(saveLocalCart);
      localStorage.setItem("localProductCart", localProductCart);
      alert(`Sản phẩm ${this.product.name} vừa được thêm vào giỏ hàng`);
      this.$router.push({ name: "cart" });
    },
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.getProductById(id);
    }
  },
};
</script>