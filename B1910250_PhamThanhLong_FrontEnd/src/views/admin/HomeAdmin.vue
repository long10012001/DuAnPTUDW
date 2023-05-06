<template>
  <list-product></list-product>
</template>

<script>
import ListProduct from "@/views/admin/ListProduct.vue";
export default {
  name: "admin",
  components: {
    "list-product": ListProduct,
  },
};
</script>

