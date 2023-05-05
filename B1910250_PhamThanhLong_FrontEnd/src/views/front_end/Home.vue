<template>
  <Header @list_product="search_product"></Header>
  <div id="main-content-wp" class="home-page clearfix">
    <div class="wp-inner">
      <div class="main-content fl-right">
        <div class="section" id="list-product-wp">
          <productList :list_products="list_product"></productList>
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
import ProductList from "@/components/ProductList.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "home",
  data() {
    return {
      list_product: [],
    };
  },

  components: {
    Sidebar,
    ProductList,
    Header,
    Footer,
  },
  methods: {
    search_product(e) {
      this.list_product = e;
    },
  },
};
</script>