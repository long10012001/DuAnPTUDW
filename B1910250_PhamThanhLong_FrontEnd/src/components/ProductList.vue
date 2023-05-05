<template>
  <div class="section-head">
    <h3 class="section-title" v-if="params == 1">Điện thoại</h3>
    <h3 class="section-title" v-else-if="params == 2">Laptop</h3>
    <h3 class="section-title" v-else>Sản phẩm</h3>
  </div>
  <div class="section-detail">
    <ul class="list-item clearfix">
      <li :key="index" v-for="(product, index) in list_product">
        <router-link
          :to="{ name: 'product.detail', params: { id: product._id } }"
          class="thumb"
        >
          <img :src="product.imgUrl" />
        </router-link>
        <router-link
          :to="{ name: 'product.detail', params: { id: product._id } }"
          class="product-name"
          >{{ product.name }}</router-link
        >

        <div class="price">
          <span class="new"
            >{{ product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} Đ</span
          >
        </div>
        <div class="action clearfix">
          <a title="Thêm giỏ hàng" class="add-cart" @click="add_cart(index)"
            >Thêm giỏ hàng</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ProductService from "@/service/product.service.js";
export default {
  components: {},
  props: {
    category: String,
    list_products: {
      type: Array,
    },
  },
  data() {
    return {
      list_product: [],
      data: String,
      params: String,
    };
  },
  watch: {
    "$route.params.category": async function (params) {
      this.getProductByCategory(params);
    },
    list_products: function () {
      this.list_product = this.list_products;
    },
  },

  methods: {
    async getProductByCategory(category) {
      if (category) {
        this.list_product = await ProductService.getByCondition(category);
        this.params = category;
      } else {
        this.params = "";
        this.getAllProduct();
      }
    },
    async getAllProduct() {
      try {
        this.list_product = await ProductService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    async add_cart(index) {
      const saveLocalCart = JSON.parse(
        localStorage.getItem("localProductCart") ?? "[]"
      );
      for (const item of saveLocalCart) {
        if (item.id === this.list_product[index]._id) {
          item.amount++;
          const localProductCart = JSON.stringify(saveLocalCart);
          localStorage.setItem("localProductCart", localProductCart);

          alert(
            `Số lượng sản phẩm ${this.list_product[index].name} đã được cập nhật`
          );
          return;
        }
      }
      const temp = {
        id: this.list_product[index]._id,
        name: this.list_product[index].name,
        imgUrl: this.list_product[index].imgUrl,
        price: this.list_product[index].price,
        description: this.list_product[index].description,
        amount: 1,
      };

      saveLocalCart.push(temp);
      const localProductCart = JSON.stringify(saveLocalCart);
      localStorage.setItem("localProductCart", localProductCart);

      alert(
        `Sản phẩm ${this.list_product[index].name} vừa được thêm vào giỏ hàng`
      );
    },
  },

  created() {
    const id = this.$route.params.category;
    if (id) {
      this.getProductByCategory(id);
    } else {
      this.getAllProduct();
    }
  },
};
</script>