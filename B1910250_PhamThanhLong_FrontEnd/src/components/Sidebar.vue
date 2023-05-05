<template>
  <div class="section" id="category-product-wp">
    <div class="section-head">
      <h3 class="section-title">Danh mục sản phẩm</h3>
    </div>
    <div class="secion-detail">
      <ul class="list-item">
        <li>
          <router-link
            :to="{ name: 'product.category', params: { category: 1 } }"
            >Điện thoại
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'product.category', params: { category: 2 } }"
            >Laptop</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      this.$emit("test");
    },
  },
};
</script>